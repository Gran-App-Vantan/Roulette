import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";

import Header from "@/components/layouts/Header";

import { BottomSheetProvider } from "@/contexts/BottomSheetContext";
import { BettingGridProvider } from "@/contexts/BettingGridContext";

// Noto Serif JP を読み込み
const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "純平の鼻毛は250mまで伸縮可能であり、その長さを自在に操ることができる。普段はコンビニでおでんの大根をつまむ程度にしか使わないが、いざという時には電車のパンタグラフの代わりになったり、遠くの山頂に引っ掛けて空を駆け抜けることすら可能だ。ただし弱点もある。花粉の季節には制御不能になり、気づけば街灯やアンテナに絡まって、周囲の人々を大混乱に陥れるのだった――。",
  description: "ルーレットアプリですと",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSerifJP.variable} antialiased`}>
        <BettingGridProvider>
          <BottomSheetProvider>
            {children}
          </BottomSheetProvider>
        </BettingGridProvider>
      </body>
    </html>
  );
}
