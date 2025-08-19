import ThreadCard from "@/app/components/cards/ThreadCard";
import Comment from "@/app/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type RouteParams = { id: string };

export default async function Page({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;
  if (!id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(id);
  if (!thread) redirect("/");

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={String(thread._id)}
          id={String(thread._id)}
          currentUserId={String(userInfo._id)}
          parentId={thread.parentId ? String(thread.parentId) : null}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={String(thread._id)}
          currentUserImg={userInfo.image}
          currentUserId={String(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={String(userInfo._id)}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}
