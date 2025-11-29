"use client";

import { useState } from "react";
import { MapPin, Phone, Navigation, Search, Loader2 } from "lucide-react";
import { illerData } from "@/data/il-ilce";

export default function EczanelerPage() {

  const [il, setIl] = useState("");
  const [ilce, setIlce] = useState("");
  const [eczaneler, setEczaneler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");

  // --- YARDIMCI: Karakter Temizleme (Türkçe -> İngilizce) ---
  function temizle(metin: string) {
    if (!metin) return "";
    return metin
      .replace(/İ/g, "i").replace(/I/g, "i").replace(/ı/g, "i")
      .replace(/Ş/g, "s").replace(/ş/g, "s")
      .replace(/Ğ/g, "g").replace(/ğ/g, "g")
      .replace(/Ü/g, "u").replace(/ü/g, "u")
      .replace(/Ö/g, "o").replace(/ö/g, "o")
      .replace(/Ç/g, "c").replace(/ç/g, "c")
      .toLowerCase();
  }

  // --- SEÇİLEN İLİN VERİSİNİ BUL ---
  const secilenIlVerisi = illerData.find((item) =>
    temizle(item.name) === il
  );

  // İlçeleri Al
  const ilcelerListesi = secilenIlVerisi ? secilenIlVerisi.districts : [];

  const ilDegisti = (yeniIl: string) => {
    setIl(yeniIl);
    setIlce("");
  };

  const eczaneGetir = async () => {
    if (!il || !ilce) {
      alert("Lütfen il ve ilçe seçiniz!");
      return;
    }
    setYukleniyor(true);
    setHata("");

    try {
      const apiIl = temizle(il);
      const apiIlce = temizle(ilce);

      // Backend'e istek atıyoruz
      const response = await fetch(`http://127.0.0.1:8000/eczaneler?il=${apiIl}&ilce=${apiIlce}`);
      const veri = await response.json();

      if (Array.isArray(veri) && veri.length > 0) {
        setEczaneler(veri);
      } else {
        setEczaneler([]);
        setHata("Bu bölgede nöbetçi eczane bulunamadı.");
      }
    } catch (error) {
      setHata("Sunucuya bağlanılamadı. Backend açık mı?");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nöbetçi Eczaneler</h1>
          <p className="text-gray-600">En yakın eczaneyi anlık sorgulayın.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* İL SEÇİMİ */}
            <select
              value={il}
              onChange={(e) => ilDegisti(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 text-gray-700 bg-white"
            >
              <option value="">İl Seçiniz</option>
              {illerData.map((item) => (
                <option key={item.name} value={temizle(item.name)}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* İLÇE SEÇİMİ */}
            <select
              value={ilce}
              onChange={(e) => setIlce(e.target.value)}
              disabled={!il}
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 text-gray-700 bg-white disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="">{il ? "İlçe Seçiniz" : "Önce İl Seçiniz"}</option>
              {ilcelerListesi.map((ilceItem) => (
                <option key={ilceItem.name} value={temizle(ilceItem.name)}>
                  {ilceItem.name}
                </option>
              ))}
            </select>

            <button onClick={eczaneGetir} disabled={yukleniyor || !ilce} className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 disabled:bg-blue-300">
              {yukleniyor ? <Loader2 className="animate-spin" /> : <Search className="w-5 h-5" />}
              {yukleniyor ? "Aranıyor..." : "Eczane Bul"}
            </button>
          </div>
        </div>

        {hata && <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 text-center border border-red-200">{hata}</div>}

        <div className="space-y-4 animate-fade-in">
          {eczaneler.map((eczane: any, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-400 transition group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                
                <div className="flex gap-4">
                  <div className="bg-red-100 text-red-600 p-3 rounded-full h-fit"><MapPin className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">{eczane.name}</h4>
                    <p className="text-gray-500 text-sm mt-1">{eczane.address}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm font-medium">
                      {eczane.dist && <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded"><Navigation className="w-3 h-3 mr-1" /> {eczane.dist}</span>}
                      <span className="flex items-center text-gray-600"><Phone className="w-3 h-3 mr-1" /> {eczane.phone}</span>
                    </div>
                  </div>
                </div>

                {/* YOL TARİFİ BUTONU (GÜNCELLENDİ) */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eczane.name + " " + eczane.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
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