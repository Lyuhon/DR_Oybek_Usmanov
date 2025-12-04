import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, phone, service, city, comment, url } = body;

        // Validate required fields
        if (!name || !phone) {
            return NextResponse.json(
                { error: 'Имя и телефон обязательны для заполнения' },
                { status: 400 }
            );
        }

        // Get Telegram credentials from environment variables
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (!BOT_TOKEN || !CHAT_ID) {
            console.error('Missing Telegram credentials in environment variables');
            return NextResponse.json(
                { error: 'Ошибка конфигурации сервера' },
                { status: 500 }
            );
        }

        // Format message without emojis
        const message = `
НОВАЯ ЗАЯВКА

Имя: ${name}
Телефон: ${phone}
Услуга: ${service}

${city ? `Город/Область: ${city}` : ''}
${comment ? `Комментарий: ${comment}` : ''}

Источник: ${url}
Дата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })}
    `.trim();

        // Send message to Telegram
        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML',
                }),
            }
        );

        const telegramData = await telegramResponse.json();

        if (!telegramResponse.ok) {
            console.error('Telegram API error:', telegramData);
            return NextResponse.json(
                { error: 'Ошибка при отправке сообщения' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Заявка успешно отправлена' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        return NextResponse.json(
            { error: 'Произошла ошибка при обработке заявки' },
            { status: 500 }
        );
    }
}