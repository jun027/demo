import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Threads",
  description: "Threads Application",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="zh-Hant">
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
