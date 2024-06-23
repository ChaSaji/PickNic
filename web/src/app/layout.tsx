import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/src/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PickNic admin site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className} style={{ backgroundColor: "#FFF2D1" }}>
        {children}
      </body>
    </html>
  );
}
