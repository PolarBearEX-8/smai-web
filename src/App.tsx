/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Wind, Anchor, Facebook, Phone, Mail, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Sticky Header Group */}
      <div className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
        {/* Top Blue Bar */}
        <div className="w-full bg-[#05086e] text-white py-2 px-4 sm:px-8 flex items-center text-xs sm:text-sm z-20 font-prompt">
          <div className="flex items-center gap-2 font-medium text-left">
            <Mail size={14} />
            <span>ติดต่อเพจ: โครงการห้องเรียนพิเศษ โรงเรียนเตรียมอุดมศึกษาพัฒนาการ รัชดา</span>
          </div>
        </div>
        
        {/* Navigation */}
        <header className="px-40 py-3 flex justify-between items-center bg-white z-20 border-b border-gray-100">
          <div className="flex items-center">
            <img src="/S-MAI2.png" alt="S-MAI Logo" className="h-[35px] sm:h-[45px] md:h-[65px] w-auto" />
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-base font-prompt text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors duration-300">หน้าแรก</a>
            <a href="#" className="hover:text-gray-900 transition-colors duration-300">ช่องทางการติดต่อ</a>
            <a href="#" className="bg-[#DA5F8E] text-white px-5 py-2 rounded-full hover:bg-[#DA5F8E]/90 transition-colors duration-300 shadow-sm">รายละเอียดการสมัคร</a>
          </nav>
        </header>
      </div>

      {/* Hero Content */}
      <main className="flex-grow relative z-10 flex flex-col">
        {/* Slideshow Container */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
          {/* Images */}
          {SLIDES.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img 
                src={slide} 
                alt={`Slide ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/50 hover:bg-white/80 rounded-full transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/50 hover:bg-white/80 rounded-full transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* News Section */}
        <section className="py-12 px-6 sm:px-12 md:px-24 lg:px-40 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 space-y-2 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-[#05086e] font-prompt">ข่าวสารล่าสุด</h2>
              <div className="w-16 h-1 bg-[#DA5F8E]"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                  <img src={`https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80&sig=${item}`} alt="News" className="w-full h-48 object-cover" />
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-[#DA5F8E] font-medium font-prompt">2 กรกฎาคม 2026</p>
                    <h3 className="font-bold text-gray-800 font-prompt line-clamp-2">ประกาศรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2570</h3>
                    <p className="text-sm text-gray-500 font-prompt line-clamp-2">รายละเอียดการรับสมัครนักเรียนเข้าศึกษาต่อในระดับชั้นมัธยมศึกษาปีที่ 1 และ 4 โครงการห้องเรียนพิเศษ...</p>
                    <a href="#" className="inline-block text-[#05086e] text-sm font-semibold font-prompt hover:underline">อ่านต่อ &rarr;</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-12 px-6 sm:px-12 md:px-24 lg:px-40 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 space-y-2 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-[#05086e] font-prompt">กิจกรรมของเรา</h2>
              <div className="w-16 h-1 bg-[#DA5F8E]"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group cursor-pointer relative rounded-xl overflow-hidden shadow-md">
                  <img src={`https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&sig=${item}`} alt="Activity" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold font-prompt">ค่ายวิชาการ 2569</h3>
                    <p className="text-white/80 text-xs font-prompt">ภาพบรรยากาศกิจกรรมค่ายวิชาการ</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 px-6 sm:px-12 md:px-24 lg:px-40 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="About" className="rounded-xl shadow-lg object-cover h-[300px] w-full" />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold text-[#05086e] font-prompt">เกี่ยวกับโครงการ</h2>
              <div className="w-16 h-1 bg-[#DA5F8E]"></div>
              <p className="text-gray-600 leading-relaxed font-prompt text-sm sm:text-base">
                โครงการห้องเรียนพิเศษ โรงเรียนเตรียมอุดมศึกษาพัฒนาการ รัชดา มุ่งมั่นพัฒนาศักยภาพของนักเรียนในทุกๆ ด้าน ทั้งวิชาการ ทักษะชีวิต และเทคโนโลยี เพื่อเตรียมความพร้อมสู่การเป็นผู้นำในอนาคต
              </p>
              <button className="px-6 py-2 bg-[#05086e] text-white rounded-md font-prompt text-sm hover:bg-[#05086e]/90 transition-colors">
                อ่านเพิ่มเติม
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Banner Section at the Bottom */}
      <footer className="w-full mt-auto py-6 md:py-8 z-30 bg-[#DA5F8E] px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
          
          {/* Social Logos on the Left */}
          <div className="flex items-center gap-4 text-white">
            <a href="https://www.facebook.com/profile.php?id=100077475367296" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
              <Facebook size={32} />
            </a>
            <a href="https://www.instagram.com/smai__official/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
              <Instagram size={32} />
            </a>
          </div>

          {/* Logo, Address, & Map on the Right */}
          <div className="flex flex-col sm:flex-row justify-end items-center sm:items-stretch gap-4 sm:gap-6 w-full md:w-auto">
            {/* Logo & Address Group */}
            <div className="flex flex-col items-center sm:items-end justify-center gap-2">
              <img src="/TUPR-LOGO.png" alt="TUPR Logo" className="h-[60px] sm:h-[80px] md:h-[100px] w-auto" />
              <p className="text-white text-[9px] sm:text-xs md:text-sm font-prompt text-center sm:text-right max-w-[200px] md:max-w-[260px]">
                170 ถ. รัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310
              </p>
            </div>
            
            {/* Map Group */}
            <div className="w-full sm:w-auto flex-1 max-w-[260px] sm:max-w-[280px] md:max-w-[320px] min-h-[120px] rounded-md overflow-hidden shadow-sm flex flex-col">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d721.8907976278658!2d100.57312465951557!3d13.772587519284885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29e80ab4f3093%3A0x76fe0ba5cfd20cbb!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZ4LmA4LiV4Lij4Li14Lii4Lih4Lit4Li44LiU4Lih4Lio4Li24LiB4Lip4Liy4Lie4Lix4LiS4LiZ4Liy4LiB4Liy4LijIOC4o-C4seC4iuC4lOC4sg!5e0!3m2!1sth!2sth!4v1783009548356!5m2!1sth!2sth" 
                width="100%" 
                height="100%" 
                style={{ border: 0, flexGrow: 1 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Blue Bar */}
      <div className="w-full bg-[#05086e] text-white py-3 px-4 sm:px-8 flex justify-center items-center text-xs sm:text-sm z-30 font-prompt">
        <p className="text-center font-medium">
          &copy; Copyright 2026 โรงเรียนเตรียมอุดมศึกษาพัฒนาการ รัชดา
        </p>
      </div>
    </div>
  );
}
