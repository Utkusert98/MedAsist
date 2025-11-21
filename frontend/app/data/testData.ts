export const testler = [
  {
    id: 1,
    url: "cilt-analizi",
    baslik: "Yapay Zeka Destekli Cilt Analizi",
    aciklama: "Cilt tipinizi öğrenin ve size özel dermokozmetik ürünleri keşfedin.",
    resim: "https://images.unsplash.com/photo-1556228720-196743936247?w=800&q=80", 
    
    // SORULAR
    sorular: [
      {
        soru: "Yüzünüzü yıkadıktan sonra cildinizde gerginlik hissediyor musunuz?",
        siklar: [
          { metin: "Evet, çok geriliyor.", puan: 1 }, 
          { metin: "Hayır, hemen yağlanıyor.", puan: 3 }, 
          { metin: "Sadece yanaklarım geriliyor.", puan: 2 } 
        ]
      },
      {
        soru: "Gün içinde T bölgenizde (Alın, Burun, Çene) parlama oluyor mu?",
        siklar: [
          { metin: "Evet, yüzüm parıl parıl parlıyor.", puan: 3 },
          { metin: "Hayır, mat ve solgun duruyor.", puan: 1 },
          { metin: "Bazen oluyor.", puan: 2 }
        ]
      },
      {
        soru: "Gözenekleriniz belirgin mi?",
        siklar: [
          { metin: "Evet, çok geniş gözeneklerim var.", puan: 3 },
          { metin: "Hayır, gözeneklerim görünmüyor.", puan: 1 },
          { metin: "Sadece burnumun üstünde var.", puan: 2 }
        ]
      }
    ],

    // SONUÇLAR (Puan aralığına göre)
    sonuclar: [
      {
        min: 3, 
        max: 5,
        tip: "Kuru ve Hassas Cilt",
        detay: "Cildinizin nem bariyeri zayıflamış. Yoğun nemlendirici ve alkolsüz temizleyiciler kullanmalısınız.",
        onerilenUrunler: [
          { id: 101, isim: "CeraVe Nemlendirici", resim: "/kozmetik/cerave-nemlendirici.jpg" }, 
          { id: 102, isim: "La Roche Posay Jel", resim: "/kozmetik/la-roche.jpg" }
        ]
      },
      {
        min: 6, 
        max: 7,
        tip: "Karma Cilt",
        detay: "Yüzünüzün bazı bölgeleri yağlı bazıları kuru. Dengeleyici ürünler kullanmalısınız.",
        onerilenUrunler: [
          { id: 201, isim: "La Roche Effaclar Duo(+) ", resim: "/kozmetik/effaclar.jpg" },
          { id: 202, isim: "Caudalie Vinopure", resim: "/kozmetik/caudalie-vinopure.jpg" }
        ]
      },
      {
        min: 8,
        max: 9,
        tip: "Yağlı ve Akneye Meyilli Cilt",
        detay: "Sebum üretiminiz fazla. Matlaştırıcı ve gözenek sıkılaştırıcı ürünler size uygun.",
        onerilenUrunler: [
          { id: 301, isim: "La Roche Posay Effaclar Jel", resim: "/kozmetik/la-roche-posay-effaclar-jel.jpg" },
          { id: 302, isim: "Caudalie Vinopure Blemish", resim: "/kozmetik/caudalie-vinopure-blemish-.jpg" }
        ]
      }
    ]
  },
  
  // İKİNCİ TEST ÖRNEĞİ
  {
    id: 2,
    url: "genel-saglik", // Link: /testler/genel-saglik
    baslik: "Genel Sağlık Taraması",
    aciklama: "Vücudunuzun verdiği sinyalleri kontrol edin. Risk altında mısınız?",
    resim: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
    sorular: [
      {
        soru: "Günde kaç litre su içiyorsunuz?",
        siklar: [
          { metin: "2 Litreden fazla", puan: 0 }, // İyi
          { metin: "1 Litreden az", puan: 5 },    // Kötü
        ]
      },
      {
        soru: "Kendinizi gün içerisinde enrejik hissediyor musunuz?",
        siklar: [
          { metin: "Hiç hissetmiyorum", puan: 5 },
          { metin: "Bazen", puan: 2 },
          { metin: "Her zaman enerjik hissediyorum", puan: 0 }
        ]
      },
      {
        soru: "Haftada kaç gün egzersiz yapıyorsunuz?",
        siklar: [
          { metin: "Hiç yapmıyorum", puan: 5 },
          { metin: "1-2 gün", puan: 2 },
          { metin: "3 gün ve üzeri", puan: 0 }
        ]
      }
    ],
    sonuclar: [
      {
        min: 0, max: 4,
        tip: "Harika Görünüyorsun! 🌟",
        detay: "Yaşam tarzınız gayet sağlıklı. Hem bağışıklık güçlendirici hem de enerjini arttırmaya ne dersin?.",
        onerilenUrunler: [
            { id: 401, isim: "TAB Ilaç Vitality Enerji", resim: "/kozmetik/vitality.webp" }
        ]
      },
      {
        min: 5, max: 10,
        tip: "Dikkat Etmelisin ⚠️",
        detay: "Vücudun susuz kalmış ve hareketsizsin. Takviye almayı düşünebilirsin.",
        onerilenUrunler: [
            { id: 401, isim: "Dailyshot Electrovit Portakal Aromalı", resim: "/kozmetik/electrovit.JPG" }
        ]
      }
    ]
  }
];