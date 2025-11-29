"use client";

import Image from "next/image";
import { Star, Plus, Check } from "lucide-react"; 
import { useFavoriler } from "@/hooks/useFavoriler";
import { ilaclar } from "@/data/ilacData";

export default function PopularProducts() {
  const { toggleFavori, favorideMi } = useFavoriler();

  // Vitrin için seçtiğimiz ürünler (ID'leri ilacData.ts'de olanlar)
  const vitrinUrunleri = ilaclar.filter((ilac) => [31, 30, 4, 2].includes(ilac.id));

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-blue-600 pl-4">
            En Çok Tercih Edilenler ⭐
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {vitrinUrunleri.map((urun) => (
            <div key={urun.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-lg transition bg-white group relative">
              
              {/* Ürün Resmi */}
              <div className="relative h-40 w-full mb-4 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                <Image 
                    src={urun.resim} 
                    alt={urun.ad} 
                    fill 
                    className="object-contain mix-blend-multiply p-4" 
                    sizes="(max-width: 768px) 50vw, 25vw"
                />
                
                
                
                <button 
                    onClick={() => toggleFavori(urun.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md z-10 transition-all hover:scale-110"
                >
                    <Star 
                        className={`w-5 h-5 transition-colors ${
                            favorideMi(urun.id) 
                            ? "fill-yellow-400 text-yellow-400" // Favorideyse SARI
                            : "text-gray-300 fill-transparent"  // Değilse GRİ ve BOŞ
                        }`} 
                    />
                </button>
              </div>

              {/* Bilgiler */}
              <div className="text-xs text-blue-500 font-semibold">{urun.kategori}</div>
              <h3 className="font-bold text-gray-800 mt-1 group-hover:text-blue-600 truncate">{urun.ad}</h3>
              
              <div className="flex items-center mt-2 text-yellow-500 text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-gray-600 font-medium">4.8 (Puan)</span>
              </div>

              {/* Alt Kısımdaki Ekle Butonu */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-bold text-gray-400">Popüler Ürün</span>
                
                <button 
                    onClick={() => toggleFavori(urun.id)}
                    className={`p-2 rounded-lg transition-all ${
                        favorideMi(urun.id) 
                        ? "bg-green-100 text-green-600" 
                        : "bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white"
                    }`}
                >
                    {favorideMi(urun.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}