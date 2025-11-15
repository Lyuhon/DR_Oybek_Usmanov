// app/page.js
import HairTransplantLanding from './HairTransplantLanding';
import translations from './translations.json'; // ← ДОБАВЬ ЭТО

export default function HomePage() {
    return <HairTransplantLanding
        translations={translations}  // ← И ЭТО
        initialLang="uz"
    />;
}