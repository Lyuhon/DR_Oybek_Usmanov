// app/page.js
import HairTransplantLanding from './HairTransplantLandingNew';
import translations from './translations.json'; // ← ДОБАВЬ ЭТО

export default function HomePage() {
    return <HairTransplantLanding
        translations={translations}  // ← И ЭТО
        initialLang="uz"
    />;
}