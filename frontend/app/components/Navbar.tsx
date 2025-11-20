"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, Search, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md relative z-50">

      {/* Navbar Container */}
      <div className="container mx-auto px-4 py-3 flex items-center gap-4 relative z-50 bg-white min-h-[60px]">

        {/* 1. LOGO (GÜNCELLENDİ) */}
        <div className="text-2xl font-bold text-blue-600 shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <Link href="/">MedAsist</Link>
        </div>

        {/* 2. MASAÜSTÜ ARAMA ÇUBUĞU */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3 border focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all ml-auto md:ml-0">
          <Search className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="İlaç ara..."
            className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
          />
          <button className="bg-blue-100 p-1.5 rounded-full text-blue-600 hover:bg-blue-200 transition-colors">
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* 3. MASAÜSTÜ LİNKLER */}
        <div className="hidden md:flex gap-6 text-gray-600 font-medium items-center md:ml-auto">
          <Link href="/blog" className="hover:text-blue-500">Blog</Link>
          <Link href="/testler" className="hover:text-blue-500">Testler</Link>
          <Link href="/eczaneler" className="hover:text-blue-500">Eczaneler</Link>

          <Link href="/hesap" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <User className="w-4 h-4" />
            <span>Hesap</span>
          </Link>
        </div>

        {/* --------------------------------------------------- */}
        {/* 4. HAMBURGER BUTONU */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

      </div>

      {/* MOBİL ARAMA ÇUBUĞU */}
      <div className="md:hidden px-4 pb-3 bg-white relative z-50">
        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2.5 border focus-within:border-blue-500">
          <Search className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="İlaç kutusunu tarat veya ismini yaz..."
            className="bg-transparent outline-none w-full text-sm"
          />
          <button className="ml-2 text-blue-600 bg-blue-50 p-1 rounded-full">
            <Camera className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* MOBİL MENÜ VE PERDE */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 flex flex-col gap-2 shadow-lg absolute w-full left-0 top-full z-50">

            <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600 py-3 border-b border-gray-50 font-medium">Blog Yazıları</Link>
            <Link href="/testler" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600 py-3 border-b border-gray-50 font-medium">Sağlık Testleri</Link>
            <Link href="/eczaneler" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600 py-3 border-b border-gray-50 font-medium">Nöbetçi Eczaneler</Link>

            <Link href="/hesap" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4">
              <User className="w-5 h-5" />
              <span>Hesabıma Git</span>
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}