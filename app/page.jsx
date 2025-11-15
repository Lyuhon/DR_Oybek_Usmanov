'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Award, Clock, Users, CheckCircle, Phone, Mail, MapPin, Star, ArrowRight, Menu, X, ChevronLeft, ChevronDown } from 'lucide-react';
import ContactForm from './ContactForm';

// ============================================
// STATIK MA'LUMOTLAR (KOMPONENT TASHQARISIDA)
// ============================================

const heroSlides = [
  {
    title: "Ishonchingizni tiklang",
    subtitle: "FUE usuli bilan tabiiy natijalar",
    image: "/happy-beard-man.jpg"
  },
  {
    title: "Zamonaviy texnologiyalar",
    subtitle: "Og'riqsiz jarayon va tez tiklanish",
    image: "/pills-yellow-bg.jpg"
  },
  {
    title: "2000 dan ortiq muvaffaqiyatli operatsiya",
    subtitle: "Xalqaro tajriba va sertifikatsiya",
    image: "/man-with-beard.avif"
  }
];

const services = [
  {
    title: 'FUE usuli',
    description: 'Innovatsion choklarsiz soch ko\'chirish usuli - zamonaviy trixologiyaning oltin standarti. Minimal shikastlanish, tabiiy o\'sish burchagi, ko\'rinadigan izlarsiz tez tiklanish.',
    features: ['Ko\'rinadigan chandiqlar yo\'q', '3-5 kunlik tiklanish', 'Tabiiy natija', 'Bir seansda 6000 tagacha graft'],
    image: '/FUE-method.jpg'
  },
  {
    title: 'DHI usuli',
    description: 'Kanallar yaratmasdan to\'g\'ridan-to\'g\'ri soch implantatsiyasi. Maksimal zichlik va transplantlarni aniq joylashtiruvchi inqilobiy texnologiya.',
    features: ['Yuqori zichlik', 'Aniq implantatsiya', 'Minimal shikastlanish', 'Tez bitish'],
    image: '/DHI-method.jpg'
  },
  {
    title: 'Soqol transplantatsiyasi',
    description: 'Har qanday shaklda qalin, tabiiy soqol yaratish. Yuz chiziqlarini hisobga olgan holda individual dizayn, maksimal tabiiylik uchun tabiiy o\'sish burchagi.',
    features: ['Tabiiy qalinlik', 'Har qanday shakl', 'Individual dizayn', 'Umrbod natija'],
    image: 'https://img.freepik.com/free-photo/half-man-s-face-with-beard_171337-17203.jpg'
  },
  {
    title: 'PRP-terapiya',
    description: 'Sochni mustahkamlash uchun innovatsion plazmaterapiya. Tabiiy o\'sishni rag\'batlantiradi, soch sifati va tuzilmasini yaxshilaydi, jarrohlik aralashmasiz to\'kilishni to\'xtatadi.',
    features: ['Operatsiyasiz', 'Sochni mustahkamlash', 'O\'sishni rag\'batlantirish', 'To\'kilishni oldini olish'],
    image: 'https://img.freepik.com/free-photo/adult-male-doing-follicular-unit-extraction_23-2149106334.jpg'
  }
];

const stats = [
  { number: '8+', label: 'Yillik ish tajribasi', icon: Award },
  { number: '5000+', label: 'Soatlik amaliyot', icon: Clock },
  { number: '2000+', label: 'Muvaffaqiyatli operatsiyalar', icon: Users },
  { number: '98%', label: 'Mamnun bemorlar', icon: Star }
];

const certificates = [
  {
    year: '2018',
    title: 'Toshkent tibbiyot akademiyasi',
    specialty: 'Umumiy shifokorlik amaliyoti',
    image: '/photo_2025-11-14_02-48-28.jpg'
  },
  {
    year: '2021',
    title: 'Toshkent tibbiyot akademiyasi',
    specialty: 'Jarrohlik bo\'yicha magistrlik darajasi',
    image: '/photo_2025-11-14_02-48-25.jpg'
  },
  {
    year: '2022',
    title: 'Malaka oshirish markazi',
    specialty: 'Plastik jarrohlik',
    image: '/photo_2025-11-14_02-48-16.jpg'
  }
];

