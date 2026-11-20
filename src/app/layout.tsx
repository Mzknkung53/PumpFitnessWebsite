import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f6f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Hide scroll-reveal targets only when JS is running, so the page never ships blank. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
