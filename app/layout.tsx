import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { TopBlur } from "@/components/top-blur";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${portfolioData.personal.name} — ${portfolioData.personal.role}`,
  description: portfolioData.personal.bio[0],
  keywords: [
    portfolioData.personal.name,
    portfolioData.personal.role,
    "Design Engineer",
    "Frontend Developer",
    "UI/UX Designer",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
  ],
  authors: [{ name: portfolioData.personal.name }],
  openGraph: {
    title: `${portfolioData.personal.name} — ${portfolioData.personal.role}`,
    description: portfolioData.personal.bio[0],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.personal.name} — ${portfolioData.personal.role}`,
    description: portfolioData.personal.bio[0],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-background antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen relative flex flex-col">
            <TopBlur />
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  borderRadius: "20px",
                  background: "hsl(var(--card))",
                  color: "hsl(var(--card-foreground))",
                  border: "1px solid hsl(var(--border))",
                  fontSize: "13px",
                },
              }}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
