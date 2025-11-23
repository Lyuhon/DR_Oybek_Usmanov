'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const beforeAfterItems = [
    { before: '/before_after/client-2-1.jpg', after: '/before_after/client-2-2.jpg' },
    { before: '/before_after/client-4-1.jpg', after: '/before_after/client-4-2.jpg' },
    { before: '/before_after/client-1-1.jpg', after: '/before_after/client-1-2.jpg' },
    { before: '/before_after/client-3-1.jpg', after: '/before_after/client-3-2.jpg' },
    { before: '/before_after/client-5-1.jpg', after: '/before_after/client-5-2.jpg' },
    { before: '/before_after/client-6-1.jpg', after: '/before_after/client-6-2.jpg' },
];

// Предзагрузка через обычные <img> в скрытом div (самый надёжный способ в Next.js App Router)
const Preloader = () => (
    <div className="fixed -top-96 left-0 opacity-0 pointer-events-none">
        {beforeAfterItems.flatMap(item => [
            <img key={item.before} src={item.before} alt="" loading="eager" />,
            <img key={item.after} src={item.after} alt="" loading="eager" />
        ])}
    </div>
);

export default function BeforeAfter({ t }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const goToSlide = (index) => {
        setActiveSlide(index);
        setSliderPosition(50);
    };

    const nextSlide = () => goToSlide((activeSlide + 1) % beforeAfterItems.length);
    const prevSlide = () => goToSlide((activeSlide - 1 + beforeAfterItems.length) % beforeAfterItems.length);

    const handlePointerMove = (clientX) => {
        if (!isDragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPosition(percent);
    };

    const handleStart = (e) => {
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        handlePointerMove(clientX);
    };

    const handleMove = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        handlePointerMove(clientX);
    };

    const handleEnd = () => setIsDragging(false);

    const current = beforeAfterItems[activeSlide];

    return (
        <>
            <Preloader /> {/* Это предзагрузит все картинки сразу */}

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                            {t.beforeAfter.title}{' '}
                            <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">
                                {t.beforeAfter.titleHighlight}
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.beforeAfter.subtitle}</p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-2xl mb-8">
                            <div
                                ref={containerRef}
                                className="relative h-[500px] md:h-[700px] cursor-ew-resize select-none"
                                onMouseDown={handleStart}
                                onMouseMove={handleMove}
                                onMouseUp={handleEnd}
                                onMouseLeave={handleEnd}
                                onTouchStart={handleStart}
                                onTouchMove={handleMove}
                                onTouchEnd={handleEnd}
                            >
                                {/* After */}
                                <Image
                                    src={current.after}
                                    alt="После"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 1024px"
                                    priority
                                />

                                <div className="absolute top-6 right-6 z-10 bg-gradient-to-r from-[#f3852e] to-[#c96641] text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                                    {t.beforeAfter.after}
                                </div>

                                {/* Before */}
                                <div
                                    className="absolute inset-0 overflow-hidden"
                                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                                >
                                    <Image
                                        src={current.before}
                                        alt="До"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 1024px"
                                        priority
                                    />
                                    <div className="absolute top-6 left-6 z-10 bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                                        {t.beforeAfter.before}
                                    </div>
                                </div>

                                {/* Ползунок */}
                                <div
                                    className="absolute inset-y-0 w-1 bg-white shadow-2xl pointer-events-none"
                                    style={{ left: `${sliderPosition}%` }}
                                >
                                    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center">
                                        <ChevronLeft className="text-gray-900 absolute -left-1" size={20} />
                                        <ChevronRight className="text-gray-900 absolute -right-1" size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Навигация и миниатюры — без изменений */}
                        <div className="flex items-center justify-between">
                            <button onClick={prevSlide} className="w-14 h-14 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl">
                                <ChevronLeft className="text-gray-900" size={28} />
                            </button>

                            <div className="flex space-x-2">
                                {beforeAfterItems.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToSlide(i)}
                                        className={`h-3 rounded-full transition-all ${i === activeSlide ? 'w-12 bg-gradient-to-r from-[#f3852e] to-[#c96641]' : 'w-3 bg-gray-300 hover:bg-gray-400'}`}
                                    />
                                ))}
                            </div>

                            <button onClick={nextSlide} className="w-14 h-14 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl">
                                <ChevronRight className="text-gray-900" size={28} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {beforeAfterItems.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => goToSlide(i)}
                                    className={`relative h-32 rounded-2xl overflow-hidden transition-all ${i === activeSlide ? 'ring-4 ring-[#f3852e] shadow-xl scale-105' : 'hover:scale-105 shadow-lg'}`}
                                >
                                    <Image
                                        src={item.after}
                                        alt=""
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}