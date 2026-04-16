import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dịch Vụ Gói Quà Cao Cấp | Bảng Giá',
  description: 'Dịch vụ gói quà tặng chuyên nghiệp với giấy lụa, sáp niêm phong, ruy băng voan. Nhận gói quà doanh nghiệp số lượng lớn.',
  keywords: ['dịch vụ gói quà', 'gói quà cao cấp', 'bảng giá gói quà', 'StarParcel gói quà', 'concept gói quà'],
};

export default function DichVuGoiQuaPage() {
  return (
    <div className="bg-white">
      {/* HEADER SECTION */}
      <section className="bg-blue-950 text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-amber-400">Dịch Vụ Gói Quà Nghệ Thuật</h1>
        <p className="max-w-2xl mx-auto text-stone-300 text-lg">Hô biến mọi món đồ trở nên sang trọng và mang đậm dấu ấn cá nhân. Dù là quà bạn tự chuẩn bị hay mua tại StarParcel, chúng tôi đều chăm chút tỉ mỉ.</p>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Gói Cơ Bản */}
          <div className="border border-stone-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Gói Tiêu Chuẩn</h3>
            <p className="text-stone-500 mb-6">Đẹp, gọn gàng, phù hợp tặng bạn bè</p>
            <div className="text-4xl font-bold text-stone-800 mb-6">Từ 50.000đ</div>
            <ul className="space-y-3 mb-8 text-stone-600">
              <li>✓ Giấy gói họa tiết cao cấp</li>
              <li>✓ Ruy băng lụa cơ bản</li>
              <li>✓ Tag/Thiệp chúc mừng in sẵn</li>
              <li>✓ Lót giấy vụn bọt biển chống sốc</li>
            </ul>
            <a  href="https://zalo.me/0372505551" className="block text-center w-full bg-blue-900 dark:bg-stone-900 text-white dark:text-stone-200 font-semibold py-2.5 rounded-lg hover:bg-amber-600 dark:hover:bg-amber-600 transition-colors">
              Zalo Đặt Lịnh
            </a>
          </div>

          {/* Gói Concept VIP */}
          <div className="border-2 border-amber-500 bg-amber-50/30 rounded-3xl p-8 shadow-lg relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white font-bold px-4 py-1 rounded-full text-sm">PHỔ BIẾN</div>
            <h3 className="text-2xl font-bold text-amber-600 mb-2">Gói Concept VIP</h3>
            <p className="text-stone-500 mb-6">Cá nhân hóa, nghệ thuật, siêu sang trọng</p>
            <div className="text-4xl font-bold text-blue-950 mb-6">Từ 150.000đ</div>
            <ul className="space-y-3 mb-8 text-stone-600">
              <li>★ Hộp cứng bọc nhung/giấy ánh kim</li>
              <li>★ Phối giấy gói 2-3 lớp (Kraft, voan lụa)</li>
              <li>★ Dập sáp niêm phong (Wax Seal) cổ điển</li>
              <li>★ Đính kèm hoa khô sấy (Cẩm tú cầu, Lavender)</li>
              <li>★ Viết thiệp tay Calligraphy nghệ thuật</li>
            </ul>
            <a  href="https://zalo.me/0372505551" className="block text-center w-full bg-blue-900 dark:bg-stone-900 text-white dark:text-stone-200 font-semibold py-2.5 rounded-lg hover:bg-amber-600 dark:hover:bg-amber-600 transition-colors">
              Zalo Đặt Lịnh
            </a>
          </div>
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
