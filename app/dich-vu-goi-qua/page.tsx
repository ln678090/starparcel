import type { Metadata } from 'next';
import { getServices } from '@/lib/get-services';

export const metadata: Metadata = {
  title: 'Dịch Vụ Gói Quà Cao Cấp | Bảng Giá',
  description: 'Dịch vụ gói quà tặng chuyên nghiệp với giấy lụa, sáp niêm phong...',
};

export default async function DichVuGoiQuaPage() {
  const services = await getServices(); // Lấy dữ liệu từ DB

  return (
      <div className="bg-white">
        {/* HEADER GIỮ NGUYÊN */}
        <section className="bg-blue-950 text-white py-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-amber-400">Dịch Vụ Gói Quà Nghệ Thuật</h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-lg">Hô biến mọi món đồ trở nên sang trọng và mang đậm dấu ấn cá nhân...</p>
        </section>

        {/* PRICING SECTION ĐÃ ĐƯỢC TỰ ĐỘNG HÓA */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {services.map((svc) => (
                <div
                    key={svc.id}
                    className={`rounded-3xl p-8 shadow-sm relative ${
                        svc.isPopular ? 'border-2 border-amber-500 bg-amber-50/30 shadow-lg' : 'border border-stone-200'
                    }`}
                >
                  {svc.isPopular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white font-bold px-4 py-1 rounded-full text-sm">
                        PHỔ BIẾN
                      </div>
                  )}
                  <h3 className={`text-2xl font-bold mb-2 ${svc.isPopular ? 'text-amber-600' : 'text-blue-900'}`}>
                    {svc.name}
                  </h3>
                  <p className="text-stone-500 mb-6">{svc.subtitle}</p>
                  <div className={`text-4xl font-bold mb-6 ${svc.isPopular ? 'text-blue-950' : 'text-stone-800'}`}>
                    {svc.price}
                  </div>
                  <ul className="space-y-3 mb-8 text-stone-600">
                    {svc.features.map((feature, index) => (
                        <li key={index}>{svc.isPopular ? '★' : '✓'} {feature}</li>
                    ))}
                  </ul>
                  <a href="https://zalo.me/0372505551" className="block text-center w-full bg-blue-900 text-white font-semibold py-2.5 rounded-lg hover:bg-amber-600 transition-colors">
                    Zalo Đặt Lịch
                  </a>
                </div>
            ))}
          </div>
        </section>

      {/* MATERIALS GALLERY */}
      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-blue-950 font-serif mb-12">Chất Liệu Làm Nên Sự Khác Biệt</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=400" className="rounded-xl w-full h-48 object-cover" alt="Sáp niêm phong" />
            <img src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=400" className="rounded-xl w-full h-48 object-cover" alt="Ruy băng lụa" />
            <img src="https://product.hstatic.net/200000548923/product/z3632776284161_e3316e959779b06c786a8d50db47f20a_4af1af86e1704e6889582f46af9ce7f0_master.jpg" className="rounded-xl w-full h-48 object-cover" alt="Giấy lót và hộp" />
            <img src="https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=400" className="rounded-xl w-full h-48 object-cover" alt="Giấy bọc nghệ thuật" />
          </div>
        </div>
      </section>
    </div>
  );
}
