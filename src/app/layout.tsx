import type { Metadata, Viewport } from "next";
import { Toaster } from 'react-hot-toast';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import "./globals.css";

export const metadata: Metadata = {
  title: "Thar Draw — Lucky Draw Demo",
  description: "Enter in minutes. Ticket + payment flow simulated.",
  openGraph: {
    title: "Thar Draw — Lucky Draw Demo",
    description: "Enter in minutes. Ticket + payment flow simulated.",
    images: ["/og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thar Draw — Lucky Draw Demo",
    description: "Enter in minutes. Ticket + payment flow simulated.",
    images: ["/og.svg"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    apple: [
      { url: "/icons/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#111111" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased">
        {children}
        <Toaster position="top-center" />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
