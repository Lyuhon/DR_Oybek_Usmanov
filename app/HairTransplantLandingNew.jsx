// HairTransplantLanding.jsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Award, Clock, Users, CheckCircle, Phone, Mail, MapPin, Star, ArrowRight, Menu, X, ChevronLeft, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import VideoReviews from './VideoReviews';
import BeforeAfter from './BeforeAfter';

import translations from './translations.json';

// Lazy load ContactForm
const ContactForm = dynamic(() => import('./ContactForm'), {
    loading: () => <div className="bg-gray-100 p-10 rounded-3xl animate-pulse h-[500px]"></div>,
    ssr: false
});

// Изображения слайдера
const heroImages = [
    {
        mobile: '/cap-hair-MOBILE.png',
        desktop: '/cap-banner.jpg', // добавьте PC версию
        priority: true
    },
    {
        mobile: '/man-with-hairbrush-MOBILE.png',
        desktop: '/man-with-hairbrush-PC.png',
        priority: false
    },
    {
        mobile: '/mariedge-couple-MOBILE.png',
        desktop: '/mariedge-couple.png', // добавьте PC версию
        priority: false
    }
];

const serviceImages = [
    '/FUE-method.jpg',
    // '/DHI-method.jpg',
    '/half-man-s-face-with-beard.avif',
    '/eye-brow.jpeg',
    '/adult-male-doing-follicular-unit-extraction.avif'
];

const certificateImages = [
    '/photo_2025-11-14_02-48-28.jpg',
    '/photo_2025-11-14_02-48-25.jpg',
    '/photo_2025-11-14_02-48-16.jpg'
];

