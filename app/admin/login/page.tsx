'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push('/admin'); // Chuyển hướng vào trang quản lý
            router.refresh(); // Làm mới lại trạng thái
        } else {
            setError('Mật khẩu không đúng. Thử lại nhé!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Đăng Nhập Admin</h1>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu bí mật..."
                    className="w-full border p-3 rounded mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button type="submit" className="w-full bg-black text-white p-3 rounded font-bold hover:bg-gray-800">
                    Vào Trang Quản Trị
                </button>
            </form>
        </div>
    );
}