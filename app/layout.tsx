import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ランダムカードガチャ',
  description: 'カードを引いてランダムな単語を引き当てよう！',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
