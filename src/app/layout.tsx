import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Cat Battle",
  description: "Generated by malamine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
