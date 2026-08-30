import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { LanguageProvider } from "@/lib/language-context";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sahayya — Digital Growth & Compliance Platform for Rural MSMEs",
  description:
    "A one-stop digital platform to help rural enterprises and industrial clusters grow, stay compliant, access finance & schemes, and improve product quality.",
  keywords: [
    "MSME",
    "Rural Enterprises",
    "Compliance",
    "Credit Eligibility",
    "Demand Forecast",
    "India MSME",
    "Sahayya",
    "Industrial Clusters",
  ],
  authors: [{ name: "Sahayya Team" }],
  openGraph: {
    title: "Sahayya — Digital Growth & Compliance Platform for Rural MSMEs",
    description:
      "Grow Digitally. Comply Easily. Succeed Together. Empowering rural enterprises across India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="min-h-screen bg-white text-text-slate-900 font-sans antialiased selection:bg-brand-green-100 selection:text-brand-green-900">
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
