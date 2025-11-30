// // import { Montserrat } from "next/font/google";
// // import Script from "next/script";
// // import "./globals.css";

// // const montserrat = Montserrat({
// //   variable: "--font-montserrat",
// //   subsets: ["latin"],
// //   weight: ["300", "400", "500", "600", "700", "800", "900"],
// // });

// // export const metadata = {
// //   title: "Пересадка волос в Ташкенте - Доктор Ойбек Усманов | FUE и DHI методы",
// //   description: "Профессиональная пересадка волос методами FUE и DHI в Ташкенте. Доктор Ойбек Усманов - 8+ лет опыта, 2000+ успешных операций. Член ISHRS и AAHRS. Запись на бесплатную консультацию.",
// // };

// // export default function RootLayout({
// //   children
// // }: {
// //   children: React.ReactNode
// // }) {
// //   return (
// //     <html lang="uz">
// //       <head>
// //         {/* GTM Script в head */}
// //         <Script
// //           id="gtm-script"
// //           strategy="afterInteractive"
// //           dangerouslySetInnerHTML={{
// //             __html: `
// //               (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// //               new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// //               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// //               'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// //               })(window,document,'script','dataLayer','GTM-NQJWDHHH');
// //             `,
// //           }}
// //         />
// //       </head>
// //       <body className={montserrat.variable}>
// //         {/* GTM noscript в начале body */}
// //         <noscript>
// //           <iframe
// //             src="https://www.googletagmanager.com/ns.html?id=GTM-NQJWDHHH"
// //             height="0"
// //             width="0"
// //             style={{ display: "none", visibility: "hidden" }}
// //           />
// //         </noscript>
// //         {children}
// //       </body>
// //     </html>
// //   );
// // }


// // app/layout.tsx
// import { Montserrat } from "next/font/google";
// import "./globals.css";

// const montserrat = Montserrat({
//   variable: "--font-montserrat",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
// });

// export const metadata = {
//   title: "Пересадка волос в Ташкенте - Доктор Ойбек Усманов | FUE и DHI методы",
//   description: "Профессиональная пересадка волос методами FUE и DHI в Ташкенте. Доктор Ойбек Усманов - 8+ лет опыта, 2000+ успешных операций. Член ISHRS и AAHRS. Запись на бесплатную консультацию.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="uz">
//       {/* 1. Скрипт GTM как можно выше в <head> — требование Google */}
//       <head>
//         {/* Google Tag Manager */}
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-NQJWDHHH');`,
//           }}
//         />
//         {/* End Google Tag Manager */}
//       </head>

//       <body className={montserrat.variable}>
//         {/* 2. Носкрипт сразу после <body> — требование Google */}
//         {/* Google Tag Manager (noscript) */}
//         <noscript>
//           <iframe
//             src="https://www.googletagmanager.com/ns.html?id=GTM-NQJWDHHH"
//             height="0"
//             width="0"
//             style={{ display: "none", visibility: "hidden" }}
//           />
//         </noscript>
//         {/* End Google Tag Manager (noscript) */}

//         {children}
//       </body>
//     </html>
//   );
// }


// app/layout.tsx
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NQJWDHHH');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '820789257245845');
fbq('track', 'PageView');
            `,
          }}
        />
        {/* End Meta Pixel Code */}
      </head>

      <body className={montserrat.variable}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NQJWDHHH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Meta Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=820789257245845&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel (noscript) */}

        {children}
      </body>
    </html>
  );
}