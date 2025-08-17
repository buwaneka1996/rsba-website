import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RSBA",
  description: "Rising Star Blockchain Academy",
  openGraph: {
    title: "RSBA",
    description: "Rising Star Blockchain Academy",
    
  },
  icons: {
    icon: "/favicon.ico", // Path relative to /public
  },
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
    
      </body>
    </html>
  );
}