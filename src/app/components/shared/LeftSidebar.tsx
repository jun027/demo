"use client";

import { sidebarLinks } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

function LeftSidebar() {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const computedRoute =
            link.route === "/profile"
              ? userId
                ? `/profile/${userId}`
                : "/sign-in"
              : link.route;

          const isActive =
            pathname === computedRoute ||
            (computedRoute !== "/" && pathname.startsWith(computedRoute));

          return (
            <Link
              href={computedRoute}
              key={link.label}
              className={`leftsidebar_link ${isActive ? "bg-primary-500" : ""}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton redirectUrl="/sign-in">
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="Logout"
                width={24}
                height={24}
              />

              <p className="text-light-2 max-lg:hidden">登出</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;
