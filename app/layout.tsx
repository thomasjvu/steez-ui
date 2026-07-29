import type { Metadata } from "next";
import "@steez-ui/theme/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steez UI",
  description:
    "React design system packages with documentation-style component discovery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
