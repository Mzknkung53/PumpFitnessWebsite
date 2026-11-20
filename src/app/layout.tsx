import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pump Fitness Chiang Mai — Old City gyms",
  description:
    "Two strength gyms near Chang Phuak Gate and Chiang Mai Gate. Day passes from ฿100. Locals, travellers and nomads welcome.",
  openGraph: {
    title: "Pump Fitness Chiang Mai",
    description:
      "Two well-equipped strength gyms in Chiang Mai's Old City. No membership needed.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["th_TH"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
