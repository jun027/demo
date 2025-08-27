import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";

import { IncomingHttpHeaders } from "http";

import { NextResponse } from "next/server";
import {
  addMemberToCommunity,
  createCommunity,
  deleteCommunity,
  removeUserFromCommunity,
  updateCommunityInfo,
} from "@/lib/actions/community.actions";

type EventType =
  | "organization.created"
  | "organizationInvitation.created"
  | "organizationMembership.created"
  | "organizationMembership.deleted"
  | "organization.updated"
  | "organization.deleted";

type Event = {
  data: Record<string, string | number | Record<string, string>[]>;
  object: "event";
  type: EventType;
};

export const POST = async (request: Request) => {
  const payload = await request.json();
  const header = await headers();

  const svixId = header.get("svix-id");
  const svixTimestamp = header.get("svix-timestamp");
  const svixSignature = header.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { message: "Missing required Svix headers" },
      { status: 400 }
    );
  }

  const heads = {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  };

  const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || "");

  let event: Event | null = null;

  try {
    event = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  if (!event) {
    return NextResponse.json(
      { message: "Invalid webhook event" },
      { status: 400 }
    );
  }

  const eventType: EventType = event.type;

  if (eventType === "organization.created" && event?.data) {
    const { id, name, slug, logo_url, image_url, created_by } = event?.data as {
      id: string;
      name: string;
      slug: string;
      logo_url: string;
      image_url: string;
      created_by: string;
    };

    try {
      await createCommunity(
        id,
        name,
        slug,
        logo_url || image_url,
        "org bio",
        created_by
      );

      return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (eventType === "organizationInvitation.created") {
    try {
      console.log("Invitation created", event?.data);

      return NextResponse.json(
        { message: "Invitation created" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (eventType === "organizationMembership.created") {
    try {
      const { organization, public_user_data } = event?.data as unknown as {
        organization: { id: string };
        public_user_data: { user_id: string };
      };

      console.log("created", event?.data);

      await addMemberToCommunity(organization.id, public_user_data.user_id);

      return NextResponse.json(
        { message: "Invitation accepted" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (eventType === "organizationMembership.deleted") {
    try {
      const { organization, public_user_data } = event?.data as unknown as {
        public_user_data: { user_id: string };
        organization: { id: string };
      };
      console.log("removed", event?.data);

      await removeUserFromCommunity(public_user_data.user_id, organization.id);

      return NextResponse.json({ message: "Member removed" }, { status: 201 });
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (eventType === "organization.updated") {
    try {
      const { id, logo_url, name, slug } = event?.data as {
        id: string;
        logo_url: string;
        name: string;
        slug: string;
      };
      console.log("updated", event?.data);

      await updateCommunityInfo(id, name, slug, logo_url);

      return NextResponse.json({ message: "Member removed" }, { status: 201 });
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (eventType === "organization.deleted") {
    try {
      const { id } = event?.data as {
        id: string;
      };

      console.log("deleted", event?.data);

      await deleteCommunity(id);

      return NextResponse.json(
        { message: "Organization deleted" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
};
