import React, { useState } from 'react';
import {
    MapPin, Calendar, Clock, ChevronLeft, Star,
    CreditCard, User, Shield, Phone, Share, CheckCircle, ChevronRight
} from 'lucide-react';

// --- Types ---
type ShopDetailData = {
    id: number;
    name: string;
    description: string;
    website: string;
    stats: {
        posts: number;
        followers: string;
        score: number;
    };
    images: string[];
    avatar: string;
    menus: MenuIem[];
    cases: string[];
    features: string[];
    info: {
        address: string;
        hours: string;
        phone: string;
    };
};

type MenuIem = {
    id: number;
    name: string;
    description: string;
    price: string;
    time: string;
    image: string;
    isRecommended?: boolean;
};

// --- Mock Data ---
const generateMockImages = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
        const imgSetIndex = Math.floor(Math.random() * 16);
        const prefix = String(imgSetIndex).padStart(2, '0');
        const suffix = (i % 3) + 1; // 1, 2, 3
        return `/images/skin/${prefix}${suffix}.webp`;
    });
};

const MOCK_SHOP_DETAIL: ShopDetailData = {
    id: 1,
    name: "Clinicity 渋谷本院",
    description: "【皮膚科専門医監修】肌質改善・美肌治療に特化したクリニック。丁寧なカウンセリングと最新機器で、あなた本来の美しさを引き出します。",
    website: "https://clinicity.jp",
    stats: {
        posts: 128,
        followers: "1.2万",
        score: 4.8
    },
    images: generateMockImages(5),
    avatar: "/images/skin/001.webp", // Using a specific local image for consistency or derived
    menus: [
        {
            id: 1,
            name: "【初回限定】ハイドラフェイシャル全顔",
            description: "毛穴の黒ずみ・角栓を徹底洗浄。美容液導入でモチモチ肌へ。",
            price: "¥9,800",
            time: "60分",
            image: "/images/skin/002.webp",
            isRecommended: true
        },
        {
            id: 2,
            name: "ピコレーザートーニング",
            description: "シミ・肝斑を薄くし、透明感のある肌へ導きます。",
            price: "¥12,000",
            time: "45分",
            image: "/images/skin/003.webp"
        },
        {
            id: 3,
            name: "ダーマペン4（全顔）",
            description: "ニキビ跡・クレーター・毛穴の開き改善に。",
            price: "¥19,800",
            time: "90分",
            image: "/images/skin/011.webp"
        },
        {
            id: 4,
            name: "ボツリヌストキシン注入（エラ）",
            description: "小顔効果・食いしばり改善。アラガン社製製剤使用。",
            price: "¥33,000",
            time: "30分",
            image: "/images/skin/023.webp"
        }
    ],
    cases: generateMockImages(9),
    features: ["個室あり", "カードOK", "女性医師", "駅近", "メイク室", "夜20時迄"],
    info: {
        address: "東京都渋谷区宇田川町1-1 渋谷ハイツ2F",
        hours: "10:00 - 20:00 (最終受付 19:00)",
        phone: "03-1234-5678"
    }
};

// --- Components ---

