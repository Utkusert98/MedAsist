"use client";

import { useState } from "react";
import { MapPin, Phone, Navigation, Search } from "lucide-react";

export default function EczanelerPage() {
  // --- HAFIZA (STATE) ---
  const [il, setIl] = useState("");
  const [ilce, setIlce] = useState("");
  const [aramaYapildi, setAramaYapildi] = useState(false);

  // --- SAHTE VERİ (MOCK DATA) ---
  // Backend bağlanana kadar bu listeyi göstereceğiz.
  const sahteEczaneler = [
    { id: 1, ad: "Hayat Eczanesi", adres: "Bağdat Cad. No:12 Kadıköy/İstanbul", tel: "0216 123 45 67", mesafe: "300m" },
    { id: 2, ad: "Merkez Eczane", adres: "Söğütlüçeşme Cad. No:5 Kadıköy/İstanbul", tel: "0216 987 65 43", mesafe: "1.2km" },
    { id: 3, ad: "Şifa Eczanesi", adres: "Moda Cad. No:40 Kadıköy/İstanbul", tel: "0216 555 44 33", mesafe: "2.1km" },
  ];

  return (
    <div className="min-h-screen bg-blue-50 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* BAŞLIK */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nöbetçi Eczaneler</h1>
          <p className="text-gray-600">Size en yakın eczaneyi bulun.</p>
        </div>

        {/* ARAMA KUTUSU */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* İl Seçimi */}
            <select 
              value={il} 
              onChange={(e) => setIl(e.target.value)} 
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 text-gray-700 bg-white"
            >
              <option value="">İl Seçiniz</option>
              <option value="istanbul">İstanbul</option>
              <option value="ankara">Ankara</option>
              <option value="izmir">İzmir</option>
            </select>

            {/* İlçe Seçimi */}
            <select 
              value={ilce}
              onChange={(e) => setIlce(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 text-gray-700 bg-white"
            >
              <option value="">İlçe Seçiniz</option>
              <option value="kadikoy">Kadıköy</option>
              <option value="besiktas">Beşiktaş</option>
              <option value="cankaya">Çankaya</option>
            </select>

            {/* Ara Butonu */}
            <button 
              onClick={() => setAramaYapildi(true)} 
              className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" /> Eczane Bul
            </button>

          </div>
        </div>

        {/* --- SONUÇ LİSTESİ --- */}
        {/* Mantık: Eğer aramaYapildi TRUE ise bu kısmı göster */}
        {aramaYapildi && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-4 ml-2">Arama Sonuçları (3 Eczane Bulundu)</h3>
            
            {sahteEczaneler.map((eczane) => (
              <div key={eczane.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-400 transition group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  
                  {/* Sol Taraf: Eczane Bilgileri */}
                  <div className="flex gap-4">
                    {/* İkon Kutusu */}
                    <div className="bg-red-100 text-red-600 p-3 rounded-full h-fit">
                      <MapPin className="w-6 h-6" />
                    </div>
                    
                    {/* Yazılar */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">{eczane.ad}</h4>
                      <p className="text-gray-500 text-sm mt-1">{eczane.adres}</p>
                      
                      <div className="flex items-center gap-4 mt-3 text-sm font-medium">
                        <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded">
                            <Navigation className="w-3 h-3 mr-1" /> {eczane.mesafe}
                        </span>
                        <span className="flex items-center text-gray-600">
                            <Phone className="w-3 h-3 mr-1" /> {eczane.tel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sağ Taraf: Yol Tarifi Butonu */}
                  <button className="w-full md:w-auto bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-2">
                    Yol Tarifi Al
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}