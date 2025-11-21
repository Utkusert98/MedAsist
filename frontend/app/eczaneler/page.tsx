"use client";

import { useState } from "react";
import { MapPin, Phone, Navigation, Search, Loader2 } from "lucide-react";

export default function EczanelerPage() {
  
  // --- HAFIZA KUTULARI (STATE) ---
  const [il, setIl] = useState("");
  const [ilce, setIlce] = useState("");
  
  
  const [eczaneler, setEczaneler] = useState([]); 
  
  const [yukleniyor, setYukleniyor] = useState(false); // Bekleme ekranı için
  const [hata, setHata] = useState(""); // Hata olursa göstermek için

  // --- BACKEND'E İSTEK ATMA FONKSİYONU ---
  const eczaneGetir = async () => {
    
    if (!il || !ilce) {
      alert("Lütfen il ve ilçe seçiniz!");
      return;
    }

    setYukleniyor(true); // Yükleniyor dönmeye başlasın
    setHata(""); // Eski hataları temizle

    try {

      const response = await fetch(`http://127.0.0.1:8000/eczaneler?il=${il}&ilce=${ilce}`);
      

      const veri = await response.json();

      if (Array.isArray(veri)) {
        setEczaneler(veri); 
      } else {
        setHata("Eczane bulunamadı veya bir sorun oluştu.");
      }

    } catch (error) {
      setHata("Sunucuya bağlanılamadı. Backend açık mı?");
    } finally {
      setYukleniyor(false); // İşlem bitti, yükleniyor'u durdur
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nöbetçi Eczaneler</h1>
          <p className="text-gray-600">Canlı veri ile en yakın eczaneyi bulun.</p>
        </div>

        {/* ARAMA KUTUSU */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
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

            <select 
              value={ilce}
              onChange={(e) => setIlce(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 text-gray-700 bg-white"
            >
              <option value="">İlçe Seçiniz</option>
              {/* Gerçek projede ilçeler de otomatik gelir ama şimdilik elle yazalım */}
              <option value="kadikoy">Kadıköy</option>
              <option value="besiktas">Beşiktaş</option>
              <option value="uskudar">Üsküdar</option>
              <option value="cankaya">Çankaya</option>
              <option value="karsiyaka">Karşıyaka</option>
            </select>

            <button 
              onClick={eczaneGetir} // Tıklayınca fonksiyonu çalıştır
              disabled={yukleniyor} // Yüklenirken butona tekrar basılmasın
              className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:bg-blue-300"
            >
              {yukleniyor ? <Loader2 className="animate-spin" /> : <Search className="w-5 h-5" />}
              {yukleniyor ? "Aranıyor..." : "Eczane Bul"}
            </button>

          </div>
        </div>

        {/* --- SONUÇLAR --- */}
        
        {/* Hata Varsa Göster */}
        {hata && (
            <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 text-center">
                {hata}
            </div>
        )}

        {/* Liste Doluysa Göster */}
        <div className="space-y-4 animate-fade-in">
          {eczaneler.map((eczane: any, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-400 transition group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                
                <div className="flex gap-4">
                  <div className="bg-red-100 text-red-600 p-3 rounded-full h-fit">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    {/* API'den gelen veri isimleri: name, address, phone, dist */}
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">{eczane.name}</h4>
                    <p className="text-gray-500 text-sm mt-1">{eczane.address}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm font-medium">
                      {eczane.dist && (
                          <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded">
                            <Navigation className="w-3 h-3 mr-1" /> {eczane.dist}
                          </span>
                      )}
                      <span className="flex items-center text-gray-600">
                          <Phone className="w-3 h-3 mr-1" /> {eczane.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${eczane.loc}`} 
                    target="_blank"
                    className="w-full md:w-auto bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-2"
                >
                  Yol Tarifi Al
                </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}