export default function HairTransplantLanding({ translations, initialLang = 'uz' }) {
    const [lang, setLang] = useState(initialLang);
    const [activeService, setActiveService] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [certificateModal, setCertificateModal] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const t = useMemo(() => translations[lang], [translations, lang]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = (mobileMenuOpen || certificateModal) ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen, certificateModal]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % t.hero.slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [t.hero.slides.length]);

    useEffect(() => {
        // Preload critical images
        const img = new window.Image();
        img.src = heroImages[0].src;
        img.onload = () => setImagesLoaded(true);
    }, []);

    const smoothScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            const offset = 80;
            window.scrollTo({
                top: element.getBoundingClientRect().top + window.pageYOffset - offset,
                behavior: 'smooth'
            });
            setMobileMenuOpen(false);
        }
    };

    const toggleLanguage = () => {
        const newLang = lang === 'uz' ? 'ru' : 'uz';
        setLang(newLang);
        // Update URL without reload
        window.history.pushState({}, '', `/${newLang === 'uz' ? '' : 'ru'}`);
    };

    const FlagIcon = ({ isRu }) => (
        <img
            src={isRu ? '/ru.svg' : '/uz.svg'}
            alt="Flag"
            className="rounded-[3px] w-[20px]"
        />
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-white py-5'}`}>
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-md">
                        <Image src="/oybek-logo.png" alt="Dr. Usmanov" width={400} height={400} className="h-10 w-auto" priority />
                    </div>

                    <div className='flex items-center gap-4'>
                        <button
                            onClick={toggleLanguage}
                            className="md:hidden cursor-pointer flex items-center space-x-2 px-4 py-3 rounded-full bg-white shadow-md transition-all"
                            title={t.nav.languageName}
                        >
                            <FlagIcon isRu={lang === 'uz'} />
                            <span className="text-sm font-[600] text-gray-700">{t.nav.languageCode}</span>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-gray-900 p-2 bg-white rounded-full shadow-md"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="text-gray-700 hover:text-[#f3852e] transition-colors font-medium">{t.nav.services}</a>
                        <a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="text-gray-700 hover:text-[#f3852e] transition-colors font-medium">{t.nav.about}</a>
                        <a href="#education" onClick={(e) => smoothScroll(e, 'education')} className="text-gray-700 hover:text-[#f3852e] transition-colors font-medium">{t.nav.education}</a>
                        <a href="#reviews" onClick={(e) => smoothScroll(e, 'reviews')} className="text-gray-700 hover:text-[#f3852e] transition-colors font-medium">{t.nav.reviews}</a>

                        <button
                            onClick={toggleLanguage}
                            className="cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                            title={t.nav.languageName}
                        >
                            <FlagIcon isRu={lang === 'uz'} />
                            <span className="text-sm font-medium text-gray-700">{t.nav.languageCode}</span>
                        </button>

                        <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="bg-gradient-to-r from-[#f3852e] to-[#c96641] hover:from-[#c96641] hover:to-[#f3852e] text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">
                            {t.nav.consultation}
                        </a>
                    </div>

                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
                <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-6">
                            <Image src="/oybek-logo.png" alt="Dr. Usmanov" width={40} height={40} className="h-10 w-auto" />
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-6">
                            <div className="space-y-2 px-4">
                                <a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all">{t.nav.services}</a>
                                <a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all">{t.nav.about}</a>
                                <a href="#education" onClick={(e) => smoothScroll(e, 'education')} className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all">{t.nav.education}</a>
                                <a href="#reviews" onClick={(e) => smoothScroll(e, 'reviews')} className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all">{t.nav.reviews}</a>

                                <button
                                    onClick={toggleLanguage}
                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 hover:text-[#f3852e] rounded-xl font-medium transition-all w-full"
                                >
                                    <FlagIcon isRu={lang === 'uz'} />
                                    <span>{t.nav.languageName}</span>
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="block bg-gradient-to-r from-[#f3852e] to-[#c96641] text-white px-6 py-4 rounded-2xl text-center font-semibold shadow-lg hover:shadow-xl transition-all">
                                {t.nav.consultation}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-20 overflow-hidden">

                <div className="absolute inset-0 z-0">
                    {heroImages.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {/* Изображение для мобилки */}
                            <Image
                                src={img.mobile}
                                alt={t.hero.slides[index]?.title || ''}
                                fill
                                className="object-cover object-bottom md:hidden"
                                priority={img.priority}
                                // quality={85}
                                sizes="100vw"
                            />

                            {/* Изображение для десктопа */}
                            <Image
                                src={img.desktop}
                                alt={t.hero.slides[index]?.title || ''}
                                fill
                                className="object-cover hidden md:block"
                                priority={img.priority}
                                // quality={85}
                                sizes="100vw"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/30 to-black/30"></div>
                        </div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 py-12 md:pb-32 pb-0 md:py-32 min-h-[80vh] md:min-h-[700px] flex items-center">
                    <div className="max-w-3xl w-full">
                        <div className="inline-block bg-gradient-to-r from-[#f3852e] to-[#c96641] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 relative z-20">
                            {t.hero.badge}
                        </div>

                        <div className="relative min-h-[360px] md:min-h-[320px] mb-8">
                            {t.hero.slides.map((slide, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-700 ${index === currentSlide
                                        ? 'opacity-100 translate-x-0'
                                        : index < currentSlide
                                            ? 'opacity-0 -translate-x-12 pointer-events-none'
                                            : 'opacity-0 translate-x-12 pointer-events-none'
                                        }`}
                                >
                                    <h1 className="text-3xl md:text-6xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
                                        {slide.subtitle}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="md:hidden flex items-center space-x-4 relative z-20 mb-4">
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev - 1 + t.hero.slides.length) % t.hero.slides.length)}
                                className="border-1 border-white w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="text-white" size={24} />
                            </button>
                            <div className="flex space-x-2">
                                {t.hero.slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`transition-all ${index === currentSlide ? 'w-12 bg-white' : 'w-3 bg-white/50'} h-3 rounded-full`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev + 1) % t.hero.slides.length)}
                                className="border-1 border-white w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="text-white" size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-20">
                            <div className="relative inline-block">

                                <a href="#contact"
                                    onClick={(e) => smoothScroll(e, 'contact')}
                                    className="md:bg-gradient-to-r md:from-[#f3852e] md:to-[#c96641] md:hover:from-[#c96641] md:hover:to-[#f3852e] md:text-white bg-gradient-to-r from-[#fff] to-[#fff] px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2 border-1 border-white"
                                >
                                    <span>{t.hero.cta}</span>
                                    <ArrowRight size={22} />
                                </a>
                                {/* <div className="absolute -top-3 -right-2 bg-red-600- bg-[#e25d5d] text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow-lg border-1 border-white">
                                    {t.hero.sale}
                                </div> */}
                            </div>
                        </div>

                        <div className="md:flex hidden items-center space-x-4 relative z-20">
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev - 1 + t.hero.slides.length) % t.hero.slides.length)}
                                className="w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="text-white" size={24} />
                            </button>
                            <div className="flex space-x-2">
                                {t.hero.slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`transition-all ${index === currentSlide ? 'w-12 bg-white' : 'w-3 bg-white/50'} h-3 rounded-full`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev + 1) % t.hero.slides.length)}
                                className="w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="text-white" size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-gradient-to-br from-[#f3852e] via-[#c96641] to-[#b85532] rounded-3xl md:p-16 p-8 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.cta.title}</h2>
                            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">{t.cta.subtitle}</p>
                            <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="inline-flex items-center space-x-3 bg-white text-[#f3852e] px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl">
                                <span>{t.cta.button}</span>
                                <ArrowRight size={26} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>


            <VideoReviews t={t} />

            <BeforeAfter t={t} />


            {/* Stats Section */}
            < section className="py-20 bg-white" >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t.stats.title} <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">{t.stats.titleHighlight}</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.stats.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {t.stats.items.map((stat, index) => {
                            const icons = [Award, Clock, Users, Star];
                            const Icon = icons[index];
                            return (
                                <div key={index} className="bg-gradient-to-br from-[#f3852e]/10 to-[#c96641]/5 p-8 rounded-3xl hover:shadow-xl transition-all transform hover:-translate-y-2">
                                    <div className="flex flex-col h-full justify-between">
                                        <div className="w-14 h-14 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-2xl flex items-center justify-center mb-6">
                                            <Icon className="text-white" size={28} />
                                        </div>
                                        <div>
                                            <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent mb-2">{stat.number}</div>
                                            <div className="text-gray-600 font-medium text-base md:text-lg">{stat.label}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section >

            {/* Services Section */}
            < section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white" >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                            {t.services.title} <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">{t.services.titleHighlight}</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.services.subtitle}</p>
                    </div>

                    {/* Desktop Tabs */}
                    <div className="hidden md:grid md:grid-cols-4 gap-3 mb-12">
                        {t.services.items.map((service, index) => (
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
                                {t.services.items.map((service, index) => (
                                    <Image
                                        key={index}
                                        src={serviceImages[index]}
                                        alt={service.title}
                                        fill
                                        className={`object-cover transition-opacity duration-500 ${index === activeService ? 'opacity-100' : 'opacity-0'}`}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        loading="lazy"
                                    />
                                ))}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            </div>
                            <div className="p-12 flex flex-col justify-center">
                                <h3 className="text-4xl font-bold text-gray-900 mb-6">{t.services.items[activeService].title}</h3>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">{t.services.items[activeService].description}</p>
                                <div className="space-y-4">
                                    {t.services.items[activeService].features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center space-x-3">
                                            <CheckCircle className="text-[#f3852e] flex-shrink-0" size={24} />
                                            <span className="text-gray-700 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="inline-flex items-center space-x-2 mt-8 bg-gradient-to-r from-[#f3852e] to-[#c96641] hover:from-[#c96641] hover:to-[#f3852e] text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 w-fit">
                                    <span>{t.services.cta}</span>
                                    <ArrowRight size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Service Cards */}
                    <div className="md:hidden space-y-6">
                        {t.services.items.map((service, index) => (
                            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-xl">
                                <div className="relative h-64">
                                    <Image
                                        src={serviceImages[index]}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                        sizes="100vw"
                                        loading="lazy"
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
                                        <span>{t.services.cta}</span>
                                        <ArrowRight size={18} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* About Section */}
            < section id="about" className="py-20 bg-white" >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                            {t.about.title} <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">{t.about.titleHighlight}</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.about.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden shadow-2xl group bg-gray-200 min-h-[500px]">
                            {/* Изображение для мобильных (< md) */}
                            <Image
                                src="/about-doctor-mobile.jpg"
                                alt={t.about.imageTitle}
                                fill
                                className="object-cover md:hidden"
                                priority
                                sizes="100vw"
                            // quality={85}
                            />

                            {/* Изображение для десктопа (≥ md) */}
                            <Image
                                src="/about-doctor-pc.jpg"
                                alt={t.about.imageTitle}
                                fill
                                className="object-cover hidden md:block"
                                priority
                                sizes="(min-width: 768px) 66vw, 100vw"
                            // quality={90}
                            />

                            {/* Градиентная подложка */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

                            {/* Текст поверх изображения */}
                            <div className="absolute bottom-8 left-8 right-8 z-10">
                                <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                                    {t.about.imageTitle}
                                </h3>
                                <p className="text-gray-200 text-lg drop-shadow-md">
                                    {t.about.imageSubtitle}
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#f3852e]/10 to-[#c96641]/5 p-8 rounded-3xl">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-2xl flex items-center justify-center mb-6">
                                <Award className="text-white" size={28} />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-4">{t.about.educationTitle}</h4>
                            <p className="text-gray-600 leading-relaxed">{t.about.educationText}</p>
                        </div>

                        <div className="bg-gradient-to-br from-[#f3852e] to-[#c96641] p-8 rounded-3xl text-white">
                            <div className="text-5xl font-bold mb-2">{t.about.statsNumber}</div>
                            <div className="text-xl text-white/90 mb-4">{t.about.statsTitle}</div>
                            <p className="text-white/80">{t.about.statsText}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {t.about.advantages.map((advantage, index) => {
                            const icons = [Award, CheckCircle, Users, Star];
                            const Icon = icons[index];
                            return (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="text-white" size={24} />
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2 text-lg">{advantage.title}</h4>
                                    <p className="text-sm text-gray-600">{advantage.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12 bg-gradient-to-r from-gray-50 to-white md:p-12 p-6 rounded-3xl">
                        <div className="mx-auto">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">{t.about.advantagesTitle}</h3>
                            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                                {t.about.bioText.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Education Section */}
            < section id="education" className="py-20 bg-gradient-to-br from-gray-50 to-white" >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                            {t.education.title} <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">{t.education.titleHighlight}</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.education.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {t.education.certificates.map((cert, index) => (
                            <button
                                key={index}
                                onClick={() => setCertificateModal(cert)}
                                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 group cursor-pointer text-left w-full"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={certificateImages[index]}
                                        alt={cert.title}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-gradient-to-r from-[#f3852e] to-[#c96641] text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                                            {cert.year}
                                        </div>
                                    </div>
                                </div>

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

                    <div className="mt-12 bg-gradient-to-r from-[#f3852e] to-[#c96641] rounded-3xl p-8 md:p-12 text-white">
                        <div className="text-center mb-8">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">{t.education.achievementsTitle}</h3>
                            <p className="text-white/90 text-lg max-w-3xl mx-auto">{t.education.achievementsSubtitle}</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {t.education.achievementsItems.map((item, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                                    style={{ border: "1px solid #fff" }}>
                                    <div className="text-4xl font-bold mb-2">{item.number}</div>
                                    <div className="text-white/90">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >

            {/* Certificate Modal */}
            {
                certificateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
                        <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
                            <button
                                onClick={() => setCertificateModal(null)}
                                className="absolute top-4 right-4 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                            >
                                <X size={24} className="text-gray-900" />
                            </button>
                            <div className="p-6">
                                <div className="relative w-full h-[60vh]">
                                    <Image
                                        src={certificateImages[t.education.certificates.indexOf(certificateModal)]}
                                        alt={certificateModal.title}
                                        fill
                                        className="object-contain rounded-2xl"
                                        sizes="(max-width: 1024px) 100vw, 1024px"
                                    />
                                </div>
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
                )
            }

            {/* Reviews Section */}
            {/* <section id="reviews" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                            {t.reviews.title} <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">{t.reviews.titleHighlight}</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.reviews.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {t.reviews.items.map((testimonial, index) => (
                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
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
            </section> */}

            {/* CTA Section */}
            {/* <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-gradient-to-br from-[#f3852e] via-[#c96641] to-[#b85532] rounded-3xl p-16 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.cta.title}</h2>
                            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">{t.cta.subtitle}</p>
                            <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="inline-flex items-center space-x-3 bg-white text-[#f3852e] px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl">
                                <span>{t.cta.button}</span>
                                <ArrowRight size={26} />
                            </a>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Contact Section */}
            <section id="contact-" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                {t.contact.title} <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">{t.contact.titleHighlight}</span>
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">{t.contact.subtitle}</p>

                            <div className="space-y-6 mb-8">
                                {/* Телефон */}
                                <div className="flex items-start space-x-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Phone className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 mb-1 text-lg">{t.contact.phone}</div>
                                        <a
                                            href="tel:+998974211112"
                                            className="text-gray-600 text-lg hover:text-[#f3852e] transition-colors underline-offset-4 hover:underline"
                                        >
                                            +998 97 421 11 12
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start space-x-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Mail className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 mb-1 text-lg">{t.contact.email}</div>
                                        <a
                                            href="mailto:info@oybekusmanov.uz"
                                            className="text-gray-600 text-lg hover:text-[#f3852e] transition-colors underline-offset-4 hover:underline break-all"
                                        >
                                            info@oybekusmanov.uz
                                        </a>
                                    </div>
                                </div>

                                {/* Адрес (открытие в Google Maps) */}
                                <div className="flex items-start space-x-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <MapPin className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 mb-1 text-lg">{t.contact.address}</div>
                                        <a
                                            href="https://yandex.uz/maps/-/CLG37W8Z"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 text-lg hover:text-[#f3852e] transition-colors underline-offset-4 hover:underline"
                                        >
                                            {t.contact.addressText}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ContactForm t={t} lang={lang} />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <div className="bg-white px-4 py-2 rounded-full inline-block mb-4">
                                <Image src="/oybek-logo.png" alt="Dr. Usmanov" width={40} height={40} className="h-10 w-auto" />
                            </div>
                            <p className="text-gray-400 leading-relaxed">{t.footer.description}</p>
                        </div>

                        <div>
                            <h4 className="font-bold text-xl mb-4">{t.footer.navigation}</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="hover:text-[#f3852e] transition-colors">{t.nav.services}</a></li>
                                <li><a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="hover:text-[#f3852e] transition-colors">{t.nav.about}</a></li>
                                <li><a href="#education" onClick={(e) => smoothScroll(e, 'education')} className="hover:text-[#f3852e] transition-colors">{t.nav.education}</a></li>
                                <li><a href="#reviews" onClick={(e) => smoothScroll(e, 'reviews')} className="hover:text-[#f3852e] transition-colors">{t.nav.reviews}</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-xl mb-4">{t.footer.contacts}</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li>
                                    <a href="tel:+998974211112" className="hover:text-[#f3852e] transition-colors">
                                        +998 97 421 11 12
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:info@oybekusmanov.uz" className="hover:text-[#f3852e] transition-colors break-all">
                                        info@oybekusmanov.uz
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://yandex.uz/maps/-/CLG37W8Z"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-[#f3852e] transition-colors"
                                    >
                                        {t.contact.addressText}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                        <p>{t.footer.copyright}</p>
                    </div>
                </div>
            </footer>
        </div >
    );
}