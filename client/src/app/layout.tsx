import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import socketIO from 'socket.io-client';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anonymous Chat",
  description: "Created By Shivam",
};

// const socket = socketIO.connect('http://localhost:4000');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