export default function ShopDetailScreen({ shopId, onBack }: { shopId: number; onBack: () => void }) {
    const [activeTab, setActiveTab] = useState('トップ');
    const tabs = ['トップ', '投稿', 'メニュー', 'サロン', 'レビュー'];

    // Random Availability Generator
    const availability = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        const day = date.getDate();
        const weekDay = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
        const status = ['◎', '◎', '△', '×', 'ー'][Math.floor(Math.random() * 5)];
        return { day, weekDay, status };
    });

    return (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fade-in font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 h-14 flex items-center justify-between">
                <button onClick={onBack} className="p-2 -ml-2 text-gray-700 active:scale-95 transition-transform">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex-1 text-center font-bold text-gray-900 truncate px-4">
                    {MOCK_SHOP_DETAIL.name}
                </div>
                <button className="p-2 -mr-2 text-gray-700 active:scale-95 transition-transform">
                    <Share size={20} />
                </button>
            </header>

            {/* A. Profile Section */}
            <section className="px-5 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-blue-500 to-cyan-400">
                            <img
                                src={MOCK_SHOP_DETAIL.avatar}
                                alt="avatar"
                                className="w-full h-full rounded-full object-cover border-2 border-white"
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex-1 flex justify-around pl-4">
                        <div className="text-center">
                            <div className="font-bold text-lg text-gray-900">{MOCK_SHOP_DETAIL.stats.posts}</div>
                            <div className="text-xs text-gray-500 font-medium">投稿</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-lg text-gray-900">{MOCK_SHOP_DETAIL.stats.followers}</div>
                            <div className="text-xs text-gray-500 font-medium">フォロワー</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-lg text-gray-900 flex items-center justify-center gap-0.5">
                                {MOCK_SHOP_DETAIL.stats.score}
                                <Star size={12} className="fill-orange-400 text-orange-400" />
                            </div>
                            <div className="text-xs text-gray-500 font-medium">スコア</div>
                        </div>
                    </div>
                </div>

                {/* Text Info */}
                <div className="space-y-1">
                    <h1 className="font-bold text-gray-900">{MOCK_SHOP_DETAIL.name}</h1>
                    <p className="text-xs text-gray-500">{MOCK_SHOP_DETAIL.info.address}</p>
                    <p className="text-sm text-gray-700 leading-relaxed pt-1">
                        {MOCK_SHOP_DETAIL.description}
                    </p>
                    <a href={MOCK_SHOP_DETAIL.website} className="text-sm text-blue-600 font-medium break-all block truncate">
                        {MOCK_SHOP_DETAIL.website}
                    </a>
                </div>
            </section>

            {/* Sticky Tabs */}
            <div className="sticky top-14 z-40 bg-white border-b border-gray-100 shadow-sm">
                <div className="flex justify-between px-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-3 text-sm font-bold relative transition-colors px-2 ${activeTab === tab ? 'text-blue-600' : 'text-gray-400'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* B. Availability (Calendar) */}
            <section className="py-6 border-b border-gray-50">
                <div className="px-4 mb-3 flex items-center justify-between">
                    <h2 className="font-bold text-gray-900 text-sm">空き状況</h2>
                    <span className="text-xs text-blue-600 font-medium">カレンダーを見る</span>
                </div>
                <div className="flex overflow-x-auto px-4 pb-2 gap-3 no-scrollbar">
                    {availability.map((item, idx) => (
                        <div key={idx} className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-2xl border ${idx === 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                            <span className={`text-xs font-bold mb-1 ${idx === 1 ? 'text-blue-600' : 'text-gray-500'}`}>{item.weekDay}</span>
                            <span className={`text-sm font-bold ${idx === 1 ? 'text-blue-700' : 'text-gray-900'}`}>{item.day}</span>
                            <span className={`text-[10px] mt-1 font-bold ${item.status === '◎' ? 'text-blue-500' : item.status === '△' ? 'text-orange-400' : 'text-gray-300'}`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* C. Recommended & Cases */}
            <section className="py-6 border-b border-gray-50">
                {/* Recommended Menu */}
                <div className="px-4 mb-6">
                    <h2 className="font-bold text-gray-900 text-sm mb-3">おすすめメニュー</h2>
                    {MOCK_SHOP_DETAIL.menus.filter(m => m.isRecommended).map(menu => (
                        <div key={menu.id} className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                            <div className="h-32 bg-gray-200">
                                <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4 bg-white">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{menu.name}</h3>
                                    <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                        人気
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} /> {menu.time}
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold text-blue-600 font-mono">{menu.price}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cases Grid */}
                <div className="px-0">
                    <div className="px-4 mb-3 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900 text-sm">症例写真</h2>
                        <span className="text-xs text-gray-400 font-medium">{MOCK_SHOP_DETAIL.stats.posts}件</span>
                    </div>
                    <div className="grid grid-cols-3 gap-0.5">
                        {MOCK_SHOP_DETAIL.cases.map((img, idx) => (
                            <div key={idx} className="aspect-square relative bg-gray-100">
                                <img src={img} alt="case" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* D. Menu List */}
            <section className="py-6 border-b border-gray-50 bg-gray-50/50">
                <div className="px-4 mb-3">
                    <h2 className="font-bold text-gray-900 text-sm">メニュー</h2>
                </div>
                <div className="space-y-3 px-4">
                    {MOCK_SHOP_DETAIL.menus.filter(m => !m.isRecommended).map(menu => (
                        <div key={menu.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex gap-3">
                            <div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0">
                                <img src={menu.image} alt={menu.name} className="w-full h-full object-cover rounded-lg" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-0.5">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm mb-1">{menu.name}</h3>
                                    <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">{menu.description}</p>
                                </div>
                                <div className="flex items-end justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-blue-600 font-mono">{menu.price}</span>
                                        <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Clock size={10} /> {menu.time}</span>
                                    </div>
                                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-1.5 rounded-full transition-colors">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* E. Clinic Info */}
            <section className="py-6 px-4">
                <h2 className="font-bold text-gray-900 text-sm mb-4">サロン情報</h2>

                {/* Feature Icons */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {MOCK_SHOP_DETAIL.features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                <CheckCircle size={18} />
                            </div>
                            <span className="text-[10px] font-medium text-gray-600 text-center leading-tight">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Info List */}
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-gray-400 mt-0.5" />
                        <div className="text-xs text-gray-600 leading-relaxed">
                            {MOCK_SHOP_DETAIL.info.address}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Clock size={18} className="text-gray-400 mt-0.5" />
                        <div className="text-xs text-gray-600 leading-relaxed">
                            {MOCK_SHOP_DETAIL.info.hours}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Phone size={18} className="text-gray-400 mt-0.5" />
                        <div className="text-xs text-gray-600 leading-relaxed">
                            {MOCK_SHOP_DETAIL.info.phone}
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-6 w-full h-40 bg-gray-100 rounded-xl relative flex items-center justify-center text-gray-400 text-xs">
                    <MapPin size={32} className="mb-1" />
                    <span>Map Preview</span>
                </div>
            </section>

            {/* F. Fixed Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-50">
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <Calendar size={18} />
                    今すぐ予約する
                </button>
            </div>
        </div>
    );
}
