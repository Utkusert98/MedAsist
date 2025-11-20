import Image from "next/image";
import Link from "next/link";
import { bloglar } from "@/data/blogData";
import { notFound } from "next/navigation";

// TİP TANIMLAMASI: params artık bir Promise
export default async function BlogDetay({ params }: { params: Promise<{ slug: string }> }) {
  
  // 1. ADIM: Önce parametrelerin çözülmesini bekliyoruz (Next.js 15 Kuralı)
  const { slug } = await params;

  // 2. ADIM: Şimdi 'slug' değerini kullanabiliriz
  const yazi = bloglar.find((b) => b.slug === slug);

  // 3. Yazı yoksa 404 ver
  if (!yazi) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Geri Dön Linki */}
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium mb-8 inline-flex items-center transition-colors">
          ← Blog Listesine Dön
        </Link>

        {/* Kategori & Tarih */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
            {yazi.kategori || "Genel"}
          </span>
          <span className="text-gray-500">{yazi.tarih}</span>
        </div>

        {/* Başlık */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          {yazi.baslik}
        </h1>

        {/* Büyük Resim */}
        <div className="relative w-full h-[300px] md:h-[500px] mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image 
              src={yazi.resim} 
              alt={yazi.baslik} 
              fill 
              className="object-cover"
          />
        </div>

        {/* İçerik */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p className="font-medium text-xl text-gray-900 mb-6">{yazi.ozet}</p>
          <p>{yazi.icerik}</p>
        </div>

      </div>
    </article>
  );
}