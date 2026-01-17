import React, { useState } from 'react';
import {
    LayoutDashboard,
    Store,
    Calendar,
    Settings,
    Menu,
    X
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    onExitAdminMode?: () => void;
    currentPath: 'dashboard' | 'store_edit' | 'reservation' | 'settings';
    onNavigate: (path: 'dashboard' | 'store_edit' | 'reservation' | 'settings') => void;
}

export default function AdminLayout({ children, onExitAdminMode, currentPath, onNavigate }: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    const handleNavigation = (path: 'dashboard' | 'store_edit' | 'reservation' | 'settings') => {
        onNavigate(path);
        closeSidebar();
    };

    return (
        <div className="flex bg-gray-50 font-sans text-slate-800 h-screen overflow-hidden">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:relative inset-y-0 left-0 z-50
                    w-64 bg-white border-r border-gray-200 flex flex-col shrink-0
                    transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
                    <div
                        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer"
                        onClick={onExitAdminMode}
                    >
                        Clinicity Admin
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={closeSidebar}
                        className="md:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    <NavItem
                        icon={<LayoutDashboard size={20} />}
                        label="ダッシュボード"
                        active={currentPath === 'dashboard'}
                        onClick={() => handleNavigation('dashboard')}
                    />
                    <NavItem
                        icon={<Store size={20} />}
                        label="店舗情報"
                        active={currentPath === 'store_edit'}
                        onClick={() => handleNavigation('store_edit')}
                    />
                    <NavItem
                        icon={<Calendar size={20} />}
                        label="予約管理"
                        active={currentPath === 'reservation'}
                        onClick={() => handleNavigation('reservation')}
                    />
                    <NavItem
                        icon={<Settings size={20} />}
                        label="設定"
                        active={currentPath === 'settings'}
                        onClick={() => handleNavigation('settings')}
                    />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden">
                            {/* Mock Avatar for Admin User */}
                            <img src="/avatar.jpg" alt="Admin" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/40')} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-700">Owner User</p>
                            <p className="text-xs text-gray-400">管理者</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
                {/* Mobile Header */}
                <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 md:hidden shrink-0 z-30">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-lg text-gray-800 ml-2">Clinicity Admin</span>
                </header>

                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

// --- Sub Components ---

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
            ? "bg-blue-50 text-blue-700 font-bold"
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
    >
        {icon}
        {label}
    </button>
);
