import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  const { userId } = await auth();

  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);

    return new Response(null, {
      status: 302,
      headers: {
        Location: signInUrl.toString(),
      },
    });
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
