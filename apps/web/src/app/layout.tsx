import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DSAI Conference 2027",
  description: "Explore the ideas and conversations ahead at DSAI Conference 2027.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
