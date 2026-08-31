import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Montserrat } from "next/font/google";
import { ReactNode } from "react";

import { Footer } from "@/components/common/Footer";
import { HeaderPremium } from "@/components/common/HeaderPremium";
import { SkipToContent } from "@/components/common/SkipToContent";
import { ToastContainer } from "@/components/common/ToastContainer";

import "@/styles/globals.css";
import "@/styles/variables.css";
import "@/styles/animations.css";

// ============================================================================
// FONTS
// ============================================================================

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

// ============================================================================
// METADATA & SEO
// ============================================================================

const siteUrl =
  process.env["NEXT_PUBLIC_SITE_URL"] || "https://maison-maeta.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maison Maeta | Luxury Perfumes",
    template: "%s | Maison Maeta",
  },
  description:
    "Discover exquisite luxury perfumes handcrafted for the discerning. Maison Maeta offers exclusive fragrances with the finest ingredients.",
  keywords: [
    "luxury perfumes",
    "haute parfumerie",
    "fine fragrance",
    "exclusive scents",
    "handcrafted perfumes",
  ],

  // Open Graph for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Maison Maeta",
    title: "Maison Maeta | Luxury Perfumes",
    description:
      "Discover exquisite luxury perfumes handcrafted for the discerning.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Maison Maeta",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Maison Maeta | Luxury Perfumes",
    description:
      "Discover exquisite luxury perfumes handcrafted for the discerning.",
    images: ["/og-image.webp"],
  },

  // Additional meta tags
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// ============================================================================
// VIEWPORT
// ============================================================================

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// ============================================================================
// ROOT LAYOUT
// ============================================================================

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for third-party services */}
        <link rel="dns-prefetch" href="https://api.stripe.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />

        {/* Structured data (Schema.org) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Maison Maeta",
              url: siteUrl,
              logo: "/logo.webp",
              description: "Luxury perfume boutique",
              sameAs: [
                "https://twitter.com/maisonmaeta",
                "https://instagram.com/maisonmaeta",
              ],
            }),
          }}
        />
      </head>

      <body className="bg-neutral-50 text-neutral-900 antialiased">
        {/* Accessibility: Skip to main content link */}
        <SkipToContent />

        {/* Global site header */}
        <HeaderPremium />

        {/* Main content area */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Global site footer */}
        <Footer />

        {/* Global Toast Notifications */}
        <ToastContainer />

        {/* Optional: Analytics script (Vercel Web Analytics) */}
        {process.env.NODE_ENV === "production" && (
          <script defer src="https://cdn.vercel-analytics.com/v1/web.js" />
        )}
      </body>
    </html>
  );
}
