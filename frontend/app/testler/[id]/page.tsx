"use client";

import { useState, use } from "react"; // 'use' hook'u Next.js 15 için şart
import { testler } from "@/data/testData";
import Image from "next/image";
import Link from "next/link";
import { Plus, RefreshCw, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

export default function TestDetay({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);
    const test = testler.find((t) => t.url === id);

    // STATE (Hafıza) Değişkenleri
    const [aktifSoru, setAktifSoru] = useState(0);
    const [toplamPuan, setToplamPuan] = useState(0);
    const [testBitti, setTestBitti] = useState(false);

    if (!test) {
        return notFound();
    }

    // --- ŞIKKA TIKLAMA MANTIĞI ---
    const sikkaTikla = (puan: number) => {
        const yeniPuan = toplamPuan + puan;
        setToplamPuan(yeniPuan);

        if (aktifSoru + 1 < test.sorular.length) {
            setAktifSoru(aktifSoru + 1);
        } else {
            setTestBitti(true);
        }
    };

    // --- TESTİ BAŞA SAR ---
    const testiSifirla = () => {
        setAktifSoru(0);
        setToplamPuan(0);
        setTestBitti(false);
    };

    // --- SONUÇ HESAPLAMA ---
    const sonuc = test.sonuclar?.find(
        (s) => toplamPuan >= s.min && toplamPuan <= s.max
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-2xl">

                {!testBitti ? (
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 animate-fade-in">

                        {/* İlerleme Çubuğu */}
                        <div className="mb-8">
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                Soru {aktifSoru + 1} / {test.sorular.length}
                            </span>
                            <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${((aktifSoru + 1) / test.sorular.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Soru */}
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
                            {test.sorular[aktifSoru].soru}
                        </h2>

                        {/* Şıklar */}
                        <div className="space-y-4">
                            {test.sorular[aktifSoru].siklar.map((sik, index) => (
                                <button
                                    key={index}
                                    onClick={() => sikkaTikla(sik.puan)}
                                    className="w-full text-left p-5 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium text-gray-700 flex justify-between items-center group"
                                >
                                    {sik.metin}
                                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (

                    /* TEST BİTTİ (SONUÇ EKRANI) */
                    <div className="space-y-8 animate-fade-in">

                        {/* Sonuç Kartı */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-8 border-blue-600">
                            <h2 className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-2">Analiz Sonucunuz</h2>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sonuc?.tip}</h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8 border-b border-gray-100 pb-8">
                                {sonuc?.detay}
                            </p>

                            <button
                                onClick={testiSifirla}
                                className="flex items-center justify-center gap-2 mx-auto text-gray-500 hover:text-blue-600 transition font-medium"
                            >
                                <RefreshCw className="w-4 h-4" /> Testi Tekrar Çöz
                            </button>
                        </div>

                        {/* Ürün Önerileri */}
                        {sonuc?.onerilenUrunler && sonuc.onerilenUrunler.length > 0 && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 px-2">Size Özel Öneriler ✨</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {sonuc.onerilenUrunler.map((urun) => (
                                        <div key={urun.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex items-center gap-4">
                                            {/* Ürün Resmi */}
                                            <div className="relative w-20 h-20 bg-gray-50 rounded-lg shrink-0 overflow-hidden">
                                                <Image
                                                    src={urun.resim}
                                                    alt={urun.isim}
                                                    fill
                                                    className="object-contain mix-blend-multiply p-2"
                                                />
                                            </div>

                                            {/* Bilgiler */}
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800 text-lg">{urun.isim}</h4>
                                                <div className="text-blue-600 font-bold mt-1">{urun.fiyat}</div>
                                            </div>

                                            {/* Buton */}
                                            <button className="bg-blue-100 text-blue-600 p-3 rounded-xl hover:bg-blue-600 hover:text-white transition">
                                                <Plus className="w-6 h-6" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="text-center mt-8">
                            <Link href="/testler" className="text-gray-500 hover:text-gray-900 font-medium inline-flex items-center gap-2">
                                ← Diğer Testlere Bak
                            </Link>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}