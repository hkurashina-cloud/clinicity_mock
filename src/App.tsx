import React, { useState } from 'react';
import {
  Search,
  PenTool,
  Calendar,
  Bell,
  User
} from 'lucide-react';
import HomeScreen from './components/HomeScreen';
import DesignScreen from './components/DesignScreen';
import ReservationScreen from './components/ReservationScreen';
import NotificationScreen from './components/NotificationScreen';
import MyPageScreen from './components/MyPageScreen';

function App() {
  const [activeNavTab, setActiveNavTab] = useState<'search' | 'design' | 'reservation' | 'notification' | 'mypage'>('search');

  return (
    <div className="bg-white min-h-screen">

      {/* Main Content Area */}
      <div className="min-h-screen pb-20">
        {activeNavTab === 'search' && <HomeScreen />}
        {activeNavTab === 'design' && <DesignScreen />}
        {activeNavTab === 'reservation' && <ReservationScreen onNavigateToSearch={() => setActiveNavTab('search')} />}
        {activeNavTab === 'notification' && <NotificationScreen onNavigateToSearch={() => setActiveNavTab('search')} />}
        {activeNavTab === 'mypage' && <MyPageScreen />}
      </div>

      {/* 4. Bottom Navigation (Fixed Footer) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe px-6 pt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50 rounded-t-2xl">
        <div className="flex justify-between items-center pb-2">
          <NavButton
            icon={<Search size={24} strokeWidth={2.5} />}
            label="さがす"
            isActive={activeNavTab === 'search'}
            onClick={() => setActiveNavTab('search')}
          />
          <NavButton
            icon={<PenTool size={24} />}
            label="症例"
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
    </div>
  );
}

// Helper Component for Navigation Buttons
const NavButton = ({ icon, label, isActive = false, onClick }: { icon: React.ReactNode, label: string, isActive?: boolean, onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 min-w-[64px] group"
    >
      <div className={`transition-all duration-300 ${isActive ? 'text-primary -translate-y-1' : 'text-gray-400 group-hover:text-gray-600'}`}>
        {isActive ? (
          <div className="text-transparent bg-clip-text bg-accent-gradient [&>svg]:stroke-[url(#gradient)] filter drop-shadow-sm">
            <span style={{ color: isActive ? '#0072FF' : 'inherit' }}>{icon}</span>
          </div>
        ) : (
          icon
        )}
      </div>
      <span className={`text-[10px] font-bold tracking-wide ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
        {label}
      </span>
    </button>
  );
};

export default App;
