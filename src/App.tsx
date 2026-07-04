/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wind, Anchor, Facebook, Phone, Mail, Instagram, ChevronLeft, ChevronRight, FileText, Download, Users, ChevronDown, BookOpen, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './components/ScrollReveal';

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.split('/').map(encodeURIComponent).join('/')}`;

const Reveal = ScrollReveal as any;

const SLIDES = [
  asset('SDC_6302.jpg'),
  asset('698888441_1021236063802230_6354780536689167467_n.jpg'),
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [activeModel, setActiveModel] = useState('SMAI-05');
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);
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
    documents: 'คลังเอกสาร | S-MAI',
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
            if (entry.isIntersecting && !isNavClickRef.current && activeSectionRef.current !== 'yearbook' && activeSectionRef.current !== 'documents') {
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
    const currentIsPage = activeSectionRef.current === 'yearbook' || activeSectionRef.current === 'documents';
    const targetIsPage = sectionName === 'yearbook' || sectionName === 'documents';
    const needsPageTransition = currentIsPage || targetIsPage;

    if (needsPageTransition) {
      // Phase 1: fade out main
      setIsTransitioning(true);
      setTimeout(() => {
        // Phase 2: switch page content
        setActiveSectionSafe(sectionName);
        window.scrollTo({ top: 0 });
        setIsTransitioning(false);
      }, 180);
      return;
    }

    // In-page scroll navigation
    setActiveSectionSafe(sectionName);
    isNavClickRef.current = true;
    setTimeout(() => {
      if (sectionName === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
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
    <>
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
              <img src={asset('S-MAI2.png')} alt="S-MAI Logo" className="h-[35px] sm:h-[45px] md:h-[65px] w-auto" />
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
                className={`hover:text-gray-900 transition-colors duration-300 cursor-pointer flex items-center gap-1 ${activeSection === 'archive' || activeSection === 'documents' || activeSection === 'yearbook' ? 'text-gray-900 font-semibold' : ''}`}
              >
                <span>คลังข้อมูล</span>
                <ChevronDown size={14} className="group-hover/dropdown:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Dropdown Content */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 z-50">
                <button 
                  onClick={() => handleNavClick('about-section', 'about')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#05086e] font-prompt transition-colors cursor-pointer flex items-center gap-2"
                >
                  <BookOpen size={14} />
                  เกี่ยวกับโครงการ
                </button>
                <button 
                  onClick={() => handleNavClick('documents-section', 'documents')}
                  className={`w-full text-left px-4 py-2 text-sm font-prompt transition-colors cursor-pointer flex items-center gap-2 ${ activeSection === 'documents' ? 'text-[#05086e] bg-blue-50 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-[#05086e]'}`}
                >
                  <FileText size={14} />
                  คลังเอกสาร
                </button>
                <button 
                  onClick={() => handleNavClick('archive-section', 'archive')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#05086e] font-prompt transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Download size={14} />
                  ดาวน์โหลดเอกสาร
                </button>
                <button 
                  onClick={() => handleNavClick('yearbook-section', 'yearbook')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#05086e] font-prompt transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Users size={14} />
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
      <main
        className="flex-grow relative z-10 flex flex-col"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(10px)' : 'translateY(0px)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }}
      >
        <div className={activeSection === 'yearbook' || activeSection === 'documents' ? 'hidden' : 'block'}>
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
            <Reveal variant="fade-up" duration={700}>
              <div className="text-center mb-10 space-y-2 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-[#05086e] font-prompt">ข่าวสารล่าสุด</h2>
                <div className="w-16 h-1 bg-[#DA5F8E]"></div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item, index) => (
                <Reveal
                  key={item}
                  variant="fade-up"
                  delay={index * 150}
                  duration={800}
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 h-full flex items-center justify-center min-h-[280px]">
                    <p className="text-gray-300 font-prompt text-lg">Page Not Found</p>
                  </div>
                </Reveal>
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
                  { img: asset('event/721576126_1707011227305024_8277041940511752542_n.jpg'), url: 'https://www.facebook.com/share/p/1GzfRdny6o/' },
                  { img: asset('event/721323216_27759433520309263_6917513598114110134_n.jpg'), url: 'https://www.facebook.com/share/p/1DiyMWAC8t/' },
                  { img: asset('event/700679212_1022144773711359_6457299316811662779_n.jpg'), url: 'https://www.facebook.com/share/p/1DS8ytu6Fv/' },
                  { img: asset('event/698888441_1021236063802230_6354780536689167467_n.jpg'), url: 'https://www.facebook.com/share/p/1973Y3sCCC/' }
                ].map((item, index) => (
                  <Reveal 
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
                  </Reveal>
                ))}
              </div>
          </div>
        </section>





        {/* About Section */}
        <section id="about-section" className="py-12 px-6 sm:px-12 md:px-24 lg:px-40 bg-gray-50 overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2">
              <ScrollReveal variant="fade-right" duration={800}>
                <img src={asset('eee.jpg')} alt="About" className="rounded-xl shadow-lg object-cover h-[300px] w-full" />
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
        {/* Yearbook Page */}
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

        {/* Documents Page - คลังเอกสาร */}
        <div className={activeSection === 'documents' ? 'block flex-grow flex flex-col' : 'hidden'}>
          <section id="documents-section" className="flex-grow min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12">

              {/* Header + Breadcrumb */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/90 px-4 py-2 shadow-sm text-sm font-prompt mb-3">
                  <button
                    type="button"
                    onClick={() => setOpenFolder(null)}
                    className={`rounded-lg border border-transparent px-3 py-1.5 transition-all duration-200 ${
                      openFolder
                        ? 'text-[#05086e] hover:border-gray-300 hover:bg-gray-100/60 hover:text-gray-900 cursor-pointer'
                        : 'text-gray-700 cursor-default'
                    }`}
                  >
                    คลังเอกสาร
                  </button>
                  {openFolder && (
                    <>
                      <span className="text-gray-300">/</span>
                      <button
                        type="button"
                        onClick={() => setOpenFolder(openFolder)}
                        className="rounded-lg border border-transparent px-3 py-1.5 text-gray-700 font-medium transition-all duration-200 hover:border-gray-300 hover:bg-gray-100/60 hover:text-gray-900 cursor-pointer"
                      >
                        {openFolder}
                      </button>
                    </>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-[#05086e] font-prompt">
                  {openFolder ?? 'คลังเอกสาร'}
                </h1>
                <div className="w-16 h-1 bg-[#DA5F8E] mt-2 mb-3"></div>
                <p className="text-gray-500 font-prompt text-sm">
                  {openFolder ? `เอกสารในโฟลเดอร์ ${openFolder}` : 'เลือกโฟลเดอร์เพื่อดูเอกสารภายใน'}
                </p>
              </div>

              {/* Folder View */}
              {!openFolder && (() => {
                const FOLDERS = [
                  {
                    id: 'รับสมัครนักเรียน 2569',
                    label: 'รับสมัครนักเรียน 2569',
                    count: 1,
                    color: 'from-amber-50 to-yellow-50',
                    border: 'border-amber-200',
                    iconColor: 'text-amber-400',
                  },
                ];
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {FOLDERS.map((folder) => (
                      <button
                        key={folder.id}
                        type="button"
                        onClick={() => setOpenFolder(folder.id)}
                        className="group inline-flex flex-col items-center justify-center gap-2 rounded-3xl border border-transparent px-8 py-6 bg-transparent cursor-pointer text-center transition-all duration-200 hover:scale-[1.03] hover:border-gray-300 hover:bg-gray-100/60 hover:shadow-sm"
                        aria-label={folder.label}
                        title={folder.label}
                      >
                        <svg className={`w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 ${folder.iconColor} transition-transform duration-200 drop-shadow-sm group-hover:translate-y-[-2px]`} viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 14a4 4 0 0 1 4-4h16l4 6h28a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V14z" opacity="0.35"/>
                          <path d="M4 20h56v26a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V20z"/>
                        </svg>
                        <span className="font-prompt font-semibold text-gray-700 text-sm sm:text-base leading-snug text-center">
                          {folder.label}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400 font-prompt">
                          {folder.count} ไฟล์
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })()}

              {/* File List View (inside folder) */}
              {openFolder === 'รับสมัครนักเรียน 2569' && (() => {
                const FILES = [
                  {
                    name: 'ประกาศรับสมัครนักเรียนห้องเรียนพิเศษ ม.4 SMAI ปีการศึกษา 2569 ตอพร.pdf',
                    url: asset('file/ประกาศรับสมัครนักเรียนห้องเรียนพิเศษ  ม.4 SMAI ปีการศึกษา 2569 ตอพร.pdf'),
                    size: '207 KB',
                    date: '2569',
                  },
                ];
                return (
                  <div className="flex flex-col gap-3">
                    {FILES.map((file, i) => (
                      <div
                        key={i}
                        className="group bg-white border border-gray-100 rounded-2xl px-6 py-4 flex items-center gap-5 hover:shadow-md hover:border-[#05086e]/20 transition-all duration-200 cursor-pointer"
                        onClick={() => { setPdfUrl(file.url); setPdfTitle(file.name); }}
                      >
                        {/* PDF Icon */}
                        <div className="flex-shrink-0 w-12 h-12 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center">
                          <svg className="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                            <path fill="white" d="M14 2v6h6"/>
                            <text x="5" y="19" fontSize="5" fontFamily="Arial" fontWeight="bold" fill="white">PDF</text>
                          </svg>
                        </div>
                        {/* Name & meta */}
                        <div className="flex-1 min-w-0">
                          <p className="font-prompt font-semibold text-gray-800 text-sm truncate group-hover:text-[#05086e] transition-colors">{file.name}</p>
                          <p className="text-xs text-gray-400 font-prompt mt-0.5">{file.size} &bull; ปี {file.date}</p>
                        </div>
                        {/* Open button */}
                        <div className="flex-shrink-0 flex items-center gap-2">
                          <span className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#05086e] text-white text-xs font-prompt font-medium group-hover:bg-[#05086e]/90 transition-colors">
                            <FileText size={12} />
                            ดูเอกสาร
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

            </div>
          </section>
        </div>

        {/* PDF Viewer Modal */}
        {pdfUrl && (
          <div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) { setPdfUrl(null); setPdfTitle(''); } }}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={16} className="text-red-500" />
                  </div>
                  <p className="font-prompt font-semibold text-gray-800 text-sm truncate">{pdfTitle}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <a
                    href={pdfUrl}
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#05086e] text-white text-xs font-prompt font-medium hover:bg-[#05086e]/90 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download size={12} />
                    ดาวน์โหลด
                  </a>
                  <button
                    onClick={() => { setPdfUrl(null); setPdfTitle(''); }}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors text-lg font-bold"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              </div>
              {/* PDF iframe */}
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=0`}
                className="flex-1 w-full"
                title={pdfTitle}
              />
            </div>
          </div>
        )}
      </main>

      {/* Banner Section at the Bottom */}
      <footer id="contact-section" className="w-full mt-auto py-6 md:py-8 z-30 bg-[#DA5F8E] px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 w-full">
          
          {/* Social Logos on the Left */}
          <div className="flex flex-col items-center md:items-start gap-2 pb-2 md:pb-6">
            <span className="text-white font-prompt font-medium text-sm">Official Social Media</span>
            <div className="flex items-center gap-4 text-white">
              <a href="https://www.facebook.com/profile.php?id=100077475367296" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={asset('facebook.svg')} alt="Facebook" className="w-12 h-12" />
              </a>
              <a href="https://www.instagram.com/smai__official/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={asset('instagram.svg')} alt="Instagram" className="w-12 h-12" />
              </a>
            </div>
          </div>

          {/* Logo, Address, & Map on the Right */}
          <div className="flex flex-col sm:flex-row justify-end items-center sm:items-stretch gap-4 sm:gap-6 w-full md:w-auto">
            {/* Logo & Address Group */}
            <div className="flex flex-col items-center sm:items-end justify-center gap-2">
              <img src={asset('Logo only.png')} alt="TUPR Logo" className="h-[60px] sm:h-[80px] md:h-[100px] w-auto" />
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

    </>
  );
}
