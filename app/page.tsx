import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="relative py-20 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-950 font-serif leading-tight mb-6">
              Món Quà Ý Nghĩa, <br />
              <span className="text-amber-600 italic">Gói Trọn Tâm Tình</span>
            </h1>
            <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto md:mx-0">
              StarParcel mang đến giải pháp trọn gói: Từ việc lựa chọn những món quà lưu niệm độc đáo, đến nghệ thuật đóng gói cao cấp mang đậm dấu ấn cá nhân của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/qua-tang" className="bg-blue-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-800 transition text-center shadow-lg">
                Mua Quà Tặng
              </Link>
              <Link href="/dich-vu-goi-qua" className="bg-amber-100 text-amber-900 px-8 py-4 rounded-full font-semibold hover:bg-amber-200 transition text-center shadow-sm">
                Xem Dịch Vụ Gói Quà
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-amber-200 rounded-full blur-3xl opacity-30 transform translate-x-10 translate-y-10"></div>
            <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop" alt="Quà tặng StarParcel" className="relative rounded-2xl shadow-2xl object-cover w-full h-[500px]" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-blue-950 font-serif mb-12">Tại sao chọn StarParcel?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Đa Dạng Quà Tặng</h3>
              <p className="text-stone-600 text-sm">Tuyển tập quà lưu niệm phong phú từ nến thơm, sổ tay, đến phụ kiện vintage.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Đóng Gói Nghệ Thuật</h3>
              <p className="text-stone-600 text-sm">Chất liệu cao cấp, sáp niêm phong, giấy lụa Hàn Quốc tạo nên sự khác biệt.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Giao Hàng Tốc Độ</h3>
              <p className="text-stone-600 text-sm">Đóng gói và giao hỏa tốc trong khu vực Hà Nam, đảm bảo an toàn tuyệt đối.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
