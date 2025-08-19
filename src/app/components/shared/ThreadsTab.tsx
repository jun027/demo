import { fetchUserPosts } from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";
import { redirect } from "next/navigation";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  const result = await fetchUserPosts(accountId);

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={String(thread._id)}
          id={String(thread._id)}
          currentUserId={String(currentUserId)}
          parentId={thread.parentId ? String(thread.parentId) : null}
          content={thread.text}
          author={
            accountType === "User"
            ? { name: result.name, image: result.image, id: result.id }
            : { name: thread.author.name, image: thread.author.image, id: thread.author.id }
        }
          community={thread.community} //todo
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
