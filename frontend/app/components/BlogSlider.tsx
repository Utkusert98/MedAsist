"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const bloglar = [
  {
    id: 1,
    baslik: "Grip Aşısı Zamanı Geldi!",
    ozet: "Kış gelmeden bağışıklığınızı güçlendirin. Kimler aşı olmalı?",
    resim: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=1200&q=80", 
    link: "/blog/grip-asisi"
  },
  {
    id: 2,
    baslik: "C Vitamini Mucizesi",
    ozet: "Hangi besinlerde ne kadar C vitamini var? Doğal takviyeler.",
    resim: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80", 
    link: "/blog/c-vitamini"
  },
  {
    id: 3,
    baslik: "Nöbetçi Eczane Nasıl Bulunur?",
    ozet: "MedAsist ile size en yakın eczaneyi saniyeler içinde bulun.",
    resim: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=1200&q=80", 
    link: "/eczaneler"
  }
];

export default function BlogSlider() {
  return (
    <div className="w-full h-[400px] md:h-[500px]"> 
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true} 
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full"
      >
        {bloglar.map((blog) => (
          <SwiperSlide key={blog.id} className="relative">
            
            <Image
              src={blog.resim}
              alt={blog.baslik}
              fill
              className="object-cover brightness-50" 
            />
            
            <div className="absolute bottom-10 left-4 md:bottom-20 md:left-20 text-white max-w-[90%] md:max-w-xl z-10">
              
              <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 leading-tight">
                {blog.baslik}
              </h2>
              
              <p className="text-sm md:text-lg mb-4 md:mb-6 text-gray-200 line-clamp-2 md:line-clamp-none">
                {blog.ozet}
              </p>
              
              <Link 
                href={blog.link}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base px-6 py-2 md:px-8 md:py-3 rounded-full font-medium transition inline-block"
              >
                Devamını Oku
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}