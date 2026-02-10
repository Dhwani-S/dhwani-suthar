import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Caveat, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Footer } from "@/components/layout";
import { FloatingNav } from "@/components/ui/FloatingNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dhwanisuthar.com"),
  title: {
    default: "Dhwani Suthar | FinOps & Data Architect",
    template: "%s | Dhwani Suthar",
  },
  description:
    "Building self-healing data pipelines and optimizing cloud infrastructure. FinOps specialist who saved $1.5M+ using PySpark, Airflow, and GenAI.",
  keywords: [
    "FinOps",
    "Cloud Cost Optimization",
    "Data Engineer",
    "Data Architect",
    "PySpark",
    "Airflow",
    "GenAI",
    "AWS",
    "Azure",
    "GCP",
    "Chargeback",
    "Cost Allocation",
  ],
  authors: [{ name: "Dhwani Suthar" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dhwanisuthar.com",
    siteName: "Dhwani Suthar - Portfolio",
    title: "Dhwani Suthar | FinOps & Data Architect",
    description: "Building self-healing data pipelines and optimizing cloud infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dhwani Suthar - FinOps & Data Architect Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhwani Suthar | FinOps & Data Architect",
    description: "Building self-healing data pipelines and optimizing cloud infrastructure.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/logos/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logos/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logos/favicon/favicon.ico", sizes: "any" },
    ],
    apple: "/logos/favicon/apple-touch-icon.png",
  },
  manifest: "/logos/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${caveat.variable} ${playfair.variable} ${dancingScript.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        {/* 
          ╔═══════════════════════════════════════════════════════════════╗
          ║  👋 Hey, you found the secret!                                ║
          ║                                                               ║
          ║  If you're reading this, you probably know your way around    ║
          ║  DevTools. I like that.                                       ║
          ║                                                               ║
          ║  Open the Console and type: hireMe()                          ║
          ║                                                               ║
          ║  Built with: Next.js, Tailwind, Framer Motion                 ║
          ║  Architecture: Clean, Cost-Optimized, Easter-Egg-Loaded       ║
          ║                                                               ║
          ║  – Dhwani Suthar                                              ║
          ║    Data & FinOps Specialist                                   ║
          ║    dhwani.suthar02@gmail.com                                  ║
          ║    linkedin.com/in/dhwani-suthar                              ║
          ╚═══════════════════════════════════════════════════════════════╝
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingNav />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
