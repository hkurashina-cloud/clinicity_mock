import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menu,
    Plus,
    Grid3X3,
    Clapperboard,
    Heart,
    Calendar,
    Clock,
    MapPin,
    ChevronRight
} from 'lucide-react';

// --- Types ---
type TabType = 'posts' | 'reels' | 'doctors' | 'reservations' | 'history';

type Doctor = {
    id: number;
    name: string;
    role: string;
    clinic: string;
    image: string;
};

type Reservation = {
    id: number;
    date: string;
    time: string;
    clinicName: string;
    area: string;
    menu: string;
    price: string;
    image: string;
    doctorName?: string;
};

type HistoryItem = {
    id: number;
    date: string;
    clinicName: string;
    menu: string;
    price: string;
    image: string;
    rating?: number;
};

// --- Mock Data ---
const userData = {
    username: 'ayaka_beauty',
    displayName: '田中 綾香',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: '美容クリニック巡りが趣味です\n最新の美容医療についてシェアしていきます',
    postsCount: 128,
    followersCount: '1.2万',
    followingCount: 245,
};

// Grid images for posts tab
const postImages = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    image: `/images/skin/${String(i % 16).padStart(2, '0')}1.webp`,
    likes: Math.floor(Math.random() * 500) + 50,
}));

// Reels/Videos data
const reelsData = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    thumbnail: `/images/skin/${String(i % 16).padStart(2, '0')}2.webp`,
    views: `${Math.floor(Math.random() * 50) + 10}K`,
}));

// Favorite doctors
const favoriteDoctors: Doctor[] = [
    {
        id: 1,
        name: '田中 美咲',
        role: '院長 / 皮膚科専門医',
        clinic: 'Dress 表参道',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80',
    },
    {
        id: 2,
        name: '佐藤 健一',
        role: '副院長 / 形成外科医',
        clinic: 'Beauty Clinic 銀座',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80',
    },
    {
        id: 3,
        name: '山田 優子',
        role: '美容皮膚科医',
        clinic: 'Skin Lab 渋谷',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80',
    },
    {
        id: 4,
        name: '鈴木 太郎',
        role: '美容外科医',
        clinic: 'Tokyo Beauty 新宿',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80',
    },
];

// Current reservations
const reservations: Reservation[] = [
    {
        id: 1,
        date: '2026年 2月 10日 (火)',
        time: '14:00',
        clinicName: 'Dress 表参道',
        area: '表参道駅 徒歩3分',
        menu: 'ダーマペン4 全顔',
        price: '¥25,000',
        image: '/images/skin/001.webp',
        doctorName: '田中 美咲',
    },
    {
        id: 2,
        date: '2026年 2月 25日 (木)',
        time: '11:30',
        clinicName: 'White Dental 銀座',
        area: '銀座駅 徒歩5分',
        menu: 'オフィスホワイトニング',
        price: '¥15,000',
        image: '/images/skin/021.webp',
    },
];

// Visit history
const visitHistory: HistoryItem[] = [
    {
        id: 1,
        date: '2026年 1月 15日',
        clinicName: 'Dress 表参道',
        menu: 'ピコレーザー シミ取り',
        price: '¥18,000',
        image: '/images/skin/031.webp',
        rating: 5,
    },
    {
        id: 2,
        date: '2025年 12月 20日',
        clinicName: 'Beauty Clinic 銀座',
        menu: 'ヒアルロン酸注入 (涙袋)',
        price: '¥45,000',
        image: '/images/skin/041.webp',
        rating: 4,
    },
    {
        id: 3,
        date: '2025年 11月 8日',
        clinicName: 'Skin Lab 渋谷',
        menu: 'ケミカルピーリング',
        price: '¥8,000',
        image: '/images/skin/051.webp',
        rating: 5,
    },
    {
        id: 4,
        date: '2025年 10月 3日',
        clinicName: 'Tokyo Beauty 新宿',
        menu: 'ボトックス注射 (額)',
        price: '¥35,000',
        image: '/images/skin/061.webp',
        rating: 4,
    },
];

