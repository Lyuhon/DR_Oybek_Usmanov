'use client';

import { useState, useEffect } from 'react';
import { Home, Search, ArrowRight, AlertCircle } from 'lucide-react';

export default function NotFound404() {
    const [locale, setLocale] = useState('uz');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Определяем локаль из URL
        const path = window.location.pathname;
        if (path.includes('/ru')) {
            setLocale('ru');
        } else {
            setLocale('uz');
        }
    }, []);

    const content = {
        uz: {
            title: "Sahifa topilmadi",
            subtitle: "404 xato",
            description: "Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.",
            suggestion: "Iltimos, manzilni tekshiring yoki bosh sahifaga qayting.",
            homeButton: "Bosh sahifaga qaytish",
            searchPlaceholder: "Qidiruv...",
            helpTitle: "Yordam kerakmi?",
            helpText: "Bizning mutaxassislarimiz sizga har qanday savol bo'yicha yordam berishga tayyor.",
            contactButton: "Bog'lanish",
            popularLinks: "Mashhur sahifalar",
            links: [
                { name: "Xizmatlar", href: "#services" },
                { name: "Shifokor haqida", href: "#about" },
                { name: "Ta'lim", href: "#education" },
                { name: "Sharhlar", href: "#reviews" }
            ]
        },
        ru: {
            title: "Страница не найдена",
            subtitle: "Ошибка 404",
            description: "Извините, страница, которую вы ищете, не существует или была перемещена.",
            suggestion: "Пожалуйста, проверьте адрес или вернитесь на главную страницу.",
            homeButton: "Вернуться на главную",
            searchPlaceholder: "Поиск...",
            helpTitle: "Нужна помощь?",
            helpText: "Наши специалисты готовы помочь вам с любыми вопросами.",
            contactButton: "Связаться с нами",
            popularLinks: "Популярные страницы",
            links: [
                { name: "Услуги", href: "#services" },
                { name: "О докторе", href: "#about" },
                { name: "Образование", href: "#education" },
                { name: "Отзывы", href: "#reviews" }
            ]
        }
    };

    const t = content[locale];

    // Prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-4xl w-full">
                {/* Main Content */}
                <div className="text-center mb-12">
                    {/* Animated 404 */}
                    <div className="mb-8 relative">
                        <div className="text-[160px] md:text-[280px] font-bold bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent leading-none opacity-20 select-none">
                            404
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                                <AlertCircle className="text-white" size={64} />
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    <div className="mb-6">
                        <span className="inline-block bg-gradient-to-r from-[#f3852e] to-[#c96641] text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                            {t.subtitle}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t.title}
                        </h1>
                        <p className="text-xl text-gray-600 mb-2 max-w-2xl mx-auto">
                            {t.description}
                        </p>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            {t.suggestion}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <a
                            href={locale === 'ru' ? '/ru' : '/'}
                            className="inline-flex justify-center items-center space-x-2 bg-gradient-to-r from-[#f3852e] to-[#c96641] hover:from-[#c96641] hover:to-[#f3852e] text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
                        >
                            <Home size={20} />
                            <span>{t.homeButton}</span>
                        </a>
                    </div>

                </div>

            </div>
        </div>
    );
}