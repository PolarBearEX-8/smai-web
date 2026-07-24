/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wind, Anchor, Facebook, Phone, Mail, Instagram, ChevronLeft, ChevronRight, FileText, Download, Users, ChevronDown, BookOpen, ExternalLink, Menu, X } from 'lucide-react';
import { ScrollReveal } from './components/ScrollReveal';
import { Yearbook } from './components/Yearbook';
import { ThemeToggle, useTheme } from './components/ThemeToggle';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileArchiveOpen, setMobileArchiveOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isNavClickRef = React.useRef(false);
  const activeSectionRef = React.useRef('home');
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const setActiveSectionSafe = (section: string) => {
    activeSectionRef.current = section;
    setActiveSection(section);
  };

  const closePdfViewer = () => {
    setPdfUrl(null);
    setPdfTitle('');
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
    if (!pdfUrl) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePdfViewer();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pdfUrl]);

  // Lock background scroll while the mobile drawer or the PDF viewer is open
  useEffect(() => {
    const shouldLock = mobileMenuOpen || !!pdfUrl;
    if (!shouldLock) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [mobileMenuOpen, pdfUrl]);

  // Close the mobile drawer if the viewport grows to desktop width
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setMobileMenuOpen(false);
        setMobileArchiveOpen(false);
      } else {
        setDesktopDropdownOpen(false);
      }
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  // Desktop dropdown: close on outside tap (needed on touch devices, where hover never ends)
  useEffect(() => {
    if (!desktopDropdownOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDesktopDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDesktopDropdownOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [desktopDropdownOpen]);

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
    closePdfViewer();
    setMobileMenuOpen(false);
    setMobileArchiveOpen(false);
    setDesktopDropdownOpen(false);

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
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0b1020] dark:text-gray-100 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900 dark:selection:bg-teal-900 dark:selection:text-teal-100">
      {/* Sticky Header Group */}
      <div className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
        {/* Top Blue Bar */}
        <div className="w-full bg-[#05086e] dark:bg-[#080b2e] text-white py-1.5 sm:py-2 px-4 sm:px-8 flex items-center text-[11px] sm:text-sm z-20 font-prompt">
          <div className="flex items-center gap-2 font-medium text-left min-w-0">
            <Mail size={14} className="flex-shrink-0" />
            <span className="truncate">
              <span className="sm:hidden">ห้องเรียนพิเศษ ต.อ.พ. รัชดา</span>
              <span className="hidden sm:inline">ติดต่อเพจ: โครงการห้องเรียนพิเศษ โรงเรียนเตรียมอุดมศึกษาพัฒนาการ รัชดา</span>
            </span>
          </div>
        </div>
        
        {/* Navigation */}
        <header className="px-4 sm:px-8 lg:px-40 py-3 flex justify-between items-center bg-white dark:bg-[#111731] z-20 border-b border-gray-100 dark:border-white/10">
          <div className="flex items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home-section', 'home'); }} className="flex items-center cursor-pointer">
              <img src={asset('S-MAI-logo.png')} alt="S-MAI Logo" className="h-[35px] sm:h-[45px] md:h-[65px] w-auto block dark:hidden" />
              <img src={asset('S-MAI-logo-dark.png')} alt="S-MAI Logo" className="h-[35px] sm:h-[45px] md:h-[65px] w-auto hidden dark:block" />
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-base font-prompt text-gray-600 dark:text-gray-300">
            <button
              onClick={() => handleNavClick('home-section', 'home')}
              className={`hover:text-gray-900 dark:hover:text-white transition-colors duration-300 cursor-pointer ${activeSection === 'home' ? 'text-gray-900 dark:text-white font-semibold' : ''}`}
            >
              หน้าแรก
            </button>
            <button
              onClick={() => handleNavClick('contact-section', 'contact')}
              className={`hover:text-gray-900 dark:hover:text-white transition-colors duration-300 cursor-pointer ${activeSection === 'contact' ? 'text-gray-900 dark:text-white font-semibold' : ''}`}
            >
              ช่องทางการติดต่อ
            </button>
            
            {/* Dropdown Menu for คลังข้อมูล */}
            <div
              ref={dropdownRef}
              className="relative group/dropdown py-2"
              onMouseEnter={() => setDesktopDropdownOpen(true)}
              onMouseLeave={() => setDesktopDropdownOpen(false)}
            >
              <button
                onClick={() => setDesktopDropdownOpen((open) => !open)}
                aria-expanded={desktopDropdownOpen}
                aria-haspopup="true"
                className={`hover:text-gray-900 dark:hover:text-white transition-colors duration-300 cursor-pointer flex items-center gap-1 ${activeSection === 'archive' || activeSection === 'documents' || activeSection === 'yearbook' ? 'text-gray-900 dark:text-white font-semibold' : ''}`}
              >
                <span>คลังข้อมูล</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${desktopDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Content */}
              <div className={`absolute left-1/2 -translate-x-1/2 top-full w-48 rounded-xl bg-white dark:bg-[#161d3b] shadow-lg border border-gray-100 dark:border-white/10 py-2 transition-all duration-300 z-50 ${desktopDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <button
                  onClick={() => handleNavClick('about-section', 'about')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 hover:text-[#05086e] dark:hover:bg-white/5 dark:hover:text-white font-prompt transition-colors cursor-pointer flex items-center gap-2"
                >
                  <BookOpen size={14} />
                  เกี่ยวกับโครงการ
                </button>
                <button
                  onClick={() => handleNavClick('documents-section', 'documents')}
                  className={`w-full text-left px-4 py-2 text-sm font-prompt transition-colors cursor-pointer flex items-center gap-2 ${ activeSection === 'documents' ? 'text-[#05086e] bg-blue-50 dark:text-[#93a5ff] dark:bg-white/10 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 hover:text-[#05086e] dark:hover:bg-white/5 dark:hover:text-white'}`}
                >
                  <FileText size={14} />
                  คลังเอกสาร
                </button>
                <button
                  onClick={() => handleNavClick('archive-section', 'archive')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 hover:text-[#05086e] dark:hover:bg-white/5 dark:hover:text-white font-prompt transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Download size={14} />
                  ดาวน์โหลดเอกสาร
                </button>
                <button
                  onClick={() => handleNavClick('yearbook-section', 'yearbook')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 hover:text-[#05086e] dark:hover:bg-white/5 dark:hover:text-white font-prompt transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Users size={14} />
                  ทำเนียบรุ่น
                </button>
              </div>
            </div>

            <ThemeToggle theme={theme} onToggle={toggleTheme} className="-ml-2 mr-2" />

            <button
              onClick={() => handleNavClick('about-section', 'about')}
              className={`bg-[#DA5F8E] text-white px-5 py-2 rounded-full hover:bg-[#DA5F8E]/90 transition-colors duration-300 shadow-sm cursor-pointer ${activeSection === 'about' ? 'ring-2 ring-pink-300 ring-offset-2 dark:ring-offset-[#111731]' : ''}`}
            >
              รายละเอียดการสมัคร
            </button>
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden -mr-1 flex items-center gap-0.5">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
              aria-expanded={mobileMenuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-[#05086e] dark:text-gray-100 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-white/10 dark:active:bg-white/20"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        <div
          className={`md:hidden absolute top-full left-0 w-full origin-top overflow-hidden bg-white dark:bg-[#111731] shadow-lg transition-[max-height,opacity,visibility] duration-300 ease-out ${
            mobileMenuOpen ? 'max-h-[80vh] opacity-100 visible border-b border-gray-100 dark:border-white/10' : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <nav className="flex max-h-[80vh] flex-col overflow-y-auto overscroll-contain px-4 py-3 font-prompt text-gray-700 dark:text-gray-300">
            <button
              onClick={() => handleNavClick('home-section', 'home')}
              className={`w-full rounded-xl px-4 py-3.5 text-left text-base transition-colors ${activeSection === 'home' ? 'bg-blue-50 font-semibold text-[#05086e] dark:bg-white/10 dark:text-[#93a5ff]' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
            >
              หน้าแรก
            </button>
            <button
              onClick={() => handleNavClick('contact-section', 'contact')}
              className={`w-full rounded-xl px-4 py-3.5 text-left text-base transition-colors ${activeSection === 'contact' ? 'bg-blue-50 font-semibold text-[#05086e] dark:bg-white/10 dark:text-[#93a5ff]' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
            >
              ช่องทางการติดต่อ
            </button>

            {/* Collapsible: คลังข้อมูล */}
            <button
              onClick={() => setMobileArchiveOpen((open) => !open)}
              aria-expanded={mobileArchiveOpen}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base transition-colors ${
                activeSection === 'archive' || activeSection === 'documents' || activeSection === 'yearbook'
                  ? 'bg-blue-50 font-semibold text-[#05086e] dark:bg-white/10 dark:text-[#93a5ff]'
                  : 'hover:bg-gray-50 dark:hover:bg-white/5'
              }`}
            >
              <span>คลังข้อมูล</span>
              <ChevronDown size={18} className={`transition-transform duration-300 ${mobileArchiveOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-[max-height] duration-300 ease-out ${mobileArchiveOpen ? 'max-h-72' : 'max-h-0'}`}>
              <div className="ml-3 flex flex-col border-l-2 border-gray-100 dark:border-white/10 pl-2">
                <button
                  onClick={() => handleNavClick('about-section', 'about')}
                  className="flex w-full items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-50 hover:text-[#05086e] dark:hover:bg-white/5 dark:hover:text-white"
                >
                  <BookOpen size={16} className="flex-shrink-0" />
                  เกี่ยวกับโครงการ
                </button>
                <button
                  onClick={() => handleNavClick('documents-section', 'documents')}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                    activeSection === 'documents' ? 'font-semibold text-[#05086e] dark:text-[#93a5ff]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:text-[#05086e] dark:hover:bg-white/5 dark:hover:text-white'
                  }`}
                >
                  <FileText size={16} className="flex-shrink-0" />
                  คลังเอกสาร
                </button>
                <button
                  onClick={() => handleNavClick('archive-section', 'archive')}
                  className="flex w-full items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-50 hover:text-[#05086e] dark:hover:bg-white/5 dark:hover:text-white"
                >
                  <Download size={16} className="flex-shrink-0" />
                  ดาวน์โหลดเอกสาร
                </button>
                <button
                  onClick={() => handleNavClick('yearbook-section', 'yearbook')}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                    activeSection === 'yearbook' ? 'font-semibold text-[#05086e] dark:text-[#93a5ff]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:text-[#05086e] dark:hover:bg-white/5 dark:hover:text-white'
                  }`}
                >
                  <Users size={16} className="flex-shrink-0" />
                  ทำเนียบรุ่น
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('about-section', 'about')}
              className="mt-2 mb-1 w-full rounded-full bg-[#DA5F8E] px-5 py-3.5 text-center text-base text-white shadow-sm transition-colors hover:bg-[#DA5F8E]/90"
            >
              รายละเอียดการสมัคร
            </button>
          </nav>
        </div>
      </div>

      {/* Backdrop behind the mobile drawer */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-40 bg-black/30 dark:bg-black/60 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

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
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center bg-white/50 hover:bg-white/80 active:bg-white/90 rounded-full transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} className="text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center bg-white/50 hover:bg-white/80 active:bg-white/90 rounded-full transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={22} className="text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="flex h-8 w-8 items-center justify-center"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className={`block w-2.5 h-2.5 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* News Section */}
        <section className="py-10 sm:py-12 px-5 sm:px-12 md:px-24 lg:px-40 bg-white dark:bg-[#0b1020]">
          <div className="max-w-6xl mx-auto">
            <Reveal variant="fade-up" duration={700}>
              <div className="text-center mb-7 sm:mb-10 space-y-2 flex flex-col items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#05086e] dark:text-[#93a5ff] font-prompt">กิจกรรมของเรา</h2>
                <div className="w-16 h-1 bg-[#DA5F8E]"></div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3].map((item, index) => (
                <Reveal
                  key={item}
                  variant="fade-up"
                  delay={index * 150}
                  duration={800}
                >
                  <div className="bg-gray-50/60 dark:bg-white/5 rounded-xl overflow-hidden border border-dashed border-gray-200 dark:border-white/10 h-full flex items-center justify-center min-h-[120px] sm:min-h-[280px]">
                    <p className="text-gray-300 dark:text-gray-600 font-prompt text-base sm:text-lg">Page Not Found</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-10 sm:py-12 px-5 sm:px-12 md:px-24 lg:px-40 bg-gray-50 dark:bg-[#0f1530]">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fade-up" duration={700}>
              <div className="text-center mb-7 sm:mb-10 space-y-2 flex flex-col items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#05086e] dark:text-[#93a5ff] font-prompt">ข่าวสารล่าสุด</h2>
                <div className="w-16 h-1 bg-[#DA5F8E]"></div>
              </div>
            </ScrollReveal>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                      <img src={item.img} alt="Activity" className="w-full h-44 sm:h-56 lg:h-64 object-cover object-top group-hover:scale-110 transition-transform duration-500" />

                      {/* Touch devices never hover, so the link affordance stays visible below sm */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-1.5 sm:p-2 bg-white/20 backdrop-blur-md rounded-full text-white shadow-sm transition-all duration-300 opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0">
                        <ExternalLink size={16} className="sm:hidden" />
                        <ExternalLink size={20} className="hidden sm:block" />
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
          </div>
        </section>





        {/* About Section */}
        <section id="about-section" className="py-10 sm:py-12 px-5 sm:px-12 md:px-24 lg:px-40 bg-white dark:bg-[#0b1020] border-t border-gray-100 dark:border-white/10 overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="w-full md:w-1/2">
              <ScrollReveal variant="fade-right" duration={800}>
                <img src={asset('smaisdad.png')} alt="กิจกรรมโครงการ S-MAI" className="rounded-xl shadow-lg object-cover h-[220px] sm:h-[300px] w-full" />
              </ScrollReveal>
            </div>
            <div className="w-full md:w-1/2">
              <ScrollReveal variant="fade-left" duration={800} delay={100}>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#05086e] dark:text-[#93a5ff] font-prompt">เกี่ยวกับโครงการ</h2>
                  <div className="w-16 h-1 bg-[#DA5F8E]"></div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-prompt text-sm sm:text-base">
                    โครงการห้องเรียนพิเศษ โรงเรียนเตรียมอุดมศึกษาพัฒนาการ รัชดา มุ่งมั่นพัฒนาศักยภาพของนักเรียนในทุกๆ ด้าน ทั้งวิชาการ ทักษะชีวิต และเทคโนโลยี เพื่อเตรียมความพร้อมสู่การเป็นผู้นำในอนาคต
                  </p>
                  <button className="px-6 py-2 bg-[#05086e] dark:bg-[#3b46a8] text-white rounded-md font-prompt text-sm hover:bg-[#05086e]/90 dark:hover:bg-[#4753c4] transition-colors">
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
          <Yearbook activeModel={activeModel} setActiveModel={setActiveModel} />
        </div>

        {/* Documents Page - คลังเอกสาร */}
        <div className={activeSection === 'documents' ? 'block flex-grow flex flex-col' : 'hidden'}>
          <section id="documents-section" className="flex-grow min-h-screen bg-gray-50 dark:bg-[#0b1020]">
            <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 py-10 sm:py-12">

              {/* Header + Breadcrumb */}
              <div className="mb-8">
                <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#151c3a]/90 px-3 sm:px-4 py-2 shadow-sm text-xs sm:text-sm font-prompt mb-3 sm:inline-flex sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenFolder(null)}
                    className={`whitespace-nowrap rounded-lg border border-transparent px-2.5 sm:px-3 py-1.5 transition-all duration-200 ${
                      openFolder
                        ? 'text-[#05086e] dark:text-[#93a5ff] hover:border-gray-300 hover:bg-gray-100/60 hover:text-gray-900 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white cursor-pointer'
                        : 'text-gray-700 dark:text-gray-200 cursor-default'
                    }`}
                  >
                    คลังเอกสาร
                  </button>
                  {openFolder && (
                    <>
                      <span className="text-gray-300 dark:text-gray-600">/</span>
                      <button
                        type="button"
                        onClick={() => setOpenFolder(openFolder)}
                        className="whitespace-nowrap rounded-lg border border-transparent px-2.5 sm:px-3 py-1.5 text-gray-700 dark:text-gray-200 font-medium transition-all duration-200 hover:border-gray-300 hover:bg-gray-100/60 hover:text-gray-900 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white cursor-pointer"
                      >
                        {openFolder}
                      </button>
                    </>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#05086e] dark:text-[#93a5ff] font-prompt">
                  {openFolder ?? 'คลังเอกสาร'}
                </h1>
                <div className="w-16 h-1 bg-[#DA5F8E] mt-2 mb-3"></div>
                <p className="text-gray-500 dark:text-gray-400 font-prompt text-sm">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 justify-items-stretch sm:justify-items-center">
                    {FOLDERS.map((folder) => (
                      <button
                        key={folder.id}
                        type="button"
                        onClick={() => setOpenFolder(folder.id)}
                        className="group flex w-full sm:w-auto flex-row sm:flex-col items-center justify-start sm:justify-center gap-3.5 sm:gap-2 rounded-2xl sm:rounded-3xl border border-gray-100 sm:border-transparent dark:border-white/10 dark:sm:border-transparent bg-white dark:bg-[#151c3a] sm:bg-transparent dark:sm:bg-transparent px-4 py-3.5 sm:px-8 sm:py-6 cursor-pointer text-left sm:text-center transition-all duration-200 hover:border-gray-300 hover:bg-gray-100/60 dark:hover:border-white/20 dark:hover:bg-white/10 hover:shadow-sm sm:hover:scale-[1.03]"
                        aria-label={folder.label}
                        title={folder.label}
                      >
                        <svg className={`w-11 h-11 sm:w-32 sm:h-32 md:w-36 md:h-36 flex-shrink-0 ${folder.iconColor} transition-transform duration-200 drop-shadow-sm group-hover:translate-y-[-2px]`} viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 14a4 4 0 0 1 4-4h16l4 6h28a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V14z" opacity="0.35"/>
                          <path d="M4 20h56v26a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V20z"/>
                        </svg>
                        <span className="flex min-w-0 flex-1 sm:flex-none flex-col gap-0.5 sm:gap-2 sm:items-center">
                          <span className="font-prompt font-semibold text-gray-700 dark:text-gray-100 text-sm sm:text-base leading-snug">
                            {folder.label}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-prompt">
                            {folder.count} ไฟล์
                          </span>
                        </span>
                        <ChevronRight size={20} className="sm:hidden flex-shrink-0 text-gray-300 dark:text-gray-600" />
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
                        className="group bg-white dark:bg-[#151c3a] border border-gray-100 dark:border-white/10 rounded-2xl px-4 sm:px-6 py-4 flex items-center gap-3 sm:gap-5 hover:shadow-md hover:border-[#05086e]/20 dark:hover:border-[#93a5ff]/30 transition-all duration-200 cursor-pointer"
                        onClick={() => { setPdfUrl(file.url); setPdfTitle(file.name); }}
                      >
                        {/* PDF Icon */}
                        <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/25 rounded-xl flex items-center justify-center">
                          <svg className="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                            <path fill="white" d="M14 2v6h6"/>
                            <text x="5" y="19" fontSize="5" fontFamily="Arial" fontWeight="bold" fill="white">PDF</text>
                          </svg>
                        </div>
                        {/* Name & meta */}
                        <div className="flex-1 min-w-0">
                          <p className="font-prompt font-semibold text-gray-800 dark:text-gray-100 text-[13px] sm:text-sm leading-snug line-clamp-2 sm:truncate group-hover:text-[#05086e] dark:group-hover:text-[#93a5ff] transition-colors">{file.name}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 font-prompt mt-0.5">{file.size} &bull; ปี {file.date}</p>
                        </div>
                        {/* Open button */}
                        <div className="flex-shrink-0 flex items-center gap-2">
                          <span className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#05086e] dark:bg-[#3b46a8] text-white text-xs font-prompt font-medium group-hover:bg-[#05086e]/90 dark:group-hover:bg-[#4753c4] transition-colors">
                            <FileText size={12} />
                            ดูเอกสาร
                          </span>
                          <ChevronRight size={20} className="sm:hidden text-gray-300 dark:text-gray-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

            </div>
          </section>
        </div>

      </main>

      {/* Banner Section at the Bottom */}
      <footer id="contact-section" className="w-full mt-auto py-8 md:py-8 z-30 bg-[#DA5F8E] px-5 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-7 md:gap-6 w-full">

          {/* Social Logos on the Left */}
          <div className="order-3 md:order-1 flex flex-col items-center md:items-start gap-2.5 md:pb-6">
            <span className="text-white font-prompt font-medium text-xs sm:text-sm tracking-wide">Official Social Media</span>
            <div className="flex items-center gap-5 md:gap-4 text-white">
              <a href="https://www.facebook.com/profile.php?id=100077475367296" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80 active:opacity-70">
                <img src={asset('facebook.svg')} alt="Facebook" className="w-11 h-11 md:w-12 md:h-12" />
              </a>
              <a href="https://www.instagram.com/smai__official/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80 active:opacity-70">
                <img src={asset('instagram.svg')} alt="Instagram" className="w-11 h-11 md:w-12 md:h-12" />
              </a>
            </div>
          </div>

          {/* Logo, Address, & Map on the Right */}
          <div className="order-1 md:order-2 flex flex-col sm:flex-row justify-end items-center sm:items-stretch gap-6 sm:gap-6 w-full md:w-auto">
            {/* Logo & Address Group */}
            <div className="flex flex-col items-center sm:items-end justify-center gap-2 sm:gap-0.5">
              <img src={asset('Logo only.png')} alt="TUPR Logo" className="h-[72px] sm:h-[80px] md:h-[100px] w-auto sm:mb-1.5" />
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-end gap-y-1.5 gap-x-4 text-white text-xs md:text-sm font-prompt leading-tight">
                <a href="tel:026452702" className="inline-flex items-center gap-1.5 transition-opacity active:opacity-70">
                  <Phone className="h-3.5 w-3.5 text-yellow-300 flex-shrink-0" aria-hidden="true" />
                  02 645 2702
                </a>
                <a href="mailto:contact@tupr.ac.th" className="inline-flex items-center gap-1.5 transition-opacity active:opacity-70">
                  <Mail className="h-3.5 w-3.5 text-yellow-300 flex-shrink-0" aria-hidden="true" />
                  contact@tupr.ac.th
                </a>
              </div>
              <p className="text-white/90 text-[11px] sm:text-xs md:text-sm font-prompt text-center sm:text-right max-w-[260px] md:max-w-[260px] leading-relaxed sm:leading-tight">
                170 ถ. รัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310
              </p>
            </div>

            {/* Map Group */}
            <div className="w-full sm:w-auto flex-1 max-w-[300px] sm:max-w-[280px] md:max-w-[320px] min-h-[170px] sm:min-h-[120px] rounded-xl sm:rounded-md overflow-hidden shadow-sm flex flex-col">
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

          {/* Divider between the address block and the social block (mobile only) */}
          <div className="order-2 md:hidden w-24 h-px bg-white/25" aria-hidden="true" />
        </div>
      </footer>

      {/* Bottom Blue Bar */}
      <div className="w-full bg-[#05086e] dark:bg-[#080b2e] text-white py-3 px-4 sm:px-8 text-[11px] sm:text-sm z-30 font-prompt relative flex flex-col items-center gap-1 text-center md:flex-row md:gap-0 md:text-left">
        <p className="font-medium md:absolute md:left-1/2 md:-translate-x-1/2 md:text-center">
          &copy; Copyright 2026 โรงเรียนเตรียมอุดมศึกษาพัฒนาการ รัชดา
        </p>
        <p className="font-medium whitespace-nowrap md:ml-auto">
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

      {/* PDF Viewer Modal — kept outside <main>, which carries a transform and
          would otherwise become the containing block for position:fixed */}
      {pdfUrl && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closePdfViewer(); }}
        >
          <div className="relative bg-white dark:bg-[#111731] rounded-none sm:rounded-2xl shadow-2xl w-full max-w-5xl h-[100dvh] sm:h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 dark:border-white/10 flex-shrink-0 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-4">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-9 h-9 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/25 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={16} className="text-red-500" />
                </div>
                <p className="font-prompt font-semibold text-gray-800 dark:text-gray-100 text-xs sm:text-sm truncate">{pdfTitle}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={pdfUrl}
                  download
                  className="flex h-9 items-center gap-1.5 rounded-lg bg-[#05086e] dark:bg-[#3b46a8] px-2.5 sm:px-3 text-xs font-prompt font-medium text-white transition-colors hover:bg-[#05086e]/90 dark:hover:bg-[#4753c4]"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="ดาวน์โหลด"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">ดาวน์โหลด</span>
                </a>
                <button
                  onClick={closePdfViewer}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-white/10 dark:hover:bg-white/20 dark:text-gray-200 transition-colors"
                  aria-label="ปิด"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            {/* PDF iframe */}
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=0`}
              className="flex-1 w-full min-h-0"
              title={pdfTitle}
            />
            {/* Mobile fallback: in-page PDF embedding is unreliable on iOS/Android browsers */}
            <div className="sm:hidden flex-shrink-0 border-t border-gray-100 dark:border-white/10 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-white/10 py-3 font-prompt text-sm font-medium text-[#05086e] dark:text-[#93a5ff] transition-colors active:bg-gray-200 dark:active:bg-white/20"
              >
                <ExternalLink size={15} />
                เปิดเอกสารในแท็บใหม่
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
