"use client";

import { useFavoriler } from "@/hooks/useFavoriler";
import { ilaclar } from "@/data/ilacData";
import Link from "next/link";
import { Pill, Trash2 } from "lucide-react";

export default function IlaclarimPage() {
  // Motoru yine çağırdık (Hafızadan okumak için)
  const { favoriler, toggleFavori } = useFavoriler();

  // Favori ID'lerine (örn: [1, 5]) bakarak gerçek ilaç verilerini buluyoruz
  const favoriIlaclar = ilaclar.filter((ilac) => favoriler.includes(ilac.id));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">İlaçlarım ({favoriIlaclar.length})</h1>
            <Link href="/" className="text-blue-600 hover:underline">← Anasayfa</Link>
        </div>

        {favoriIlaclar.length > 0 ? (
          <div className="space-y-4">
            {favoriIlaclar.map((ilac) => (
              <div key={ilac.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center group">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Pill className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">{ilac.ad}</h3>
                        <p className="text-sm text-gray-500">{ilac.kategori}</p>
                    </div>
                </div>
                
                {/* SİLME BUTONU (Çöp Kutusu) */}
                <button 
                    onClick={() => toggleFavori(ilac.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                    title="Listeden Çıkar"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">Henüz listenize ilaç eklemediniz.</p>
            <Link href="/" className="text-blue-600 font-bold mt-4 inline-block">İlaç Aramaya Başla</Link>
          </div>
        )}
      </div>
    </div>
  );
}