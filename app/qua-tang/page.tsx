import type { Metadata } from 'next';
import { getProducts } from '@/lib/get-products'; // Import hàm lấy dữ liệu từ DB của bạn

export const metadata: Metadata = {
  title: 'Cửa Hàng Quà Tặng Lưu Niệm | 20 Mẫu Quà Độc Đáo',
  description: 'Bộ sưu tập 20 sản phẩm quà lưu niệm độc đáo không đụng hàng tại StarParcel: nến thơm, sổ tay vintage, hộp nhạc, gấu bông, phụ kiện trang trí.',
  keywords: ['mua quà tặng', 'quà lưu niệm', 'nến thơm', 'sổ tay vintage', 'quà tặng sinh nhật', 'StarParcel'],
};

// Đổi component thành async để gọi được await bên trong
export default async function QuaTangPage() {

  // Lấy toàn bộ dữ liệu từ MongoDB ngay trên Server
  const products = await getProducts();

  return (
      <div className="py-12 bg-white dark:bg-stone-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-blue-950 dark:text-stone-100 font-serif mb-4">Kho Quà Lưu Niệm Độc Đáo</h1>
            <p className="text-stone-600 dark:text-stone-400">Khám phá các sản phẩm quà tặng tinh tế. Thêm dịch vụ gói quà nghệ thuật để tạo bất ngờ tuyệt đối cho người thương.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
                <div key={p.id} className="bg-stone-50 dark:bg-stone-900 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-xl transition-all group flex flex-col h-full">
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
      </div>
  );
}