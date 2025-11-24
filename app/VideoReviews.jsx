// VideoReviews.jsx
'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Star } from 'lucide-react';
import Image from 'next/image';

const videoReviews = [
    {
        // name: '',
        image: '/video/UM.jpg',
        video: '/video/UM.mp4',
        // preview: '',
        rating: 5,
    },
    {
        image: '/video/avaz.jpg',
        video: '/video/avaz.mp4',
        rating: 5,
    },
    {
        image: '/video/UM-2.jpg',
        video: '/video/UM-2.mp4',
        rating: 5,
    },
    {
        image: '/video/UM-3.jpg',
        video: '/video/UM-3.mp4',
        rating: 5,
    },
    {
        image: '/video/UM-4.jpg',
        video: '/video/UM-4.mp4',
        rating: 5,
    },
    {
        image: '/video/UM-5.jpg',
        video: '/video/UM-5.mp4',
        rating: 5,
    },
    {
        image: '/video/UM-6-min.jpg',
        video: '/video/UM-6.mp4',
        rating: 5,
    },
];

function VideoReviewCard({ review, t, className = '' }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const togglePlayPause = async () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                await videoRef.current.play();
                setIsPlaying(true);
            } catch (err) {
                console.error('Не удалось запустить видео:', err);
            }
        }
    };

    return (
        // <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <div className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${className}`}>

            {/* Большое фото сверху */}
            <div className="relative h-[70vh] lg:h-[500px] bg-gray-100">
                <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Рейтинг */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-1 shadow-lg">
                    {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#f3852e] fill-current" />
                    ))}
                </div>

                {/* Имя и текст */}
                <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{review.name}</h3>
                    <p className="text-white/80 text-sm leading-tight">{review.preview}</p>
                </div>
            </div>

            {/* Круглое видео */}
            <div className="relative -mt-20 pb-8 flex justify-center px-6">
                <div className="relative">
                    <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl ring-8 ring-white bg-black">

                        <video
                            ref={videoRef}
                            src={review.video}           // ← берём из массива!
                            poster={review.image}        // ← превью — та же фотка
                            className="w-full h-full object-cover"
                            playsInline
                            preload="metadata"
                            onEnded={() => setIsPlaying(false)}
                            onClick={togglePlayPause}
                        />

                        <button
                            onClick={togglePlayPause}
                            className="absolute inset-0 flex items-center justify-center group"
                            aria-label={isPlaying ? t.pauseLabel : t.playLabel}
                        >
                            <div className={`
                w-16 h-16 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-2xl
                transition-all duration-300
                ${isPlaying ? 'opacity-0 group-hover:opacity-100 scale-90' : 'opacity-100 scale-100'}
              `}>
                                {isPlaying ? (
                                    <Pause className="w-9 h-9 text-[#f3852e]" />
                                ) : (
                                    <Play className="w-9 h-9 text-[#f3852e] ml-1" />
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center px-6 pb-6">
                <p className="text-gray-600 text-sm font-medium">
                    {isPlaying ? t.playingText : t.clickToWatch}
                </p>
            </div>
        </div>
    );
}

export default function VideoReviews({ t }) {
    return (
        <section id="reviews" className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                        {t.videoReviews.title}{' '}
                        <span className="bg-gradient-to-r from-[#f3852e] to-[#c96641] bg-clip-text text-transparent">
                            {t.videoReviews.titleHighlight}
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t.videoReviews.subtitle}
                    </p>
                </div>

                {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {videoReviews.map((review, index) => (
                        <VideoReviewCard
                            key={index}
                            review={review}           // ← передаём объект с данными
                            t={t.videoReviews}        // ← переводы
                        />
                    ))}

                </div> */}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {videoReviews.map((review, index) => (
                        <VideoReviewCard
                            key={index}
                            review={review}
                            t={t.videoReviews}
                            className={index === 6 ? 'md:hidden' : ''}  // ← вот тут прячем 7-й
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}