'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Award, Clock, Users, CheckCircle, Phone, Mail, MapPin, Star, ArrowRight, Menu, X, ChevronLeft, ChevronDown } from 'lucide-react';
import ContactForm from './ContactForm';

// ============================================
// СТАТИЧНЫЕ ДАННЫЕ (ВНЕ КОМПОНЕНТА)
// ============================================

const heroSlides = [
  {
    title: "Восстановите свою уверенность",
    subtitle: "Естественные результаты с методом FUE",
    image: "/happy-beard-man.jpg"
  },
  {
    title: "Современные технологии",
    subtitle: "Безболезненная процедура с быстрым восстановлением",
    image: "/pills-yellow-bg.jpg"
  },
  {
    title: "Более 2000 успешных операций",
    subtitle: "Международный опыт и сертификация",
    image: "/man-with-beard.avif"
  }
];

const services = [
  {
    title: 'Метод FUE',
    description: 'Инновационный бесшовный метод пересадки волос - золотой стандарт современной трихологии. Минимальная травматизация, естественный угол роста волос, быстрое восстановление без видимых следов.',
    features: ['Без видимых шрамов', 'Восстановление 3-5 дней', 'Естественный результат', 'До 6000 графтов за сеанс'],
    image: '/FUE-method.jpg'
  },
  {
    title: 'DHI метод',
    description: 'Прямая имплантация волос без предварительного создания каналов. Революционная технология, обеспечивающая максимальную плотность и точность размещения трансплантатов.',
    features: ['Высокая плотность', 'Точная имплантация', 'Минимальная травма', 'Быстрое заживление'],
    image: '/DHI-method.jpg'
  },
  {
    title: 'Трансплантация бороды',
    description: 'Создание густой, естественной бороды любой формы. Индивидуальный дизайн с учетом черт лица, естественный угол роста волос для максимальной натуральности.',
    features: ['Естественная густота', 'Любая форма', 'Индивидуальный дизайн', 'Пожизненный результат'],
    image: 'https://img.freepik.com/free-photo/half-man-s-face-with-beard_171337-17203.jpg'
  },
  {
    title: 'PRP-терапия',
    description: 'Инновационная плазмотерапия для укрепления волос. Стимулирует естественный рост, улучшает качество и структуру волос, останавливает выпадение без хирургического вмешательства.',
    features: ['Безоперационно', 'Укрепление волос', 'Стимуляция роста', 'Профилактика выпадения'],
    image: 'https://img.freepik.com/free-photo/adult-male-doing-follicular-unit-extraction_23-2149106334.jpg'
  }
];

const stats = [
  { number: '8+', label: 'Лет опыта работы', icon: Award },
  { number: '5000+', label: 'Часов практики', icon: Clock },
  { number: '2000+', label: 'Успешных операций', icon: Users },
  { number: '98%', label: 'Довольных пациентов', icon: Star }
];

const certificates = [
  {
    year: '2018',
    title: 'Ташкентская медицинская академия',
    specialty: 'Общая врачебная практика',
    image: '/photo_2025-11-14_02-48-28.jpg'
  },
  {
    year: '2021',
    title: 'Ташкентская медицинская академия',
    specialty: 'Степень магистра по хирургии',
    image: '/photo_2025-11-14_02-48-25.jpg'
  },
  {
    year: '2022',
    title: 'Центр повышения квалификации',
    specialty: 'Пластическая хирургия',
    image: '/photo_2025-11-14_02-48-16.jpg'
  }
];

const testimonials = [
  {
    name: 'Фарход Р.',
    date: 'Октябрь 2025',
    text: 'Невероятный результат! Доктор Усманов настоящий профессионал. Процедура прошла комфортно, результат превзошел все ожидания. Волосы выглядят абсолютно естественно.',
    rating: 5
  },
  {
    name: 'Азиз М.',
    date: 'Сентябрь 2025',
    text: 'Сделал пересадку методом FUE. Очень доволен! Никаких шрамов, быстрое восстановление. Доктор все подробно объяснил, весь процесс был под контролем. Рекомендую!',
    rating: 5
  },
  {
    name: 'Шахзод К.',
    date: 'Август 2025',
    text: 'Долго выбирал клинику, остановился на докторе Усманове - не пожалел ни секунды. Современное оборудование, высокий профессионализм, индивидуальный подход. Результат потрясающий!',
    rating: 5
  }
];

