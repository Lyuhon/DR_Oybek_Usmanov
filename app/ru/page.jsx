// app/ru/page.js
import HairTransplantLanding from '../HairTransplantLandingNew';
import translations from '../translations.json'; // ← ДОБАВЬ

export default function RuPage() {
    return <HairTransplantLanding
        translations={translations}  // ← И ЭТО
        initialLang="ru"
    />;
}