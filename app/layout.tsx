import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import HftTicker from "./HftTicker";

export const metadata: Metadata = {
  title: {
    default: "Panth Shah | Portfolio",
    template: "%s | Panth Shah",
  },
  description:
    "Architecting microsecond-level trading engines and autonomous Agentic AI workflows.",
  openGraph: {
    title: "Panth Shah",
    description:
      "Architecting microsecond-level trading engines and autonomous Agentic AI workflows.",
    url: "https://panthu13147.me",
    siteName: "panthu13147.me",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Panth Shah",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {/*
          ── Why removed YouTube iframe? ────────────────────────────────
          The iframe was loading a full YouTube player (~500KB extra JS) on
          EVERY page, which:
            • Tanks Core Web Vitals (LCP, CLS, TBT)
            • Gets blocked by most ad-blockers → blank background for many users
            • Triggers GDPR cookie banners in Europe
            • Requires network → fails on slow connections

          Replaced with: pure CSS animated background.
          Same "deep space" vibe, zero network cost, works for everyone.
          ──────────────────────────────────────────────────────────────
        */}
        <div
          className="fixed inset-0 -z-50 pointer-events-none"
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(ellipse at 10% 10%, rgba(30, 60, 255, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 85% 40%, rgba(120, 30, 255, 0.05) 0%, transparent 55%),
              radial-gradient(ellipse at 20% 90%, rgba(0, 150, 255, 0.06) 0%, transparent 60%),
              radial-gradient(ellipse at 90% 10%, rgba(200, 50, 255, 0.03) 0%, transparent 40%),
              #030308
            `,
          }}
        />

        {children}
        <Analytics />
        <HftTicker />
      </body>
    </html>
  );
}
