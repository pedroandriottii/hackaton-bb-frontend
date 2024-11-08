import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/Usercontext";



export const metadata: Metadata = {
  title: "BB TechPoints",
  description: "Hackaton BB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
