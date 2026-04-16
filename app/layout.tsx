import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import ThemeProvider from '../components/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';
import SeasonalEffect from '../components/SeasonalEffect';
import Image from "next/image";
import  logo from "../public/logo.png"
export const metadata: Metadata = {
  title: {
    default: 'StarParcel | Quà Tặng Lưu Niệm & Gói Quà Nghệ Thuật',
    template: '%s | StarParcel'
  },
  description: 'StarParcel cung cấp quà lưu niệm độc đáo, nến thơm, sổ tay và dịch vụ gói quà nghệ thuật sáp niêm phong cao cấp tại Hà Nam.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-200 font-sans transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SeasonalEffect />

          {/* HEADER */}
          <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <Image
                    src="/logo.png"
                    alt="StarParcel Logo"
                    width={48}
                    height={48}
                    className="object-cover rounded-md"
                />
                {/*<div className="w-10 h-10 bg-blue-900 dark:bg-amber-600 rounded-md flex items-center justify-center text-white font-bold text-lg transition-colors">*/}
                {/*  SP*/}
                {/*</div>*/}
                <div>
                  <div className="text-xl font-bold text-blue-950 dark:text-stone-100 tracking-tight font-serif transition-colors">StarParcel</div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-500 font-bold uppercase tracking-widest">Gifts & Wrap</div>
                </div>
              </Link>

              <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
                <Link href="/" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors">Trang chủ</Link>
                <Link href="/qua-tang" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors">Sản phẩm Quà Tặng</Link>
                <Link href="/dich-vu-goi-qua" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors">Dịch vụ Gói Quà</Link>
                <ThemeToggle />
              </nav>

              <div className="flex items-center gap-4 md:hidden">
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="flex-grow pt-20">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="bg-stone-900 dark:bg-black text-stone-300 py-12 border-t-4 border-amber-600 transition-colors">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white font-serif mb-4">StarParcel</h3>
                <p className="text-sm leading-relaxed mb-4 text-stone-400">Hô biến mọi đồ vật thành kiệt tác. Cửa hàng quà tặng lưu niệm & đóng gói nghệ thuật hàng đầu Hà Nam.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Liên Hệ Đặt Hàng</h4>
                <ul className="space-y-3 text-sm text-stone-400">
                  <li>📍 Đại học Nam Cao, Duy Tiên, Hà Nam</li>
                  <li>📞 <a href="tel:0372505551" className="hover:text-amber-400 font-bold text-white transition">0372.505.551</a> (Zalo/Hotline)</li>
                  <li>📧 ln678090@gmail.com</li>
                </ul>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
