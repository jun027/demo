import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");


// getActivity


  return (
        <section>
            <h1 className="head-text mb-10">
                通知
            </h1>
        </section>
  )
}

export default Page;