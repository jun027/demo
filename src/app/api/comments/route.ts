import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Thread from "@/lib/models/thread.model";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { threadId, commentText, userId } = body;

    const thread = await Thread.findById(threadId);
    if (!thread) {
      return NextResponse.json(
        { message: "Thread not found" },
        { status: 404 }
      );
    }

    const newComment = await Thread.create({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    thread.children.push(newComment._id);
    await thread.save();

    return NextResponse.json({ message: "Comment added", comment: newComment });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
