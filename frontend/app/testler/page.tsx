import Image from "next/image";
import Link from "next/link";
import { testler } from "@/data/testData"; 
import { ArrowRight, Activity } from "lucide-react";

export default function TestListesi() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        
        {/* Başlık Alanı */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Activity className="text-blue-600 w-10 h-10" />
            Sağlık Testleri
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Yapay zeka destekli testlerimizle sağlığınız hakkında ön bilgi edinin. 
            <br/> <span className="text-sm text-gray-400">(Not: Sonuçlar tıbbi teşhis yerine geçmez.)</span>
          </p>
        </div>

        {/* Test Kartları Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testler.map((test) => (
            <div key={test.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row gap-6 items-center">
              
              {/* Test Resmi */}
              <div className="relative w-full md:w-48 h-48 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={test.resim}
                  alt={test.baslik}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Test Bilgileri */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{test.baslik}</h2>
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {test.aciklama}
                </p>
                
                <Link 
                  href={`/testler/${test.url}`} 
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors w-full md:w-auto"
                >
                  Teste Başla <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}