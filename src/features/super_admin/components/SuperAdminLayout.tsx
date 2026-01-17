import React, { useState } from 'react';
import {
    LayoutDashboard,
    Building2,
    Briefcase,
    Users,
    Settings,
    LogOut,
    Bell,
    Menu
} from 'lucide-react';

interface SuperAdminLayoutProps {
    children: React.ReactNode;
    onLogout?: () => void;
    currentPath: string;
    onNavigate: (path: string) => void;
}

export default function SuperAdminLayout({ children, onLogout, currentPath, onNavigate }: SuperAdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
        { id: 'clinics', label: 'クリニック管理', icon: Building2 },
        { id: 'agencies', label: '代理店管理', icon: Briefcase },
        { id: 'users', label: 'ユーザー管理', icon: Users },
        { id: 'settings', label: '設定', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Responsive */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col shadow-xl transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <span className="text-xl font-bold tracking-wider text-blue-400">SUPER ADMIN</span>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                onNavigate(item.id);
                                setIsSidebarOpen(false); // Close on mobile navigation
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${currentPath === item.id
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        ログアウト
                    </button>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="md:pl-64 transition-all duration-300 flex flex-col min-h-screen">
                {/* Header */}
                <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Button (Mobile Only) */}
                        <button
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <Menu size={24} />
                        </button>

                        <h2 className="text-lg md:text-xl font-bold text-gray-800 truncate">
                            {menuItems.find(i => i.id === currentPath)?.label}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-gray-100">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-bold text-gray-800">運営管理者</span>
                                <span className="text-xs text-gray-500">Super Admin</span>
                            </div>
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold border-2 border-slate-100 shadow-sm text-xs md:text-sm">
                                OP
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Body */}
                <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
