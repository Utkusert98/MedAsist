import Image from "next/image";
import { Star } from "lucide-react";

const urunler = [
    { id: 1, isim: "Ocean Vitamin D3", kategori: "Vitamin", puan: 4.8, resim: "https://placehold.co/200x200/png?text=D3" },
    { id: 2, isim: "Magnimore Plus", kategori: "Magnezyum", puan: 4.9, resim: "https://placehold.co/200x200/png?text=Mg" },
    { id: 3, isim: "Ester-C™ Plus 1000 mg", kategori: "Vitamin", puan: 4.7, resim: "https://placehold.co/200x200/png?text=B12" },
    { id: 4, isim: "Propolis Damla", kategori: "Bağışıklık", puan: 4.6, resim: "https://placehold.co/200x200/png?text=Propolis" },
];

export default function PopularProducts() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">

                <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-blue-600 pl-4">
                    En Çok Tercih Edilenler ⭐
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {urunler.map((urun) => (
                        <div key={urun.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-lg transition bg-white group">

                            {/* Resim Alanı */}
                            <div className="relative h-40 w-full mb-4 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">

                                <Image
                                    src={urun.resim}
                                    alt={urun.isim}
                                    fill
                                    className="object-contain mix-blend-multiply p-4"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />

                                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 z-10">
                                    <Star className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="text-xs text-blue-500 font-semibold">{urun.kategori}</div>
                            <h3 className="font-bold text-gray-800 mt-1 group-hover:text-blue-600 truncate">{urun.isim}</h3>

                            <div className="flex items-center mt-2 text-yellow-500 text-sm">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="ml-1 text-gray-600 font-medium">{urun.puan}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}