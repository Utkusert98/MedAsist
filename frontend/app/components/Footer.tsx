import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* 1. Sütun: Hakkımızda */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">MedAsist</h3>
          <p className="text-sm leading-relaxed">
            Yapay zeka destekli sağlık asistanınız. İlaçlarınızı tanıyın,
            eczaneleri bulun ve sağlığınızı güvenle yönetin.
          </p>
        </div>

        {/* 2. Sütun: Hızlı Linkler */}
        <div>
          <h4 className="text-white font-bold mb-4">Hızlı Erişim</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Nöbetçi Eczaneler</a></li>
            <li><a href="#" className="hover:text-blue-400">İlaç Rehberi</a></li>
            <li><a href="#" className="hover:text-blue-400">Blog Yazıları</a></li>
            <li><a href="#" className="hover:text-blue-400">İletişim</a></li>
          </ul>
        </div>

        {/* 3. Sütun: İletişim & Sosyal */}
        <div>
          <h4 className="text-white font-bold mb-4">Bize Ulaşın</h4>
          <p className="text-sm mb-4">info@medasist.com</p>
          <div className="flex gap-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-500" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-500" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          </div>
        </div>

      </div>
      <div className="text-center text-xs text-gray-600 mt-10 border-t border-gray-800 pt-6">
        © 2025 MedAsist. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}