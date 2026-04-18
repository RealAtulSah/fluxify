import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fluxify Media — Digital Marketing Agency for Small Businesses",
  description: "Fluxify Media helps small businesses and local shops grow online with SEO, Social Media Marketing, Web Design, Paid Ads, Content Creation, and Branding.",
  keywords: ["digital marketing", "SEO", "social media marketing", "web design", "small business"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
