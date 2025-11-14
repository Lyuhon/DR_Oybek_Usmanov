import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Пересадка волос в Ташкенте - Доктор Ойбек Усманов | FUE и DHI методы",
  description: "Профессиональная пересадка волос методами FUE и DHI в Ташкенте. Доктор Ойбек Усманов - 8+ лет опыта, 2000+ успешных операций. Член ISHRS и AAHRS. Запись на бесплатную консультацию.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        {children}
      </body>
    </html>
  );
}