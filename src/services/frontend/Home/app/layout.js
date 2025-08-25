import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MasterPos",
  description: "MasterPos Yönetim Paneli",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1e1e" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground`}>
        <Providers>
          <div className="flex h-screen">
            <Sidebar />
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              
              <main className="flex-1 overflow-y-auto bg-muted/50">
                <div className="min-h-full">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <div 
            id="loading-overlay" 
            className="
              fixed inset-0 z-50 
              bg-background/80 
              backdrop-blur-sm
              flex items-center justify-center
              opacity-0 pointer-events-none
              transition-opacity duration-300
            "
            aria-hidden="true"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="
                w-8 h-8 border-4 border-muted
                border-t-primary
                rounded-full animate-spin
              " />
              <p className="text-sm font-medium">Yükleniyor...</p>
            </div>
          </div>

          {/* Skip to main content link (Accessibility) */}
          <a
            href="#main-content"
            className="
              sr-only focus:not-sr-only
              focus:absolute focus:top-4 focus:left-4
              bg-primary text-primary-foreground
              px-4 py-2 rounded-md
              z-50 font-medium
              transition-all duration-200
            "
          >
            Ana içeriğe geç
          </a>
        </Providers>
      </body>
    </html>
  );
}