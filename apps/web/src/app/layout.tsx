import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "DSAI Conference 2027",
  description: "Explore the DSAI 2027 International Conference on Data Science and Artificial Intelligence.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={montserrat.variable}><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