const testimonials = [
  {
    name: 'Farxod R.',
    date: 'Oktyabr 2025',
    text: 'Ajoyib natija! Doktor Usmanov haqiqiy professional. Protsedura qulay o\'tdi, natija barcha kutganimdan oshib ketdi. Sochlar mutlaqo tabiiy ko\'rinadi.',
    rating: 5
  },
  {
    name: 'Aziz M.',
    date: 'Sentyabr 2025',
    text: 'FUE usuli bilan ko\'chirishni qildim. Juda mamnunman! Hech qanday chandiq yo\'q, tez tiklanish. Doktor hamma narsani batafsil tushuntirdi, butun jarayon nazorat ostida edi. Tavsiya qilaman!',
    rating: 5
  },
  {
    name: 'Shaxzod K.',
    date: 'Avgust 2025',
    text: 'Uzoq vaqt klinika tanladim, doktor Usmanovda to\'xtadim - bir soniya ham afsuslanmadim. Zamonaviy jihozlar, yuqori professionallik, individual yondashuv. Natija ajoyib!',
    rating: 5
  }
];

const advantages = [
  {
    title: 'Xalqaro malaka',
    description: 'ISHRS va AAHRS a\'zosi, xalqaro standartlar bo\'yicha ko\'p yillik ish tajribasi',
    icon: Award
  },
  {
    title: 'Zamonaviy jihozlar',
    description: 'Eng yangi texnologiyalar va oxirgi avlod asboblaridan foydalanamiz',
    icon: CheckCircle
  },
  {
    title: 'Individual yondashuv',
    description: 'Har bir bemorning xususiyatlarini hisobga olgan holda shaxsiy davolash rejasi',
    icon: Users
  },
  {
    title: 'Sifat kafolati',
    description: 'Konsultatsiyadan to to\'liq tiklanishgacha to\'liq kuzatuv',
    icon: Star
  }
];

// Bayroqlar
const RuFlag = () => (
  <img src="/ru.svg" alt="Russia Flag" className="h-5 w-auto rounded-[3px]" />
);

// ============================================
// KOMPONENT
// ============================================

