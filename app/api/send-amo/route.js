import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, phone, service, comment } = body;

        const subdomain = process.env.AMO_SUBDOMAIN;
        const accessToken = process.env.AMO_ACCESS_TOKEN;
        const shikoyatiFieldId = process.env.AMO_SHIKOYATI_FIELD_ID;
        const pipelineId = process.env.AMO_PIPELINE_ID || null;
        const statusId = process.env.AMO_STATUS_ID || null;

        if (!subdomain || !accessToken) {
            console.error('AMO CRM credentials not configured');
            return NextResponse.json(
                { error: 'AMO CRM не настроен' },
                { status: 500 }
            );
        }

        const amoApiUrl = `https://${subdomain}.amocrm.ru/api/v4`;

        // 1. Создаем или находим контакт
        const contactData = {
            name: name,
            custom_fields_values: [
                {
                    field_code: 'PHONE',
                    values: [
                        {
                            value: phone,
                            enum_code: 'WORK'
                        }
                    ]
                }
            ]
        };

        const contactResponse = await fetch(`${amoApiUrl}/contacts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([contactData])
        });

        if (!contactResponse.ok) {
            const errorText = await contactResponse.text();
            console.error('AMO CRM contact creation error:', errorText);
            return NextResponse.json(
                { error: 'Ошибка создания контакта в AMO CRM' },
                { status: 500 }
            );
        }

        const contactResult = await contactResponse.json();
        const contactId = contactResult._embedded.contacts[0].id;

        // 2. Создаем сделку
        const leadData = {
            name: `Заявка с сайта - ${name}`,
            custom_fields_values: []
        };

        // Добавляем кастомное поле "Shikoyati" если ID указан
        if (shikoyatiFieldId && service) {
            leadData.custom_fields_values.push({
                field_id: parseInt(shikoyatiFieldId),
                values: [
                    {
                        value: service
                    }
                ]
            });
        }

        // Добавляем воронку и этап если указаны
        if (pipelineId) {
            leadData.pipeline_id = parseInt(pipelineId);
        }
        if (statusId) {
            leadData.status_id = parseInt(statusId);
        }

        // Привязываем контакт к сделке
        leadData._embedded = {
            contacts: [
                {
                    id: contactId
                }
            ]
        };

        const leadResponse = await fetch(`${amoApiUrl}/leads`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([leadData])
        });

        if (!leadResponse.ok) {
            const errorText = await leadResponse.text();
            console.error('AMO CRM lead creation error:', errorText);
            return NextResponse.json(
                { error: 'Ошибка создания сделки в AMO CRM' },
                { status: 500 }
            );
        }

        const leadResult = await leadResponse.json();
        const leadId = leadResult._embedded.leads[0].id;

        // 3. Добавляем примечание с комментарием если есть
        if (comment) {
            const noteData = {
                note_type: 'common',
                params: {
                    text: `Комментарий с сайта:\n${comment}`
                }
            };

            await fetch(`${amoApiUrl}/leads/${leadId}/notes`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([noteData])
            });
        }

        return NextResponse.json({
            success: true,
            contactId,
            leadId
        });

    } catch (error) {
        console.error('AMO CRM integration error:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}

// # Поля сделок
// https://drusmanoffgmailcom.amocrm.ru/api/v4/leads/custom_fields

// # Поля компаний
// GET https://drusmanoffgmailcom.amocrm.ru/api/v4/companies/custom_fields

// # Все воронки с этапами
// GET https://drusmanoffgmailcom.amocrm.ru/api/v4/leads/pipelines

// # Конкретная воронка
// GET https://drusmanoffgmailcom.amocrm.ru/api/v4/leads/pipelines/{pipeline_id}