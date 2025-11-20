import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Bileşenleri çağırıyoruz
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedAsist",
  description: "Yapay Zeka Destekli Sağlık Asistanınız.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body className={inter.className}> 

        <Navbar />

        <main className="min-h-screen">
           {children} 
        </main>

        <Footer />
      </body>
    </html>
  );
}