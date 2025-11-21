"use client";

import { useSearchParams } from "next/navigation";
import { ilaclar } from "@/data/ilacData";
import Link from "next/link";
import { Pill, ArrowRight } from "lucide-react";
import { Suspense } from "react";

export default function IlacAramaPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
        <AramaSonuclari />
    </Suspense>
  );
}

function AramaSonuclari() {
  const searchParams = useSearchParams();
  const arananKelime = searchParams.get("q")?.toLowerCase() || "";

  const bulunanIlaclar = ilaclar.filter((ilac) => 
    ilac.ad.toLowerCase().includes(arananKelime) || 
    ilac.neIseYarar.toLowerCase().includes(arananKelime)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          "{searchParams.get("q")}" için Sonuçlar
        </h1>

        {bulunanIlaclar.length > 0 ? (
          <div className="space-y-4">
            {bulunanIlaclar.map((ilac) => (
              <div key={ilac.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start gap-6 hover:shadow-md transition">
                
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center shrink-0 text-blue-600 mt-2">
                   <Pill className="w-10 h-10" />
                </div>

                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{ilac.ad}</h2>
                    <div className="mt-2 mb-4">
                         <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                            {ilac.kategori}
                        </span>
                    </div>
                    
                    {/* BASİT ANLATIM KUTUSU */}
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="text-gray-700 font-medium leading-relaxed">
                           💡 <span className="font-bold text-gray-900">Ne işe yarar:</span> {ilac.neIseYarar}
                        </p>
                    </div>
                </div>

                <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition flex items-center gap-2 self-center md:self-start">
                    Detaylı Bilgi <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700">İlaç bulunamadı.</h3>
            <Link href="/" className="text-blue-600 font-bold mt-6 inline-block hover:underline">Anasayfaya Dön</Link>
          </div>
        )}
      </div>
    </div>
  );
}