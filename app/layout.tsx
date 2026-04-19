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
  description: "Architecting microsecond-level trading engines and autonomous Agentic AI workflows.",
  openGraph: {
    title: "Panth Shah",
    description: "Architecting microsecond-level trading engines and autonomous Agentic AI workflows.",
    url: "https://panthu13147.me",
    siteName: "panthu13147.me",
    images: [
      {
        url: "https://panthu13147.me/og.png",
        width: 1920,
        height: 1080,
      },
    ],
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
        {/* 🌌 THE GLOBAL GALAXY BACKGROUND (GPU Optimized) 🌌 */}
        <div className="fixed inset-0 w-screen h-screen -z-50 overflow-hidden pointer-events-none transform-gpu">
          <iframe
            src="https://www.youtube.com/embed/eTD0WWFIDAg?autoplay=1&mute=1&loop=1&playlist=eTD0WWFIDAg&controls=0&rel=0&iv_load_policy=3&disablekb=1"
            className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] -translate-x-1/2 -translate-y-1/2 scale-[1.5]"
            allow="autoplay; encrypted-media"
          />
          {/* Hardware-friendly Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 -z-40 pointer-events-none"></div>
        </div>
        
        {/* Tera baaki ka content iske upar aayega */}
        {/* Tera baaki ka content iske upar aayega */}
       {/* Tera baaki ka content iske upar aayega */}
        {children}
        
        {/* GLOBAL HFT TICKER */}
        <HftTicker />
      </body>
    </html>
  );
}