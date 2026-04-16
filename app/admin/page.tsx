'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);

    // Quản lý trạng thái Modal (Hộp thoại Thêm/Sửa)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: '', name: '', price: '', img: '', tag: '' });
    const [isLoading, setIsLoading] = useState(false);

    // 1. ĐỌC (READ): Lấy danh sách sản phẩm
    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => { fetchProducts(); }, []);

    // 2. XÓA (DELETE)
    const deleteProduct = async (id: string) => {
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            await fetch('/api/products/' + id, { method: 'DELETE' });
            fetchProducts();
        }
    };

    // 3. THÊM / SỬA (CREATE / UPDATE)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (formData.id) {
            // Nếu có ID -> Gọi API Sửa (PATCH)
            await fetch('/api/products/' + formData.id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
        } else {
            // Nếu không có ID -> Gọi API Thêm mới (POST)
            await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    price: formData.price,
                    img: formData.img,
                    tag: formData.tag
                }),
            });
        }

        setIsModalOpen(false); // Đóng modal
        setIsLoading(false);
        fetchProducts(); // Tải lại danh sách
    };

    // Hàm mở Modal Thêm mới
    const openAddModal = () => {
        setFormData({ id: '', name: '', price: '', img: '', tag: '' });
        setIsModalOpen(true);
    };

    // Hàm mở Modal Sửa
    const openEditModal = (product: any) => {
        setFormData(product);
        setIsModalOpen(true);
    };

    // 4. ĐĂNG XUẤT (LOGOUT)
    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh(); // Ép Next.js chạy lại middleware để chặn truy cập
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Quản trị Sản phẩm</h1>
                <div className="flex gap-4">
                    <button onClick={openAddModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 font-medium">
                        + Thêm sản phẩm
                    </button>
                    <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-900 font-medium">
                        Đăng xuất
                    </button>
                </div>
            </div>

            {/* Bảng dữ liệu */}
            <div className="overflow-x-auto bg-white rounded-lg shadow border">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-50 border-b">
                        <th className="p-4 font-semibold text-gray-600">Hình ảnh</th>
                        <th className="p-4 font-semibold text-gray-600">Tên sản phẩm</th>
                        <th className="p-4 font-semibold text-gray-600">Giá</th>
                        <th className="p-4 font-semibold text-gray-600">Tag</th>
                        <th className="p-4 font-semibold text-gray-600 text-right">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((p: any) => (
                        <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                            <td className="p-4">
                                <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded shadow-sm" />
                            </td>
                            <td className="p-4 font-medium text-gray-800">{p.name}</td>
                            <td className="p-4 text-amber-600 font-bold">{p.price}</td>
                            <td className="p-4">
                                {p.tag && <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">{p.tag}</span>}
                            </td>
                            <td className="p-4 text-right space-x-2">
                                <button onClick={() => openEditModal(p)} className="bg-amber-500 text-white px-3 py-1.5 rounded hover:bg-amber-600 text-sm">
                                    Sửa
                                </button>
                                <button onClick={() => deleteProduct(p.id)} className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 text-sm">
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    {products.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-gray-500">Chưa có sản phẩm nào.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Modal Thêm/Sửa Sản Phẩm */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-bold mb-4">{formData.id ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Tên sản phẩm *</label>
                                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Giá (VD: 120.000đ) *</label>
                                <input required type="text" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Link Ảnh (URL từ Unsplash/Imgur) *</label>
                                <input required type="url" value={formData.img} onChange={(e) => setFormData({...formData, img: e.target.value})} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                                {formData.img && <img src={formData.img} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded border" />}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Tag (Nhãn nổi bật - Không bắt buộc)</label>
                                <input type="text" placeholder="VD: Bán chạy, Mới..." value={formData.tag || ''} onChange={(e) => setFormData({...formData, tag: e.target.value})} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                                    Hủy
                                </button>
                                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50">
                                    {isLoading ? 'Đang lưu...' : 'Lưu sản phẩm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}