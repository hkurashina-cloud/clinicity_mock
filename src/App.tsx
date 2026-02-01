import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {
  Search,
  PenTool,
  Calendar,
  Bell,
  User,
} from 'lucide-react';

// ================================
// ユーザー側の画面たち
// ================================
import ShopDetailScreen from './features/user/ShopDetailScreen';
import HomeScreen from './features/user/HomeScreen';
import DesignScreen from './features/user/DesignScreen';
import ReservationScreen from './features/user/ReservationScreen';
import NotificationScreen from './features/user/NotificationScreen';
import MyPageScreen from './features/user/MyPageScreen';
import ReservationFlowScreen from './features/user/ReservationFlowScreen';
import ReservationCompleteScreen from './features/user/ReservationCompleteScreen';
import ChatRoomScreen from './features/user/ChatRoomScreen';

// ================================
// 管理画面 (Admin) の画面たち
// ================================
import DashboardScreen from './features/admin/DashboardScreen';
import ReservationListScreen from './features/admin/ReservationListScreen';
import AdminLayout from './features/admin/components/AdminLayout';

// ================================
// ユーザー側のメインコンポーネント
// (タブ切り替えのロジックなど)
// ================================
const UserAppShell: React.FC = () => {
  const location = useLocation();
  const [activeNavTab, setActiveNavTab] = useState<
    'search' | 'design' | 'reservation' | 'notification' | 'mypage'
  >('search');
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);

  // Handle navigation state for tab switching
  useEffect(() => {
    const state = location.state as { tab?: string } | null;
    if (state?.tab === 'search') {
      setActiveNavTab('search');
    } else if (state?.tab === 'reservation') {
      setActiveNavTab('reservation');
    }
    // Clear the state after reading to prevent re-triggering on refresh
    if (state?.tab) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="bg-white min-h-screen">
      {/* Main Content Area */}
      <div className="min-h-screen pb-20">
        {activeNavTab === 'search' && (
          <HomeScreen
            onEnterAdminMode={() => {}} // もうURLで移動するので不要だが型合わせのため残す
            onShopClick={(id) => setSelectedShopId(id)}
          />
        )}
        {activeNavTab === 'design' && (
          <DesignScreen onShopClick={(id) => setSelectedShopId(id)} />
        )}
        {activeNavTab === 'reservation' && (
          <ReservationScreen
            onNavigateToSearch={() => setActiveNavTab('search')}
          />
        )}
        {activeNavTab === 'notification' && (
          <NotificationScreen
            onNavigateToSearch={() => setActiveNavTab('search')}
          />
        )}
        {activeNavTab === 'mypage' && <MyPageScreen />}
      </div>

      {/* Bottom Navigation (Fixed Footer) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe px-6 pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50">
        <div className="flex justify-between items-center pb-2">
          <NavButton
            icon={<Search size={24} strokeWidth={2.5} />}
            label="さがす"
            isActive={activeNavTab === 'search'}
            onClick={() => setActiveNavTab('search')}
          />
          <NavButton
            icon={<PenTool size={24} />}
            label="投稿"
            isActive={activeNavTab === 'design'}
            onClick={() => setActiveNavTab('design')}
          />
          <NavButton
            icon={<Calendar size={24} />}
            label="予約"
            isActive={activeNavTab === 'reservation'}
            onClick={() => setActiveNavTab('reservation')}
          />
          <NavButton
            icon={<Bell size={24} />}
            label="お知らせ"
            isActive={activeNavTab === 'notification'}
            onClick={() => setActiveNavTab('notification')}
          />
          <NavButton
            icon={<User size={24} />}
            label="マイページ"
            isActive={activeNavTab === 'mypage'}
            onClick={() => setActiveNavTab('mypage')}
          />
        </div>
      </footer>

      {/* Shop Detail Screen Overlay */}
      {selectedShopId !== null && (
        <ShopDetailScreen
          shopId={selectedShopId}
          onBack={() => setSelectedShopId(null)}
        />
      )}
    </div>
  );
};

// ================================
// ナビゲーションボタン (共通パーツ)
// ================================
type NavButtonProps = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

const NavButton: React.FC<NavButtonProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 min-w-[64px] group"
    >
      <div
        className={`transition-all duration-300 ${
          isActive
            ? 'text-blue-500 -translate-y-1'
            : 'text-gray-400 group-hover:text-gray-600'
        }`}
      >
        {isActive ? <div className="filter drop-shadow-sm">{icon}</div> : icon}
      </div>
      <span
        className={`text-[10px] font-bold tracking-wide ${
          isActive ? 'text-gray-900' : 'text-gray-400'
        }`}
      >
        {label}
      </span>
    </button>
  );
};

// ================================
// ルーティングの定義 (エントリーポイント)
// ================================
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================================
          ★ 管理画面 (Admin) の設定
          =========================================
        */}

        {/* ① ダッシュボード ( http://localhost:5173/admin ) */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              {/* ここにあるのが children です */}
              <DashboardScreen />
            </AdminLayout>
          }
        />

        {/* ② 予約管理カレンダー ( http://localhost:5173/admin/calendar ) */}
        <Route
          path="/admin/calendar"
          element={
            <AdminLayout>
              {/* URL が /admin/calendar の時は、中身がこれに入れ替わります */}
              <ReservationListScreen />
            </AdminLayout>
          }
        />

        {/* 今後ページを増やす時はここに追加していくだけ！ */}
        {/* <Route path="/admin/store" element={<AdminLayout><StoreEditScreen /></AdminLayout>} /> */}

        {/* =========================================
          ★ 予約フロー画面（独立レイアウト）
          =========================================
        */}
        <Route path="/reserve" element={<ReservationFlowScreen />} />
        <Route path="/reserve/complete" element={<ReservationCompleteScreen />} />
        <Route path="/message/:id" element={<ChatRoomScreen />} />

        {/* =========================================
          ★ ユーザー画面 (User) の設定
          =========================================
        */}
        <Route path="/*" element={<UserAppShell />} />
        {/* ※ UserAppShell を別ファイルに出した場合は import して使う */}
      </Routes>
    </BrowserRouter>
  );
}

// Fast Refresh 用のルールをこの行だけ無効化して、エラー表示を避ける
// eslint-disable-next-line react-refresh/only-export-components
export default App;