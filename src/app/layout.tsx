import type { Metadata, Viewport } from "next";
import Toast from '@/components/Toast';
import "./globals.css";

const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Thar Draw';

export const metadata: Metadata = {
  title: `${appName} — Dynamic Form PWA Demo`,
  description: "Schema-driven form PWA with admin interface and simulated payment flow",
  openGraph: {
    title: `${appName} — Dynamic Form PWA Demo`,
    description: "Schema-driven form PWA with admin interface and simulated payment flow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${appName} — Dynamic Form PWA Demo`,
    description: "Schema-driven form PWA with admin interface and simulated payment flow",
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
        <Toast />
      </body>
    </html>
  );
}
