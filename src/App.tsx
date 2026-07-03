/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wind, Anchor, Facebook, Phone, Mail, Instagram, ChevronLeft, ChevronRight, FileText, Download, Users, ChevronDown, BookOpen, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './components/ScrollReveal';

const SLIDES = [
  "/SDC_6302.jpg",
  "/698888441_1021236063802230_6354780536689167467_n.jpg",
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [activeModel, setActiveModel] = useState('SMAI-05');
  const isNavClickRef = React.useRef(false);
  const activeSectionRef = React.useRef('home');

  const setActiveSectionSafe = (section: string) => {
    activeSectionRef.current = section;
    setActiveSection(section);
  };

  const SECTION_TITLES: { [key: string]: string } = {
    home: 'หน้าแรก | S-MAI',
    contact: 'ติดต่อเรา | S-MAI',
    about: 'รายละเอียดการสมัคร | S-MAI',
    archive: 'คลังเก็บข้อมูล | S-MAI',
    yearbook: 'ทำเนียบรุ่น | S-MAI',
  };

  useEffect(() => {
    document.title = SECTION_TITLES[activeSection] || 'S-MAI';
  }, [activeSection]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const sections = ['home-section', 'about-section', 'archive-section', 'contact-section'];
    let observers: ({ observer: IntersectionObserver; el: Element } | null)[] = [];

    const timer = setTimeout(() => {
      observers = sections.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isNavClickRef.current && activeSectionRef.current !== 'yearbook') {
              if (id === 'home-section') setActiveSectionSafe('home');
              else if (id === 'about-section') setActiveSectionSafe('about');
              else if (id === 'archive-section') setActiveSectionSafe('archive');
              else if (id === 'contact-section') setActiveSectionSafe('contact');
            }
          },
          { threshold: 0.2 }
        );

        observer.observe(el);
        return { observer, el };
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleNavClick = (sectionId: string, sectionName: string) => {
    setActiveSectionSafe(sectionName);
    if (sectionName === 'yearbook') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    isNavClickRef.current = true;
    setTimeout(() => {
      if (sectionName === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setTimeout(() => { isNavClickRef.current = false; }, 1000);
    }, 50);
  };

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
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home-section', 'home'); }} className="flex items-center cursor-pointer">
              <img src="/S-MAI2.png" alt="S-MAI Logo" className="h-[35px] sm:h-[45px] md:h-[65px] w-auto" />
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-base font-prompt text-gray-600">
            <button 
              onClick={() => handleNavClick('home-section', 'home')} 
              className={`hover:text-gray-900 transition-colors duration-300 cursor-pointer ${activeSection === 'home' ? 'text-gray-900 font-semibold' : ''}`}
            >
              หน้าแรก
            </button>
            <button 
              onClick={() => handleNavClick('contact-section', 'contact')} 
              className={`hover:text-gray-900 transition-colors duration-300 cursor-pointer ${activeSection === 'contact' ? 'text-gray-900 font-semibold' : ''}`}
            >
              ช่องทางการติดต่อ
            </button>
            
            {/* Dropdown Menu for คลังข้อมูล */}
            <div className="relative group/dropdown py-2">
              <button 
                className={`hover:text-gray-900 transition-colors duration-300 cursor-pointer flex items-center gap-1 ${activeSection === 'archive' || activeSection === 'yearbook' ? 'text-gray-900 font-semibold' : ''}`}
              >
                <span>คลังข้อมูล</span>
                <ChevronDown size={14} className="group-hover/dropdown:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Dropdown Content */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-44 rounded-xl bg-white shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 z-50">
                <button 
                  onClick={() => handleNavClick('about-section', 'about')}
                  className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#05086e] font-prompt transition-colors cursor-pointer"
                >
                  เกี่ยวกับโครงการ
                </button>
                <button 
                  onClick={() => handleNavClick('archive-section', 'archive')}
                  className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#05086e] font-prompt transition-colors cursor-pointer"
                >
                  ดาวน์โหลดเอกสาร
                </button>
                <button 
                  onClick={() => handleNavClick('yearbook-section', 'yearbook')}
                  className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#05086e] font-prompt transition-colors cursor-pointer"
                >
                  ทำเนียบรุ่น
                </button>
              </div>
            </div>

            <button 
              onClick={() => handleNavClick('about-section', 'about')} 
              className={`bg-[#DA5F8E] text-white px-5 py-2 rounded-full hover:bg-[#DA5F8E]/90 transition-colors duration-300 shadow-sm cursor-pointer ${activeSection === 'about' ? 'ring-2 ring-pink-300 ring-offset-2' : ''}`}
            >
              รายละเอียดการสมัคร
            </button>
          </nav>
        </header>
      </div>

      {/* Hero Content */}
      <main className="flex-grow relative z-10 flex flex-col">
        <div className={activeSection === 'yearbook' ? 'hidden' : 'block'}>
        {/* Slideshow Container */}
        <div id="home-section" className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
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
            <ScrollReveal variant="fade-up" duration={700}>
              <div className="text-center mb-10 space-y-2 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-[#05086e] font-prompt">ข่าวสารล่าสุด</h2>
                <div className="w-16 h-1 bg-[#DA5F8E]"></div>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item, index) => (
                <ScrollReveal 
                  key={item} 
                  variant="fade-up" 
                  delay={index * 150} 
                  duration={800}
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 h-full">
                    <img src={`https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80&sig=${item}`} alt="News" className="w-full h-48 object-cover" />
                    <div className="p-5 space-y-3">
                      <p className="text-xs text-[#DA5F8E] font-medium font-prompt">2 กรกฎาคม 2026</p>
                      <h3 className="font-bold text-gray-800 font-prompt line-clamp-2">ประกาศรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2570</h3>
                      <p className="text-sm text-gray-500 font-prompt line-clamp-2">รายละเอียดการรับสมัครนักเรียนเข้าศึกษาต่อในระดับชั้นมัธยมศึกษาปีที่ 1 และ 4 โครงการห้องเรียนพิเศษ...</p>
                      <a href="#" className="inline-block text-[#05086e] text-sm font-semibold font-prompt hover:underline">อ่านต่อ &rarr;</a>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-12 px-6 sm:px-12 md:px-24 lg:px-40 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fade-up" duration={700}>
              <div className="text-center mb-10 space-y-2 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-[#05086e] font-prompt">กิจกรรมของเรา</h2>
                <div className="w-16 h-1 bg-[#DA5F8E]"></div>
              </div>
            </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { img: '/event/721576126_1707011227305024_8277041940511752542_n.jpg', url: 'https://www.facebook.com/share/p/1GzfRdny6o/' },
                  { img: '/event/721323216_27759433520309263_6917513598114110134_n.jpg', url: 'https://www.facebook.com/share/p/1DiyMWAC8t/' },
                  { img: '/event/700679212_1022144773711359_6457299316811662779_n.jpg', url: 'https://www.facebook.com/share/p/1DS8ytu6Fv/' },
                  { img: '/event/698888441_1021236063802230_6354780536689167467_n.jpg', url: 'https://www.facebook.com/share/p/1973Y3sCCC/' }
                ].map((item, index) => (
                  <ScrollReveal 
                    key={index} 
                    variant="zoom-in" 
                    delay={index * 100} 
                    duration={600}
                  >
                    {/* เปลี่ยน href มาดึงค่าจาก item.url */}
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group block relative rounded-xl overflow-hidden shadow-md"
                    >
                      {/* เปลี่ยน src มาดึงค่าจาก item.img */}
                      <img src={item.img} alt="Activity" className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-sm">
                        <ExternalLink size={20} />
                      </div>
                    </a>
                  </ScrollReveal>
                ))}
              </div>
          </div>
        </section>





        {/* About Section */}
        <section id="about-section" className="py-12 px-6 sm:px-12 md:px-24 lg:px-40 bg-gray-50 overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2">
              <ScrollReveal variant="fade-right" duration={800}>
                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="About" className="rounded-xl shadow-lg object-cover h-[300px] w-full" />
              </ScrollReveal>
            </div>
            <div className="w-full md:w-1/2">
              <ScrollReveal variant="fade-left" duration={800} delay={100}>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-[#05086e] font-prompt">เกี่ยวกับโครงการ</h2>
                  <div className="w-16 h-1 bg-[#DA5F8E]"></div>
                  <p className="text-gray-600 leading-relaxed font-prompt text-sm sm:text-base">
                    โครงการห้องเรียนพิเศษ โรงเรียนเตรียมอุดมศึกษาพัฒนาการ รัชดา มุ่งมั่นพัฒนาศักยภาพของนักเรียนในทุกๆ ด้าน ทั้งวิชาการ ทักษะชีวิต และเทคโนโลยี เพื่อเตรียมความพร้อมสู่การเป็นผู้นำในอนาคต
                  </p>
                  <button className="px-6 py-2 bg-[#05086e] text-white rounded-md font-prompt text-sm hover:bg-[#05086e]/90 transition-colors">
                    อ่านเพิ่มเติม
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>


        </div>
        <div className={activeSection === 'yearbook' ? 'block flex-grow flex flex-col' : 'hidden'}>
          <section id="yearbook-section" className="flex-grow min-h-screen bg-gray-50 relative">
            {/* Floating Left Menu */}
            <div className="absolute top-8 left-8 w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 flex flex-col gap-2 z-20">
              <h3 className="text-[#05086e] font-bold font-prompt text-lg mb-4 border-b border-gray-200/60 pb-2">ทำเนียบรุ่น</h3>
              {['SMAI-05', 'SMAI-04', 'SMAI-03', 'SMAI-02', 'SMAI-01'].map((model) => (
                <button
                  key={model}
                  onClick={() => setActiveModel(model)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-prompt font-medium border ${activeModel === model ? 'text-[#DA5F8E] border-pink-200 bg-pink-50 shadow-sm' : 'text-gray-600 border-transparent hover:border-pink-100 hover:bg-pink-50/50 hover:text-[#DA5F8E]'}`}
                >
                  {model}
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Banner Section at the Bottom */}
      <footer id="contact-section" className="w-full mt-auto py-6 md:py-8 z-30 bg-[#DA5F8E] px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 w-full">
          
          {/* Social Logos on the Left */}
          <div className="flex flex-col items-center md:items-start gap-2 pb-2 md:pb-6">
            <span className="text-white font-prompt font-medium text-sm">Official Social Media</span>
            <div className="flex items-center gap-4 text-white">
              <a href="https://www.facebook.com/profile.php?id=100077475367296" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="/facebook.svg" alt="Facebook" className="w-12 h-12" />
              </a>
              <a href="https://www.instagram.com/smai__official/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="/instagram.svg" alt="Instagram" className="w-12 h-12" />
              </a>
            </div>
          </div>

          {/* Logo, Address, & Map on the Right */}
          <div className="flex flex-col sm:flex-row justify-end items-center sm:items-stretch gap-4 sm:gap-6 w-full md:w-auto">
            {/* Logo & Address Group */}
            <div className="flex flex-col items-center sm:items-end justify-center gap-2">
              <img src="/Logo%20only.png" alt="TUPR Logo" className="h-[60px] sm:h-[80px] md:h-[100px] w-auto" />
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
      <div className="w-full bg-[#05086e] text-white py-3 px-4 sm:px-8 flex items-center text-xs sm:text-sm z-30 font-prompt relative">
        <p className="absolute left-1/2 -translate-x-1/2 font-medium text-center">
          &copy; Copyright 2026 โรงเรียนเตรียมอุดมศึกษาพัฒนาการ รัชดา
        </p>
        <p className="font-medium text-xs sm:text-sm whitespace-nowrap ml-auto">
          Created and Designed by{' '}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleNavClick('yearbook-section', 'yearbook'); }}
            className="text-[#DA5F8E] hover:text-white transition-colors"
          >
            SMAI-04
          </a>
        </p>
      </div>
    </div>
  );
}