// --- Component ---
function MyPageScreen() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('posts');

    const tabs: { key: TabType; icon: React.ReactNode; label: string }[] = [
        { key: 'posts', icon: <Grid3X3 size={22} />, label: '投稿' },
        { key: 'reels', icon: <Clapperboard size={22} />, label: '動画' },
        { key: 'doctors', icon: <Heart size={22} />, label: 'お気に入り' },
        { key: 'reservations', icon: <Calendar size={22} />, label: '予約' },
        { key: 'history', icon: <Clock size={22} />, label: '履歴' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'posts':
                return (
                    <div className="grid grid-cols-3 gap-0.5">
                        {postImages.map((post) => (
                            <div key={post.id} className="aspect-square bg-gray-100 relative group cursor-pointer">
                                <img
                                    src={post.image}
                                    alt={`post-${post.id}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-bold text-sm flex items-center gap-1">
                                        <Heart size={16} fill="white" /> {post.likes}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'reels':
                return (
                    <div className="grid grid-cols-3 gap-0.5">
                        {reelsData.map((reel) => (
                            <div key={reel.id} className="aspect-[9/16] bg-gray-100 relative cursor-pointer">
                                <img
                                    src={reel.thumbnail}
                                    alt={`reel-${reel.id}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs font-bold drop-shadow-lg">
                                    <Clapperboard size={12} />
                                    {reel.views}
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'doctors':
                return (
                    <div className="p-4 space-y-3">
                        {favoriteDoctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                onClick={() => navigate(`/doctor/${doctor.id}`, { state: { doctor } })}
                                className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                            >
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 shrink-0">
                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 text-sm mb-0.5">{doctor.name}</h3>
                                    <p className="text-xs text-gray-500 mb-1">{doctor.role}</p>
                                    <p className="text-xs text-blue-500 truncate">{doctor.clinic}</p>
                                </div>
                                <ChevronRight size={20} className="text-gray-300 shrink-0" />
                            </div>
                        ))}
                    </div>
                );

            case 'reservations':
                return (
                    <div className="p-4 space-y-4">
                        {reservations.length === 0 ? (
                            <div className="text-center py-12 text-gray-400">
                                <Calendar size={48} className="mx-auto mb-3 opacity-50" />
                                <p className="text-sm">予約はありません</p>
                            </div>
                        ) : (
                            reservations.map((res) => (
                                <div
                                    key={res.id}
                                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
                                >
                                    <div className="p-4 flex gap-4">
                                        <div className="w-20 h-20 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
                                            <img
                                                src={res.image}
                                                alt={res.clinicName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-1">
                                                <h3 className="font-bold text-gray-900 text-sm truncate">{res.clinicName}</h3>
                                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold shrink-0 ml-2">
                                                    予約確定
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                                                <Calendar size={12} />
                                                <span className="font-medium">{res.date} {res.time}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                                                <MapPin size={12} />
                                                <span>{res.area}</span>
                                            </div>
                                            <p className="text-xs text-gray-600 truncate mb-1">{res.menu}</p>
                                            {res.doctorName && (
                                                <p className="text-xs text-blue-500">担当: {res.doctorName}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="px-4 pb-4 flex gap-2">
                                        <button className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-200 transition-colors">
                                            キャンセル
                                        </button>
                                        <button className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl text-xs shadow-md">
                                            詳細を見る
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                );

            case 'history':
                return (
                    <div className="p-4 space-y-3">
                        {visitHistory.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 shadow-sm"
                            >
                                <div className="w-16 h-16 rounded-xl bg-gray-100 shrink-0 overflow-hidden opacity-80">
                                    <img
                                        src={item.image}
                                        alt={item.clinicName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="font-bold text-gray-900 text-sm truncate">{item.clinicName}</h3>
                                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0 ml-2">
                                            施術完了
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-1">{item.date}</p>
                                    <p className="text-xs text-gray-600 truncate mb-1">{item.menu}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-gray-800">{item.price}</span>
                                        {item.rating && (
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`text-xs ${i < item.rating! ? 'text-yellow-400' : 'text-gray-200'}`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {visitHistory.length > 0 && (
                            <button className="w-full py-3 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                                もっと見る
                            </button>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-white pb-24 font-sans">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100 h-12 flex items-center justify-between px-4">
                <button className="p-2 -ml-2 text-gray-800 active:bg-gray-100 rounded-lg transition-colors">
                    <Menu size={24} />
                </button>
                <h1 className="font-bold text-gray-900 text-base">{userData.username}</h1>
                <button className="p-2 -mr-2 text-gray-800 active:bg-gray-100 rounded-lg transition-colors">
                    <Plus size={24} />
                </button>
            </header>

            {/* Profile Header Section */}
            <section className="px-4 py-5">
                <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="shrink-0">
                        <div className="w-20 h-20 rounded-full border-2 border-gray-200 p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
                            <img
                                src={userData.avatar}
                                alt={userData.displayName}
                                className="w-full h-full rounded-full object-cover border-2 border-white"
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex-1 flex justify-around items-center pt-2">
                        <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{userData.postsCount}</div>
                            <div className="text-xs text-gray-500">投稿</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{userData.followersCount}</div>
                            <div className="text-xs text-gray-500">フォロワー</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{userData.followingCount}</div>
                            <div className="text-xs text-gray-500">フォロー中</div>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <div className="mt-4">
                    <h2 className="font-bold text-gray-900 text-sm">{userData.displayName}</h2>
                    <p className="text-sm text-gray-700 mt-1 whitespace-pre-line leading-relaxed">
                        {userData.bio}
                    </p>
                </div>

                {/* Edit Profile Button */}
                <button
                    onClick={() => navigate('/mypage/edit')}
                    className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-sm rounded-lg transition-colors"
                >
                    プロフィールを編集
                </button>
            </section>

            {/* Tab Navigation (5 Tabs with Icons) */}
            <nav className="sticky top-12 z-40 bg-white border-b border-gray-100">
                <div className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 py-3 flex items-center justify-center transition-colors relative ${
                                activeTab === tab.key
                                    ? 'text-gray-900'
                                    : 'text-gray-400 hover:text-gray-600'
                            }`}
                            title={tab.label}
                        >
                            {tab.icon}
                            {activeTab === tab.key && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                            )}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Tab Content */}
            <main className="animate-fade-in">
                {renderTabContent()}
            </main>
        </div>
    );
}

export default MyPageScreen;
