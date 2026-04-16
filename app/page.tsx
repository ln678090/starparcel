
import HomeClient from "@/components/HomeClient";
import {getProducts} from "@/lib/get-products";

// 1. Cấu hình SEO (Quan trọng nhất)
export const metadata = {
  title: "StarParcel | Nghệ thuật quà tặng & Gói quà cao cấp",
  description: "Khám phá kho quà tặng lưu niệm độc đáo và dịch vụ gói quà cá nhân hóa bằng sáp niêm phong, ruy băng tơ tằm tại StarParcel.",
  openGraph: {
    title: "StarParcel - Quà tặng tinh tế",
    images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48"],
  },
};

export default async function Page() {
  // 2. Lấy dữ liệu từ MongoDB tại Server
  const products = await getProducts();

  // 3. Truyền dữ liệu xuống Client Component
  return <HomeClient products={products} />;
}