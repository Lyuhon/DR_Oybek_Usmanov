// app/ru/thanks/page.jsx  (или просто замени содержимое в uz, если нужно)

import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ThanksPage() {
    return (
        <div className="min-h-screen bg-white">

            {/* Основной контент */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto text-center">

                    {/* Иконка успеха */}
                    <div className="mx-auto w-32 h-32 bg-gradient-to-br from-[#f3852e] to-[#c96641] rounded-full flex items-center justify-center mb-8 shadow-2xl">
                        <CheckCircle className="text-white" size={72} />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Спасибо за заявку!
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Мы получили ваше сообщение и скоро свяжемся с вами
                    </p>

                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                            В ближайшее время наш менеджер позвонит вам, чтобы согласовать время бесплатной консультации и уточнить все детали.
                        </p>
                    </div>

                    {/* Кнопки */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
                        <Link
                            href="/ru"  // или "/" если главная на русском без префикса
                            className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#f3852e] to-[#c96641] text-white hover:opacity-90 px-10 py-5 rounded-full font-bold text-xl shadow-xl transition-all transform hover:scale-105"
                        >
                            <span>Вернуться на главную</span>
                            <ArrowRight size={28} />
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    );
}