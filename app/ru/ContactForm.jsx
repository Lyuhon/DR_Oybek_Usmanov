'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const serviceOptions = ['Метод FUE', 'DHI метод', 'Трансплантация бороды', 'Пересадка бровей', 'PRP-терапия'];

export default function ContactForm() {
    const [selectOpen, setSelectOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('Выберите услугу');
    const [formData, setFormData] = useState({
        name: '',
        phone: '+998 ',
        service: 'Выберите услугу',
        comment: ''
    });
    const [formLoading, setFormLoading] = useState(false);
    const [formMessage, setFormMessage] = useState(null);

    const handlePhoneChange = (e) => {
        let value = e.target.value;

        // Если пытаются удалить +998, возвращаем его обратно
        if (!value.startsWith('+998 ')) {
            setFormData({ ...formData, phone: '+998 ' });
            return;
        }

        // Берем только то что после +998 
        let digitsAfter998 = value.slice(5);

        // Убираем всё кроме цифр
        digitsAfter998 = digitsAfter998.replace(/\D/g, '');

        // Ограничиваем 9 цифрами
        digitsAfter998 = digitsAfter998.slice(0, 9);

        // Собираем обратно
        const formatted = '+998 ' + digitsAfter998;

        setFormData({ ...formData, phone: formatted });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Получаем цифры после +998 
        const digitsAfter998 = formData.phone.slice(5).replace(/\D/g, '');

        // Проверяем что есть 9 цифр
        if (digitsAfter998.length !== 9) {
            setFormMessage({ type: 'error', text: 'Введите 9 цифр номера после +998' });
            return;
        }

        setFormLoading(true);
        setFormMessage(null);

        // Отправляем в формате +998901234567
        const phoneToSend = '+998' + digitsAfter998;

        try {
            const response = await fetch('/api/send-telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    phone: phoneToSend,
                    url: window.location.href
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setFormMessage({ type: 'success', text: 'Заявка отправлена!' });
                setFormData({ name: '', phone: '+998 ', service: 'Выберите услугу', comment: '' });
                setSelectedService('Выберите услугу');
            } else {
                setFormMessage({ type: 'error', text: 'Ошибка отправки' });
            }
        } catch (error) {
            setFormMessage({ type: 'error', text: 'Ошибка отправки' });
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-10 rounded-3xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Запись на консультацию</h3>

            {formMessage && (
                <div className={`mb-6 p-4 rounded-2xl ${formMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {formMessage.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-sm">Ваше имя</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#f3852e] focus:ring-4 focus:ring-[#f3852e]/20 outline-none transition-all"
                            placeholder="Введите имя"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-sm">Телефон</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            required
                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#f3852e] focus:ring-4 focus:ring-[#f3852e]/20 outline-none transition-all"
                            placeholder="+998 901234567"
                        />
                    </div>
                </div>

                {/* Custom Select */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">Услуга</label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setSelectOpen(!selectOpen)}
                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#f3852e] focus:ring-4 focus:ring-[#f3852e]/20 outline-none transition-all bg-white text-left flex items-center justify-between"
                        >
                            <span className={selectedService === 'Выберите услугу' ? 'text-gray-400' : 'text-gray-900'}>
                                {selectedService}
                            </span>
                            <ChevronDown
                                className={`text-gray-400 transition-transform ${selectOpen ? 'rotate-180' : ''}`}
                                size={20}
                            />
                        </button>

                        {selectOpen && (
                            <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                                {serviceOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => {
                                            setSelectedService(option);
                                            setFormData({ ...formData, service: option });
                                            setSelectOpen(false);
                                        }}
                                        className="w-full px-5 py-3 text-left hover:bg-gradient-to-r hover:from-[#f3852e]/10 hover:to-[#c96641]/10 transition-all text-gray-700 hover:text-[#f3852e] font-medium"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">Комментарий</label>
                    <textarea
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        rows={4}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#f3852e] focus:ring-4 focus:ring-[#f3852e]/20 outline-none transition-all resize-none"
                        placeholder="Расскажите о вашей ситуации"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-gradient-to-r from-[#f3852e] to-[#c96641] hover:from-[#c96641] hover:to-[#f3852e] text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>{formLoading ? 'Отправка...' : 'Отправить заявку'}</span>
                    {!formLoading && <ArrowRight size={20} />}
                </button>
            </form>
        </div>
    );
}