const advantages = [
  {
    title: 'Международная квалификация',
    description: 'Член ISHRS и AAHRS с многолетним опытом работы по международным стандартам',
    icon: Award
  },
  {
    title: 'Современное оборудование',
    description: 'Используем новейшие технологии и инструменты последнего поколения',
    icon: CheckCircle
  },
  {
    title: 'Индивидуальный подход',
    description: 'Персональный план лечения с учетом особенностей каждого пациента',
    icon: Users
  },
  {
    title: 'Гарантия качества',
    description: 'Полное сопровождение от консультации до полного восстановления',
    icon: Star
  }
];

const serviceOptions = ['Метод FUE', 'DHI метод', 'Трансплантация бороды', 'Пересадка бровей', 'PRP-терапия'];

// Флаги
const UzbFlag = () => (
  <img src="/uz.svg" alt="Uzbekistan Flag" className="h-5 w-auto rounded-[3px]" />
);

// ============================================
// КОМПОНЕНТ
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
            <a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="text-gray-700 hover:text-[#f3852e] transition-colors font-medium">Услуги</a>
            <a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="text-gray-700 hover:text-[#f3852e] transition-colors font-medium">О докторе</a>
            <a href="#education" onClick={(e) => smoothScroll(e, 'education')} className="text-gray-700 hover:text-[#f3852e] transition-colors font-medium">Образование</a>
            <a href="#reviews" onClick={(e) => smoothScroll(e, 'reviews')} className="text-gray-700 hover:text-[#f3852e] transition-colors font-medium">Отзывы</a>

            {/* Language Switcher */}
            <a
              href="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
              title="Переключить на русский"
            >
              <UzbFlag />
              <span className="text-sm font-medium text-gray-700">UZB</span>
            </a>

            <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="bg-gradient-to-r from-[#f3852e] to-[#c96641] hover:from-[#c96641] hover:to-[#f3852e] text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">
              Консультация
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
                  Услуги
                </a>

                <a href="#about"
                  onClick={(e) => smoothScroll(e, 'about')}
                  className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all"
                >
                  О докторе
                </a>

                <a href="#education"
                  onClick={(e) => smoothScroll(e, 'education')}
                  className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all"
                >
                  Образование
                </a>

                <a href="#reviews"
                  onClick={(e) => smoothScroll(e, 'reviews')}
                  className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all"
                >
                  Отзывы
                </a>

                {/* Language Switcher Mobile */}
                <a
                  href="/"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all"
                >
                  <UzbFlag />
                  <span>Uzbek</span>
                </a>
              </div>
            </div>

            {/* CTA Button */}
            <div className="p-6">

              <a href="#contact"
                onClick={(e) => smoothScroll(e, 'contact')}
                className="block bg-gradient-to-r from-[#f3852e] to-[#c96641] text-white px-6 py-4 rounded-2xl text-center font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Оставить заявку
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
              Член ISHRS • AAHRS • Союз трихологов
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
                <span>Записаться на консультацию</span>
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
              Доверьтесь <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">профессионалу</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Многолетний опыт и тысячи успешных операций - ваша гарантия качественного результата
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
              Наши <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">услуги</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полный спектр услуг по восстановлению волос с применением передовых международных методик
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
                  <span>Записаться</span>
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
                    <span>Записаться</span>
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
              Доктор <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">Ойбек Усманов</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Хирург-трихолог с международной квалификацией
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Large Image Block */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="#"
                alt="Ойбек Усманов"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-bold text-white mb-3">8 лет опыта в трихологии</h3>
                <p className="text-gray-200 text-lg">Член международных ассоциаций ISHRS и AAHRS</p>
              </div>
            </div>

            {/* Text Block */}
            <div className="bg-gradient-to-br from-[#f3852e]/10 to-[#c96641]/5 p-8 rounded-3xl">
              <div className="w-14 h-14 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-2xl flex items-center justify-center mb-6">
                <Award className="text-white" size={28} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Образование</h4>
              <p className="text-gray-600 leading-relaxed">
                Выпускник Ташкентской Медицинской Академии. Специализация по дерматовенерологии в Институте Усовершенствования Врачей.
              </p>
            </div>

            {/* Stats Block */}
            <div className="bg-gradient-to-br from-[#f3852e] to-[#c96641] p-8 rounded-3xl text-white">
              <div className="text-5xl font-bold mb-2">2000+</div>
              <div className="text-xl text-white/90 mb-4">Успешных операций</div>
              <p className="text-white/80">
                Каждая процедура выполняется с максимальной точностью и заботой о пациенте
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
              <h3 className="text-3xl font-bold text-gray-900 mb-6">О докторе</h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Доктор Ойбек Усманов — специалист в области хирургии и реконструктивно-эстетической медицины, практикующий в сфере восстановления волос. Образование включает бакалавриат по общей врачебной практике, магистратуру по хирургии, а также вторичную специализацию по пластической хирургии, полученную в Центре профессиональной квалификации медицинских работников.
                </p>
                <p>
                  С 2021 года занимается эстетической медициной, уделяя особое внимание методам восстановления волос. Постоянно повышает квалификацию и расширяет навыки, обучаясь у ведущих специалистов и участвуя в профессиональных медицинских программах.
                </p>
                <p>
                  В практике использует современные малоинвазивные методики пересадки волос, включая FUE, DHI, а также реконструкцию бороды и бровей. Уделяет большое внимание безопасности, естественности результата и индивидуальному подходу к каждому пациенту.
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
              Образование и <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">сертификаты</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Непрерывное профессиональное развитие и международное признание
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
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Профессиональные достижения</h3>
              <p className="text-white/90 text-lg max-w-3xl mx-auto">
                Постоянное совершенствование навыков и участие в международных конференциях
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-white/90">Международных конференций</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">3</div>
                <div className="text-white/90">Членства в ассоциациях</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-white/90">Часов обучения ежегодно</div>
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
              Отзывы <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">пациентов</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Более 2000 довольных пациентов доверяют свое здоровье доктору Усманову
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
                Готовы начать новую жизнь?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
                Запишитесь на бесплатную консультацию и узнайте, какой метод восстановления волос подходит именно вам
              </p>
              <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="inline-flex items-center space-x-3 bg-white text-[#f3852e] px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl">
                <span>Записаться на консультацию</span>
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
                Свяжитесь <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">с нами</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Запишитесь на бесплатную консультацию и получите профессиональные рекомендации
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1 text-lg">Телефон</div>
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
                    <div className="font-semibold text-gray-900 mb-1 text-lg">Адрес</div>
                    <div className="text-gray-600 text-lg">г. Ташкент, Юнусабадский район, махаллинский сход граждан Адолат, 4-й квартал, 4А</div>
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
                Профессиональная пересадка волос с применением современных международных методик FUE и DHI
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-4">Навигация</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="hover:text-[#f3852e] transition-colors">Услуги</a></li>
                <li><a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="hover:text-[#f3852e] transition-colors">О докторе</a></li>
                <li><a href="#education" onClick={(e) => smoothScroll(e, 'education')} className="hover:text-[#f3852e] transition-colors">Образование</a></li>
                <li><a href="#reviews" onClick={(e) => smoothScroll(e, 'reviews')} className="hover:text-[#f3852e] transition-colors">Отзывы</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+998 97 421 11 12</li>
                <li>info@oybekusmanov.uz</li>
                <li>г. Ташкент, Юнусабадский район, махаллинский сход граждан Адолат, 4-й квартал, 4А</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2025 Доктор Ойбек Усманов. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}