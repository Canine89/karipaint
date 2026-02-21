import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "카리페인트 | 도장 시공 전문",
  description: "2대째 이어진 도장 시공, 공간의 가치를 높이는 내 손으로 완성하는",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body
        className={`${notoSansKR.variable} font-sans antialiased min-h-screen`}
        style={{ minHeight: "100vh", backgroundColor: "#FAF8F5" }}
      >
        {children}
      </body>
    </html>
  );
}
