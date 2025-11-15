// app/ru/page.js
import HairTransplantLanding from '../HairTransplantLanding';
import translations from '../translations.json'; // ← ДОБАВЬ

export default function RuPage() {
    return <HairTransplantLanding
        translations={translations}  // ← И ЭТО
        initialLang="ru"
    />;
}