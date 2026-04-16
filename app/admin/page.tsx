'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();

    // 1. STATE CHUNG
    const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
    const [isLoading, setIsLoading] = useState(false);

    // 2. STATE SẢN PHẨM
    const [products, setProducts] = useState([]);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [productForm, setProductForm] = useState({ id: '', name: '', price: '', img: '', tag: '' });

    // 3. STATE DỊCH VỤ
    const [services, setServices] = useState([]);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [serviceForm, setServiceForm] = useState({ id: '', name: '', subtitle: '', price: '', features: '', isPopular: false });

    // ==========================================
    // FETCH DỮ LIỆU (ĐỌC)
    // ==========================================
    const fetchData = async () => {
        const resProducts = await fetch('/api/products').then(r => r.json());
        setProducts(resProducts);
        const resServices = await fetch('/api/services').then(r => r.json());
        setServices(resServices);
    };

    useEffect(() => { fetchData(); }, []);

    // ==========================================
    // XỬ LÝ SẢN PHẨM (PRODUCTS)
    // ==========================================
    const deleteProduct = async (id: string) => {
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            await fetch('/api/products/' + id, { method: 'DELETE' });
            fetchData();
        }
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (productForm.id) {
            await fetch('/api/products/' + productForm.id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productForm),
            });
        } else {
            await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: productForm.name,
                    price: productForm.price,
                    img: productForm.img,
                    tag: productForm.tag
                }),
            });
        }

        setIsProductModalOpen(false);
        setIsLoading(false);
        fetchData();
    };

    const openProductModal = (product?: any) => {
        if (product) {
            setProductForm(product);
        } else {
            setProductForm({ id: '', name: '', price: '', img: '', tag: '' });
        }
        setIsProductModalOpen(true);
    };

    // ==========================================
    // XỬ LÝ DỊCH VỤ (SERVICES)
    // ==========================================
    const deleteService = async (id: string) => {
        if (confirm("Xóa gói dịch vụ này?")) {
            await fetch('/api/services/' + id, { method: 'DELETE' });
            fetchData();
        }
    };

    const handleServiceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Tách chuỗi textarea thành mảng
        const featureArray = serviceForm.features.split('\n').filter(f => f.trim() !== '');
        const payload = { ...serviceForm, features: featureArray };

        if (serviceForm.id) {
            await fetch('/api/services/' + serviceForm.id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        setIsServiceModalOpen(false);
        setIsLoading(false);
        fetchData();
    };

    const openServiceModal = (svc?: any) => {
        if (svc) {
            // Gộp mảng thành chuỗi xuống dòng để sửa trong textarea
            setServiceForm({ ...svc, features: svc.features.join('\n') });
        } else {
            setServiceForm({ id: '', name: '', subtitle: '', price: '', features: '', isPopular: false });
        }
        setIsServiceModalOpen(true);
    };

    // ==========================================
    // XỬ LÝ LOGOUT
    // ==========================================
    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    };

    // ==========================================
    // GIAO DIỆN CHÍNH
    // ==========================================
    return (
        <div className="p-8 max-w-6xl mx-auto bg-stone-50 min-h-screen">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border">
                <h1 className="text-3xl font-bold text-gray-800">Bảng Điều Khiển Admin</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600 font-medium transition">
                    Đăng xuất
                </button>
            </div>

            {/* ĐIỀU HƯỚNG TABS */}
            <div className="flex gap-6 border-b-2 border-gray-200 mb-8">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`pb-3 px-4 font-bold text-lg transition ${activeTab === 'products' ? 'border-b-4 border-blue-600 text-blue-700 -mb-0.5' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    🎁 Quản lý Sản Phẩm
                </button>
                <button
                    onClick={() => setActiveTab('services')}
                    className={`pb-3 px-4 font-bold text-lg transition ${activeTab === 'services' ? 'border-b-4 border-amber-500 text-amber-600 -mb-0.5' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    🎀 Quản lý Dịch Vụ
                </button>
            </div>

            {/* ========================================== */}
            {/* TAB 1: GIAO DIỆN QUẢN LÝ SẢN PHẨM */}
            {/* ========================================== */}
            {activeTab === 'products' && (
                <div className="animate-in fade-in duration-300">
                    <div className="flex justify-end mb-4">
                        <button onClick={() => openProductModal()} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 font-medium">
                            + Thêm sản phẩm
                        </button>
                    </div>
                    <div className="overflow-x-auto bg-white rounded-lg shadow border">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-blue-50 border-b">
                                <th className="p-4 font-semibold text-blue-900">Hình ảnh</th>
                                <th className="p-4 font-semibold text-blue-900">Tên sản phẩm</th>
                                <th className="p-4 font-semibold text-blue-900">Giá</th>
                                <th className="p-4 font-semibold text-blue-900">Tag</th>
                                <th className="p-4 font-semibold text-blue-900 text-right">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((p: any) => (
                                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4"><img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded shadow-sm border" /></td>
                                    <td className="p-4 font-medium text-gray-800">{p.name}</td>
                                    <td className="p-4 text-blue-600 font-bold">{p.price}</td>
                                    <td className="p-4">{p.tag && <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold">{p.tag}</span>}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => openProductModal(p)} className="bg-amber-500 text-white px-3 py-1.5 rounded hover:bg-amber-600 text-sm">Sửa</button>
                                        <button onClick={() => deleteProduct(p.id)} className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 text-sm">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ========================================== */}
            {/* TAB 2: GIAO DIỆN QUẢN LÝ DỊCH VỤ */}
            {/* ========================================== */}
            {activeTab === 'services' && (
                <div className="animate-in fade-in duration-300">
                    <div className="flex justify-end mb-4">
                        <button onClick={() => openServiceModal()} className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-amber-700">
                            + Thêm gói dịch vụ
                        </button>
                    </div>
                    <div className="overflow-x-auto bg-white rounded-lg shadow border">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-amber-50 border-b">
                                <th className="p-4 font-semibold text-amber-900">Tên gói</th>
                                <th className="p-4 font-semibold text-amber-900">Mô tả ngắn</th>
                                <th className="p-4 font-semibold text-amber-900">Giá</th>
                                <th className="p-4 font-semibold text-amber-900">Trạng thái</th>
                                <th className="p-4 font-semibold text-amber-900 text-right">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {services.map((svc: any) => (
                                <tr key={svc.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 font-bold text-gray-800">{svc.name}</td>
                                    <td className="p-4 text-sm text-gray-500">{svc.subtitle}</td>
                                    <td className="p-4 font-bold text-amber-600">{svc.price}</td>
                                    <td className="p-4">{svc.isPopular ? <span className="bg-red-100 text-red-700 font-bold px-2 py-1 rounded text-xs">Hot</span> : ''}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => openServiceModal(svc)} className="bg-amber-500 text-white px-3 py-1.5 rounded hover:bg-amber-600 text-sm">Sửa</button>
                                        <button onClick={() => deleteService(svc.id)} className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 text-sm">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ========================================== */}
            {/* MODAL: SẢN PHẨM */}
            {/* ========================================== */}
            {isProductModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-bold mb-4 text-blue-900">{productForm.id ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
                        <form onSubmit={handleProductSubmit} className="space-y-4">
                            <div><label className="block text-sm font-bold mb-1">Tên sản phẩm *</label><input required type="text" value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                            <div><label className="block text-sm font-bold mb-1">Giá (VD: 120.000đ) *</label><input required type="text" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Link Ảnh (URL) *</label>
                                <input required type="url" value={productForm.img} onChange={(e) => setProductForm({...productForm, img: e.target.value})} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                {productForm.img && <img src={productForm.img} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-lg border shadow-sm" />}
                            </div>
                            <div><label className="block text-sm font-bold mb-1">Tag (Không bắt buộc)</label><input type="text" placeholder="VD: Bán chạy..." value={productForm.tag || ''} onChange={(e) => setProductForm({...productForm, tag: e.target.value})} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsProductModalOpen(false)} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Hủy</button>
                                <button type="submit" disabled={isLoading} className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50">{isLoading ? 'Đang lưu...' : 'Lưu sản phẩm'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================== */}
            {/* MODAL: DỊCH VỤ */}
            {/* ========================================== */}
            {isServiceModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-bold mb-4 text-amber-600">{serviceForm.id ? 'Sửa Gói Dịch Vụ' : 'Thêm Gói Dịch Vụ Mới'}</h2>
                        <form onSubmit={handleServiceSubmit} className="space-y-4">
                            <div><label className="block text-sm font-bold mb-1">Tên gói *</label><input required placeholder="VD: Gói Tiêu Chuẩn" value={serviceForm.name} onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" /></div>
                            <div><label className="block text-sm font-bold mb-1">Mô tả ngắn *</label><input required placeholder="VD: Đẹp, gọn gàng..." value={serviceForm.subtitle} onChange={(e) => setServiceForm({...serviceForm, subtitle: e.target.value})} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" /></div>
                            <div><label className="block text-sm font-bold mb-1">Giá *</label><input required placeholder="VD: Từ 50.000đ" value={serviceForm.price} onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" /></div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Quyền lợi (Mỗi dòng 1 mục) *</label>
                                <textarea required rows={4} placeholder="Giấy gói họa tiết&#10;Ruy băng lụa..." value={serviceForm.features} onChange={(e) => setServiceForm({...serviceForm, features: e.target.value})} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer mt-2 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                <input type="checkbox" checked={serviceForm.isPopular} onChange={(e) => setServiceForm({...serviceForm, isPopular: e.target.checked})} className="w-5 h-5 accent-amber-600 rounded" />
                                <span className="font-bold text-amber-800">Đánh dấu là gói nổi bật (Hot)</span>
                            </label>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsServiceModalOpen(false)} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Hủy</button>
                                <button type="submit" disabled={isLoading} className="px-5 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 disabled:opacity-50">{isLoading ? 'Đang lưu...' : 'Lưu gói dịch vụ'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}