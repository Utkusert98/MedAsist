"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, Search, User, Menu, X, ChevronRight } from "lucide-react";
import { ilaclar } from "@/data/ilacData";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aramaMetni, setAramaMetni] = useState("");
  const [oneriler, setOneriler] = useState<typeof ilaclar>([]);
  const [oneriGoster, setOneriGoster] = useState(false);
  const router = useRouter();

  const yaziDegisti = (e: React.ChangeEvent<HTMLInputElement>) => {
    const metin = e.target.value;
    setAramaMetni(metin);

    if (metin.length > 0) {
      const bulunanlar = ilaclar.filter((ilac) =>
        ilac.ad.toLowerCase().includes(metin.toLowerCase()) ||
        ilac.neIseYarar.toLowerCase().includes(metin.toLowerCase())
      );
      setOneriler(bulunanlar.slice(0, 10));
      setOneriGoster(true);
    } else {
      setOneriler([]);
      setOneriGoster(false);
    }
  };

  const aramaYap = (e?: any) => {
    if (e?.key === 'Enter' || e?.type === 'click') {
      if (aramaMetni.trim()) {
        setOneriGoster(false);
        router.push(`/ilac-ara?q=${aramaMetni}`);
        setIsMenuOpen(false);
      }
    }
  };

  const oneriyeTikla = (ilacAdi: string) => {
    setAramaMetni(ilacAdi);
    setOneriGoster(false);
    router.push(`/ilac-ara?q=${ilacAdi}`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      
      {/* ÜST SATIR: LOGO - MASAÜSTÜ ARAMA - MENÜ BUTONU */}
      <div className="container mx-auto px-4 py-3 flex items-center gap-4 relative z-50 bg-white min-h-[60px]">

        {/* 1. LOGO */}
        <div className="text-2xl font-bold text-blue-600 shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <Link href="/">MedAsist</Link>
        </div>

        {/* 2. MASAÜSTÜ ARAMA (Sadece PC'de görünür) */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-t-2xl rounded-b-2xl px-4 py-2 w-1/3 border focus-within:border-blue-500 transition-all ml-auto md:ml-0 relative">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input 
              type="text" 
              placeholder="İlaç ara..." 
              className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
              value={aramaMetni}
              onChange={yaziDegisti}
              onKeyDown={aramaYap}
              onFocus={() => aramaMetni && setOneriGoster(true)}
            />
            <button onClick={aramaYap} className="bg-blue-100 p-1.5 rounded-full text-blue-600 hover:bg-blue-200 transition-colors">
              <Search className="w-4 h-4" />
            </button>

            {/* MASAÜSTÜ ÖNERİ KUTUSU */}
            {oneriGoster && oneriler.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-b-xl border border-gray-100 overflow-hidden z-[60] max-h-[400px] overflow-y-auto">
                    {oneriler.map((ilac) => (
                        <div key={ilac.id} onClick={() => oneriyeTikla(ilac.ad)} className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 text-sm text-gray-700 group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-bold text-gray-900 text-base">{ilac.ad}</div>
                                    <div className="text-xs text-gray-500 mt-1 line-clamp-1">{ilac.neIseYarar}</div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 mt-1" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* 3. MASAÜSTÜ LİNKLER */}
        <div className="hidden md:flex gap-6 text-gray-600 font-medium items-center md:ml-auto">
          <Link href="/blog" className="hover:text-blue-500">Blog</Link>
          <Link href="/testler" className="hover:text-blue-500">Testler</Link>
          <Link href="/eczaneler" className="hover:text-blue-500">Eczaneler</Link>
          <Link href="/hesap/ilaclarim" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <User className="w-4 h-4" />
            <span>Hesap</span>
          </Link>
        </div>

        {/* 4. HAMBURGER BUTONU (Sadece Mobilde) */}
        <button className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* ALT SATIR: MOBİL ARAMA (Sadece Mobilde) */}
      <div className="md:hidden px-4 pb-4 bg-white border-b border-gray-100 relative z-40">
         <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2.5 border focus-within:border-blue-500 relative">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input 
              type="text" 
              placeholder="İlaç ara..." 
              className="bg-transparent outline-none w-full text-sm py-1"
              value={aramaMetni}
              onChange={yaziDegisti}
              onKeyDown={aramaYap}
            />
             <button className="ml-2 text-blue-600 bg-blue-50 p-1.5 rounded-full">
                <Camera className="w-5 h-5" />
            </button>

            {/* MOBİL ÖNERİ KUTUSU */}
            {oneriGoster && oneriler.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-b-xl border border-gray-100 z-[60] mt-1 max-h-[300px] overflow-y-auto">
                    {oneriler.map((ilac) => (
                        <div key={ilac.id} onClick={() => oneriyeTikla(ilac.ad)} className="p-3 border-b border-gray-50 text-sm font-medium">
                            {ilac.ad}
                        </div>
                    ))}
                </div>
            )}
         </div>
      </div>

      {/* MOBİL MENÜ LİNKLERİ (Açılınca gelir) */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsMenuOpen(false)} />
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 flex flex-col gap-2 shadow-lg absolute w-full left-0 top-full z-50">
            <Link href="/blog" className="py-3 border-b text-gray-700 font-medium hover:text-blue-600">Blog</Link>
            <Link href="/testler" className="py-3 border-b text-gray-700 font-medium hover:text-blue-600">Testler</Link>
            <Link href="/eczaneler" className="py-3 border-b text-gray-700 font-medium hover:text-blue-600">Eczaneler</Link>
            <Link href="/hesap/ilaclarim" className="py-3 border-b text-blue-600 font-bold flex items-center gap-2">
                <User className="w-5 h-5" /> Hesabım (İlaçlarım)
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}