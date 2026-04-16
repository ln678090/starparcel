'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from "next/link";


gsap.registerPlugin(ScrollTrigger);

// Nhận products từ Server truyền vào
export default function HomeClient({ products }: { products: any[] }) {
    const scrollWrapperRef = useRef(null);
    const visualCircleRef = useRef(null);

    useEffect(() => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        ScrollTrigger.refresh();
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: scrollWrapperRef.current,
                    start: 'top top',
                    end: '+=150%',
                    scrub: 1,
                    pin: true,
                }
            });

            tl.fromTo(visualCircleRef.current,
                { width: '35vh', height: '35vh', borderRadius: '50%' },
                { width: '100vw', height: '100vh', borderRadius: '0px', duration: 1, ease: "power2.inOut" }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-stone-50 dark:bg-stone-950 transition-colors duration-300 min-h-screen">

            {/* 1. SECTION HERO CUỘN (SCROLL REVEAL) */}
            <div ref={scrollWrapperRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#f0eadd]">
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="text-center max-w-3xl px-4">
                        <h1 className="text-4xl md:text-7xl font-bold font-serif text-blue-950 mb-6 drop-shadow-xl">
                            Gói Quà & <br/> Quà Tặng Lưu Niệm
                        </h1>
                        <p className="text-lg text-stone-800 font-medium mb-8">Cuộn xuống để khám phá sự tinh tế trong từng món quà</p>
                    </div>
                </div>

                {/* Khối tròn sẽ phóng to ra full màn hình khi cuộn */}
                <div
                    ref={visualCircleRef}
                    className="relative overflow-hidden z-0 shadow-2xl"
                    style={{ width: '35vh', height: '35vh', borderRadius: '50%' }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1600&auto=format&fit=crop"
                        alt="Quà tặng"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            </div>

            {/* 2. SECTION DỊCH VỤ GÓI QUÀ */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-blue-950 dark:text-stone-100 font-serif mb-6">
                            Nghệ thuật đóng gói<br/> <span className="text-amber-600 italic">cá nhân hóa</span>
                        </h2>
                        <p className="text-lg text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
                            Mỗi món quà đều mang một thông điệp riêng. Tại StarParcel, chúng tôi sử dụng sáp niêm phong cổ điển, giấy lụa Hàn Quốc mềm mại và các loại ruy băng tơ tằm để hô biến mọi vật phẩm thành một kiệt tác thực sự.
                        </p>
                        <Link href="/dich-vu-goi-qua" className="inline-block bg-blue-900 dark:bg-amber-600 text-white font-bold px-8 py-4 rounded-full hover:bg-blue-800 dark:hover:bg-amber-700 transition">
                            Khám Phá Dịch Vụ
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=600" className="rounded-2xl w-full h-48 md:h-64 object-cover shadow-md" alt="Sáp" />
                        <img src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=600" className="rounded-2xl w-full h-48 md:h-64 object-cover mt-8 shadow-md" alt="Ruy băng" />
                    </div>
                </div>
            </section>

            {/* 3. SECTION DANH SÁCH 20 SẢN PHẨM LƯU NIỆM */}
            <section className="py-24 bg-white dark:bg-stone-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-blue-950 dark:text-stone-100 font-serif mb-4">Kho Quà Lưu Niệm Độc Đáo</h2>
                        <p className="text-stone-600 dark:text-stone-400">20+ sản phẩm quà tặng tinh tế. Mua kèm dịch vụ gói quà để tạo bất ngờ tuyệt đối cho người thương.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((p) => (
                            <div key={p.id} className="bg-stone-50 dark:bg-stone-800 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-xl transition-all group flex flex-col h-full">
                                <div className="relative h-56 overflow-hidden">
                                    {p.tag && <span className="absolute top-3 left-3 bg-amber-500 text-stone-900 text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">{p.tag}</span>}
                                    <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-md font-bold text-stone-800 dark:text-stone-200 mb-2 line-clamp-2">{p.name}</h3>
                                    <p className="text-amber-600 dark:text-amber-400 font-bold text-lg mb-4 mt-auto">{p.price}</p>
                                    <a  href="https://zalo.me/0372505551" className="block text-center w-full bg-blue-900 dark:bg-stone-900 text-white dark:text-stone-200 font-semibold py-2.5 rounded-lg hover:bg-amber-600 dark:hover:bg-amber-600 transition-colors">
                                        Zalo Đặt Hàng
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}