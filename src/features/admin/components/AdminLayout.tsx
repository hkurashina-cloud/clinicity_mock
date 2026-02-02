import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Menu,
  X
} from 'lucide-react';

// メニューの設定：ここに行き先（path）を書きます
const MENU_ITEMS = [
  { label: 'ダッシュボード', path: '/admin', icon: <LayoutDashboard size={20} /> },
  { label: '予約管理', path: '/admin/calendar', icon: <CalendarDays size={20} /> }, // ★ここへのリンク
  // 必要に応じて追加
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ページ移動するための道具箱
  const navigate = useNavigate();
  // 今のURLを知るための道具
  const location = useLocation();

  // ボタンが押された時の処理
  const handleNavigation = (path: string) => {
    navigate(path);          // ① 指定されたURLへ移動！
    setIsSidebarOpen(false); // ② スマホならメニューを閉じる
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* --- スマホ用ハンバーガーボタン --- */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-sm border border-gray-200"
      >
        <Menu size={24} className="text-gray-700" />
      </button>

      {/* --- サイドバー --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-screen lg:overflow-y-auto
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 justify-between">
          <span className="text-xl font-bold text-blue-600">Dress Admin</span>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {MENU_ITEMS.map((item) => {
            // 今開いているページかどうか判定（色を変えるため）
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)} // ★クリックで移動実行
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                  ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
                `}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* --- メインコンテンツ --- */}
      <main className="flex-1 overflow-auto h-screen">
        {/* ★ここが一番大事！
           App.tsxで挟んだ中身（DashboardScreenやReservationListScreen）が
           この {children} の場所に表示されます。
        */}
        {children}
      </main>

      {/* スマホ用黒背景オーバーレイ */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
