import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StudyOS – AI Academic Command Center",
  description: "Full-stack study planning, focus, analytics, and AI insights dashboard."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
