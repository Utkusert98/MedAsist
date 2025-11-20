import Image from "next/image";
import Link from "next/link";
import { bloglar } from "@/data/blogData"; // Oluşturduğumuz veriyi çektik

export default function BlogListesi() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        
        {/* Sayfa Başlığı */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sağlık Rehberi & Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Uzman yazılarımızla sağlığınız hakkında en doğru bilgilere ulaşın.
          </p>
        </div>

        {/* Blog Kartları Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bloglar.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.id} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                
                {/* Resim Alanı */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={blog.resim}
                    alt={blog.baslik}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Kategori Etiketi */}
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {blog.kategori}
                  </span>
                </div>

                {/* Yazı Alanı */}
                <div className="p-6">
                  <div className="text-sm text-gray-400 mb-2">{blog.tarih}</div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {blog.baslik}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {blog.ozet}
                  </p>
                  <div className="mt-4 text-blue-600 font-medium text-sm flex items-center">
                    Okumaya Devam Et →
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}