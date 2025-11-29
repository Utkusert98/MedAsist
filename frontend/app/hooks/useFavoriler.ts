"use client";
import { useState, useEffect } from "react";

export function useFavoriler() {
  const [favoriler, setFavoriler] = useState<number[]>([]);

  // Sayfa açılınca hafızadan oku
  useEffect(() => {
    const kayitli = localStorage.getItem("medasist_favoriler");
    if (kayitli) {
      setFavoriler(JSON.parse(kayitli));
    }
  }, []);

  // Favori Ekle/Çıkar Fonksiyonu
  const toggleFavori = (id: number) => {
    let yeniListe;
    if (favoriler.includes(id)) {
      yeniListe = favoriler.filter((favId) => favId !== id); // Varsa çıkar
    } else {
      yeniListe = [...favoriler, id]; // Yoksa ekle
    }
    setFavoriler(yeniListe);
    localStorage.setItem("medasist_favoriler", JSON.stringify(yeniListe));
  };

  // Bu ilac favoride mi?
  const favorideMi = (id: number) => favoriler.includes(id);

  return { favoriler, toggleFavori, favorideMi };
}