export default function HairTransplantLanding() {
  const [activeService, setActiveService] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [certificateModal, setCertificateModal] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen || certificateModal !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, certificateModal]);

  // Smooth scroll handler
  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  // Hero slider auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-white py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-md">
            <img src="/oybek-logo.png" alt="Dr. Usmanov" className="h-10 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="text-gray-700 hover:text-[#f3852e] transition-colors font-medium">Xizmatlar</a>
            <a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="text-gray-700 hover:text-[#f3852e] transition-colors font-medium">Doktor haqida</a>
            <a href="#education" onClick={(e) => smoothScroll(e, 'education')} className="text-gray-700 hover:text-[#f3852e] transition-colors font-medium">Ta'lim</a>
            <a href="#reviews" onClick={(e) => smoothScroll(e, 'reviews')} className="text-gray-700 hover:text-[#f3852e] transition-colors font-medium">Sharhlar</a>

            {/* Language Switcher */}
            <a
              href="/ru"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
              title="Русский тилига ўтиш"
            >
              <RuFlag />
              <span className="text-sm font-medium text-gray-700">RU</span>
            </a>

            <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="bg-gradient-to-r from-[#f3852e] to-[#c96641] hover:from-[#c96641] hover:to-[#f3852e] text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">
              Konsultatsiya
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-900 p-2 bg-white rounded-full shadow-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Offcanvas Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Offcanvas Panel */}
        <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <img src="/oybek-logo.png" alt="Dr. Usmanov" className="h-10 w-auto" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-2 px-4">

                <a href="#services"
                  onClick={(e) => smoothScroll(e, 'services')}
                  className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all"
                >
                  Xizmatlar
                </a>

                <a href="#about"
                  onClick={(e) => smoothScroll(e, 'about')}
                  className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all"
                >
                  Doktor haqida
                </a>

                <a href="#education"
                  onClick={(e) => smoothScroll(e, 'education')}
                  className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all"
                >
                  Ta'lim
                </a>

                <a href="#reviews"
                  onClick={(e) => smoothScroll(e, 'reviews')}
                  className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all"
                >
                  Sharhlar
                </a>

                {/* Language Switcher Mobile */}
                <a
                  href="/ru"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all"
                >
                  <RuFlag />
                  <span>Русский</span>
                </a>
              </div>
            </div>

            {/* CTA Button */}
            <div className="p-6">

              <a href="#contact"
                onClick={(e) => smoothScroll(e, 'contact')}
                className="block bg-gradient-to-r from-[#f3852e] to-[#c96641] text-white px-6 py-4 rounded-2xl text-center font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Ariza qoldirish
              </a>
            </div >
          </div >
        </div >
      </div >

      {/* Hero Section with Slider */}
      <section className="relative pt-20 overflow-hidden">
        {/* Slider Background */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/30 to-black/30"></div>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 py-12 md:py-32 min-h-[420px] md:min-h-[700px] flex items-center">
          <div className="max-w-3xl w-full">
            {/* Badge */}
            <div className="inline-block bg-gradient-to-r from-[#f3852e] to-[#c96641] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 relative z-20">
              ISHRS • AAHRS • Trixologlar uyushmasi a'zosi
            </div>

            {/* Content with Animation */}
            <div className="relative min-h-[200px] md:min-h-[320px] mb-8">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : index < currentSlide
                      ? 'opacity-0 -translate-x-12 pointer-events-none'
                      : 'opacity-0 translate-x-12 pointer-events-none'
                    }`}
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
                    {slide.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-20">
              <a
                href="#contact"
                onClick={(e) => smoothScroll(e, 'contact')}
                className="bg-gradient-to-r from-[#f3852e] to-[#c96641] hover:from-[#c96641] hover:to-[#f3852e] text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2"
              >
                <span>Konsultatsiyaga yozilish</span>
                <ArrowRight size={22} />
              </a>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center space-x-4 relative z-20">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="text-white" size={24} />
              </button>
              <div className="flex space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all ${index === currentSlide ? 'w-12 bg-white' : 'w-3 bg-white/50'} h-3 rounded-full`}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="text-white" size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Professionalga <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">ishoning</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ko'p yillik tajriba va minglab muvaffaqiyatli operatsiyalar - sizning sifatli natijangiz kafolati
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-[#f3852e]/10 to-[#c96641]/5 p-8 rounded-3xl hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="flex flex-col h-full justify-between">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-2xl flex items-center justify-center mb-6">
                    <stat.icon className="text-white" size={28} />
                  </div>
                  <div>
                    <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium text-base md:text-lg">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Bizning <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">xizmatlarimiz</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ilg'or xalqaro metodikalar qo'llanilgan holda sochni tiklashning to'liq spektri
            </p>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:grid md:grid-cols-4 gap-3 mb-12">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`relative cursor-pointer p-4 rounded-2xl transition-all transform hover:scale-105 ${activeService === index
                  ? 'bg-gradient-to-br from-[#f3852e] to-[#c96641] text-white shadow-xl'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
              >
                <div className="font-semibold text-center text-sm">{service.title}</div>
                {activeService === index && (
                  <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2">
                    <ChevronDown className="text-[#f3852e]" size={24} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Desktop Service Display */}
          <div className="hidden md:block bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-[600px] overflow-hidden">
                {services.map((service, index) => (
                  <img
                    key={index}
                    src={service.image}
                    alt={service.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === activeService ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="p-12 flex flex-col justify-center">
                <h3 className="text-4xl font-bold text-gray-900 mb-6">{services[activeService].title}</h3>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">{services[activeService].description}</p>
                <div className="space-y-4">
                  {services[activeService].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="text-[#f3852e] flex-shrink-0" size={24} />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="inline-flex items-center space-x-2 mt-8 bg-gradient-to-r from-[#f3852e] to-[#c96641] hover:from-[#c96641] hover:to-[#f3852e] text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 w-fit">
                  <span>Yozilish</span>
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Service Cards */}
          <div className="md:hidden space-y-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="relative h-64">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="text-[#f3852e] flex-shrink-0" size={20} />
                        <span className="text-gray-700 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#f3852e] to-[#c96641] hover:from-[#c96641] hover:to-[#f3852e] text-white px-6 py-3 rounded-full font-semibold transition-all w-full justify-center">
                    <span>Yozilish</span>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Doktor <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">Oybek Usmanov</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Xalqaro malakaga ega jarroh-trixolog
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Large Image Block */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="#"
                alt="Oybek Usmanov"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-bold text-white mb-3">Trixologiyada 8 yillik tajriba</h3>
                <p className="text-gray-200 text-lg">ISHRS va AAHRS xalqaro uyushmalari a'zosi</p>
              </div>
            </div>

            {/* Text Block */}
            <div className="bg-gradient-to-br from-[#f3852e]/10 to-[#c96641]/5 p-8 rounded-3xl">
              <div className="w-14 h-14 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-2xl flex items-center justify-center mb-6">
                <Award className="text-white" size={28} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Ta'lim</h4>
              <p className="text-gray-600 leading-relaxed">
                Toshkent tibbiyot akademiyasi bitiruvchisi. Shifokorlarni malakasini oshirish institutida dermatovenerologiya bo'yicha mutaxassislik.
              </p>
            </div>

            {/* Stats Block */}
            <div className="bg-gradient-to-br from-[#f3852e] to-[#c96641] p-8 rounded-3xl text-white">
              <div className="text-5xl font-bold mb-2">2000+</div>
              <div className="text-xl text-white/90 mb-4">Muvaffaqiyatli operatsiyalar</div>
              <p className="text-white/80">
                Har bir protsedura maksimal aniqlik va bemor haqida g'amxo'rlik bilan amalga oshiriladi
              </p>
            </div>
          </div>

          {/* Advantages Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <advantage.icon className="text-white" size={24} />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">{advantage.title}</h4>
                <p className="text-sm text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-gradient-to-r from-gray-50 to-white md:p-12 p-6 rounded-3xl">
            <div className="mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Doktor haqida</h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Doktor Oybek Usmanov — jarrohlik va rekonstruktiv-estetik tibbiyot sohasida mutaxassis bo'lib, sochni tiklash sohasida amaliyot olib boradi. Ta'limi umumiy shifokorlik amaliyoti bo'yicha bakalavr, jarrohlik bo'yicha magistrlik, shuningdek, Tibbiyot xodimlari professional malaka markazida olingan plastik jarrohlik bo'yicha ikkilamchi mutaxassislikni o'z ichiga oladi.
                </p>
                <p>
                  2021 yildan beri estetik tibbiyot bilan shug'ullanib, sochni tiklash usullariga alohida e'tibor beradi. Doimiy ravishda malakasini oshiradi va ko'nikmalarini kengaytiradi, yetakchi mutaxassislardan o'rganadi va professional tibbiy dasturlarda qatnashadi.
                </p>
                <p>
                  Amaliyotda FUE, DHI, shuningdek soqol va qoshlarni rekonstruksiya qilishni o'z ichiga olgan zamonaviy minimal invaziv soch ko'chirish metodikalarini qo'llaydi. Xavfsizlik, natijaning tabiiylik va har bir bemorga individual yondashuvga katta e'tibor beradi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Ta'lim va <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">sertifikatlar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uzluksiz professional rivojlanish va xalqaro tan olinish
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <button
                key={index}
                onClick={() => setCertificateModal(cert)}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 group cursor-pointer text-left w-full"
              >
                {/* Certificate Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-[#f3852e] to-[#c96641] text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      {cert.year}
                    </div>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{cert.title}</h4>
                  <p className="text-gray-600 flex items-center">
                    <CheckCircle className="text-[#f3852e] mr-2 flex-shrink-0" size={18} />
                    {cert.specialty}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Additional Credentials */}
          <div className="mt-12 bg-gradient-to-r from-[#f3852e] to-[#c96641] rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Professional yutuqlar</h3>
              <p className="text-white/90 text-lg max-w-3xl mx-auto">
                Ko'nikmalarni doimiy takomillashtirish va xalqaro konferensiyalarda qatnashish
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-white/90">Xalqaro konferensiyalar</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">3</div>
                <div className="text-white/90">Uyushmalarda a'zolik</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-white/90">Har yili o'quv soatlari</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {certificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setCertificateModal(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X size={24} className="text-gray-900" />
            </button>
            <div className="p-6">
              <img
                src={certificateModal.image}
                alt={certificateModal.title}
                className="w-full h-auto rounded-2xl"
              />
              <div className="mt-6">
                <div className="inline-block bg-gradient-to-r from-[#f3852e] to-[#c96641] text-white px-4 py-2 rounded-full font-bold mb-3">
                  {certificateModal.year}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{certificateModal.title}</h3>
                <p className="text-gray-600 flex items-center">
                  <CheckCircle className="text-[#f3852e] mr-2" size={20} />
                  {certificateModal.specialty}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Bemorlar <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">sharhlari</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              2000 dan ortiq mamnun bemorlar sog'liklarini doktor Usmanovga ishonib topshiradilar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-[#f3852e] fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between border-t pt-6">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.date}</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{testimonial.name[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#f3852e] via-[#c96641] to-[#b85532] rounded-3xl p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Yangi hayotni boshlashga tayyormisiz?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
                Bepul konsultatsiyaga yozilib, aynan sizga qaysi sochni tiklash usuli mos kelishini bilib oling
              </p>
              <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="inline-flex items-center space-x-3 bg-white text-[#f3852e] px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl">
                <span>Konsultatsiyaga yozilish</span>
                <ArrowRight size={26} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Biz bilan <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">bog'laning</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Bepul konsultatsiyaga yozilib, professional tavsiyalar oling
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1 text-lg">Telefon</div>
                    <div className="text-gray-600 text-lg">+998 97 421 11 12</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1 text-lg">Email</div>
                    <div className="text-gray-600 text-lg">info@oybekusmanov.uz</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1 text-lg">Manzil</div>
                    <div className="text-gray-600 text-lg">Toshkent sh., Yunusobod tumani, Adolat mahallasi fuqarolar yig'ini, 4-kvartal, 4A</div>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="bg-white px-4 py-2 rounded-full inline-block mb-4">
                <img src="/oybek-logo.png" alt="Dr. Usmanov" className="h-10 w-auto" />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Zamonaviy xalqaro FUE va DHI metodikalar qo'llangan holda professional soch ko'chirish
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-4">Navigatsiya</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="hover:text-[#f3852e] transition-colors">Xizmatlar</a></li>
                <li><a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="hover:text-[#f3852e] transition-colors">Doktor haqida</a></li>
                <li><a href="#education" onClick={(e) => smoothScroll(e, 'education')} className="hover:text-[#f3852e] transition-colors">Ta'lim</a></li>
                <li><a href="#reviews" onClick={(e) => smoothScroll(e, 'reviews')} className="hover:text-[#f3852e] transition-colors">Sharhlar</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-4">Aloqa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+998 97 421 11 12</li>
                <li>info@oybekusmanov.uz</li>
                <li>Toshkent sh., Yunusobod tumani, Adolat mahallasi fuqarolar yig'ini, 4-kvartal, 4A</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2025 Doktor Oybek Usmanov. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}