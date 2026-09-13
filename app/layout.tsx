import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
export const metadata: Metadata = {
  title: "ARCHIVIA — Interactive Architecture & AI Visualization",
  description:
    "An architectural visualization portfolio combining 3D architecture, AI visualization, photorealistic renders, material studies, and real-estate marketing visuals.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
