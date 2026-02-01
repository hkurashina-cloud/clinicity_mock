import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    Clock,
    ChevronLeft,
    Star,
    Share,
} from 'lucide-react';

// ▼ タブ用コンポーネント
import ShopPostsTab from './components/ShopPostTab';
import ShopMenuTab from './components/shop_tabs/ShopMenuTab';
import ShopSalonInfoTab from './components/shop_tabs/ShopSalonInfoTab';
import ShopReviewsTab from './components/shop_tabs/ShopReviewsTab';

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
    avatar: string;
    menus: MenuIem[];
    cases: string[];
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

type DoctorData = {
    id: number;
    name: string;
    jobTitle: string;
    avatar: string;
    specialties: string[];
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

const MOCK_SHOPS_DATA: ShopDetailData[] = [
    {
        id: 1,
        name: "Clinicity 渋谷本院",
        description: "【皮膚科専門医監修】肌質改善・美肌治療に特化したクリニック。丁寧なカウンセリングと最新機器で、あなた本来の美しさを引き出します。",
        website: "https://clinicity.jp",
        stats: { posts: 128, followers: "1.2万", score: 4.8 },
        avatar: "/images/skin/001.webp",
        menus: [
            { id: 1, name: "【初回限定】ハイドラフェイシャル全顔", description: "毛穴の黒ずみ・角栓を徹底洗浄。", price: "¥9,800", time: "60分", image: "/images/skin/002.webp", isRecommended: true },
            { id: 2, name: "ピコレーザートーニング", description: "シミ・肝斑を薄くし透明感へ。", price: "¥12,000", time: "45分", image: "/images/skin/003.webp", isRecommended: true },
        ],
        cases: generateMockImages(6),
        info: { address: "東京都渋谷区宇田川町1-1 渋谷ハイツ2F", hours: "10:00 - 20:00", phone: "03-1234-5678" }
    },
    {
        id: 2,
        name: "表参道ラグジュアリースキン",
        description: "完全個室のプライベート空間。芸能人も通う最高級のアンチエイジング治療を提供します。痛みの少ない最新ハイフ導入店。",
        website: "https://omotesando-skin.jp",
        stats: { posts: 342, followers: "2.5万", score: 4.9 },
        avatar: "/images/skin/011.webp",
        menus: [
            { id: 1, name: "ウルセラリフト（全顔）", description: "切らないフェイスリフト。圧倒的な引き上げ効果。", price: "¥128,000", time: "90分", image: "/images/skin/012.webp", isRecommended: true },
            { id: 2, name: "高濃度ビタミン点滴", description: "内側から輝く白玉肌へ。", price: "¥15,000", time: "30分", image: "/images/skin/013.webp", isRecommended: true },
        ],
        cases: generateMockImages(8),
        info: { address: "東京都港区北青山3-5-30 入来ビル4F", hours: "11:00 - 21:00", phone: "03-9876-5432" }
    },
    {
        id: 3,
        name: "新宿メディカル脱毛クリニック",
        description: "【医療脱毛専門】痛みが少なくスピーディーな施術が人気。都度払いOKで通いやすい価格設定。学生割引あり。",
        website: "https://shinjuku-medical.com",
        stats: { posts: 89, followers: "5,800", score: 4.5 },
        avatar: "/images/skin/021.webp",
        menus: [
            { id: 1, name: "全身医療脱毛（顔・VIO込）", description: "最新蓄熱式レーザー使用。最短5回で完了。", price: "¥29,800", time: "60分", image: "/images/skin/022.webp", isRecommended: true },
            { id: 2, name: "ワキ脱毛 通い放題", description: "期間限定キャンペーン。", price: "¥500", time: "10分", image: "/images/skin/023.webp", isRecommended: true },
        ],
        cases: generateMockImages(4),
        info: { address: "東京都新宿区歌舞伎町1-2-3 新宿ビル5F", hours: "10:00 - 22:00", phone: "03-1111-2222" }
    }
];

// Mock Doctors Data
const MOCK_DOCTORS: DoctorData[] = [
    {
        id: 1,
        name: 'Dr. Elena',
        jobTitle: '院長 / 皮膚科専門医',
        avatar: '/images/skin/001.webp',
        specialties: ['肌質改善', 'シミ取り', 'アンチエイジング'],
    },
    {
        id: 2,
        name: 'Dr. 山田 太郎',
        jobTitle: '副院長 / 形成外科専門医',
        avatar: '/images/skin/011.webp',
        specialties: ['二重整形', '鼻整形', '小顔注射'],
    },
    {
        id: 3,
        name: 'Dr. 佐藤 美咲',
        jobTitle: '美容皮膚科医',
        avatar: '/images/skin/021.webp',
        specialties: ['肝斑治療', '毛穴ケア', 'レーザー治療'],
    },
    {
        id: 4,
        name: 'Dr. 鈴木 健一',
        jobTitle: '脱毛専門医',
        avatar: '/images/skin/031.webp',
        specialties: ['医療脱毛', 'メンズ脱毛', 'VIO脱毛'],
    },
];

// --- Components ---

export default function ShopDetailScreen({
    shopId,
    onBack,
}: {
    shopId: number;
    onBack: () => void;
}) {
    const navigate = useNavigate();

    // shopIdに応じてデータを取得（見つからない場合は最初のデータをフォールバック）
    const shopData = MOCK_SHOPS_DATA.find(s => s.id === shopId) || MOCK_SHOPS_DATA[0];

    // ランダムに3枚の症例写真を選択（再レンダリング時のチラつき防止）
    const randomCases = useMemo(() => {
        const cases = [...shopData.cases];
        const shuffled = cases.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    }, [shopData.cases]);

    const [activeTab, setActiveTab] = useState<'トップ' | '投稿' | 'メニュー' | 'サロン' | 'レビュー' | 'ドクター'>('トップ');
    const tabs: Array<'トップ' | '投稿' | 'メニュー' | 'サロン' | 'レビュー' | 'ドクター'> = [
        'トップ',
        '投稿',
        'メニュー',
        'サロン',
        'レビュー',
        'ドクター',
    ];

    // Random Availability Generator (トップ用) - 今日から7日間を表示
    const availability = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i); // 今日から7日間（今日を含む）
        const day = date.getDate();
        const weekDay = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
        const status = ['◎', '◎', '△', '×', 'ー'][Math.floor(Math.random() * 5)];
        // fullDateをISO形式で保存（YYYY-MM-DD）
        const fullDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return { day, weekDay, status, fullDate, date };
    });

    // ▼ タブの中身を切り替える関数
    const renderContent = () => {
        switch (activeTab) {
            case '投稿':
                return <ShopPostsTab />;
            case 'メニュー':
                return <ShopMenuTab />;
            case 'サロン':
                return <ShopSalonInfoTab />;
            case 'レビュー':
                return <ShopReviewsTab />;
            case 'ドクター':
                return (
                    <div className="px-4 py-6">
                        <h2 className="font-bold text-gray-900 text-lg mb-4">ドクター一覧</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {MOCK_DOCTORS.map((doctor) => (
                                <button
                                    key={doctor.id}
                                    onClick={() => {
                                        navigate(`/doctor/${doctor.id}`, {
                                            state: {
                                                doctor: {
                                                    ...doctor,
                                                    shopId: shopData.id,
                                                    shopName: shopData.name,
                                                }
                                            }
                                        });
                                    }}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-left hover:shadow-md active:scale-[0.99] transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0">
                                            <img
                                                src={doctor.avatar}
                                                alt={doctor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 text-sm mb-1">
                                                {doctor.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 mb-2">
                                                {doctor.jobTitle}
                                            </p>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {doctor.specialties.slice(0, 2).map((specialty, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
                                                    >
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-blue-600 text-sm font-bold shrink-0">
                                            Profile &gt;
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'トップ':
            default:
                return (
                    <>
                        {/* B. Availability (Calendar) */}
                        <section className="py-6 border-b border-gray-50">
                            <div className="px-4 mb-3 flex items-center justify-between">
                                <h2 className="font-bold text-gray-900 text-sm">空き状況</h2>
                            </div>
                            <div className="flex overflow-x-auto px-4 pb-2 gap-3 no-scrollbar">
                                {availability.map((item, idx) => {
                                    const isAvailable = item.status === '◎' || item.status === '△';
                                    const handleDateClick = () => {
                                        if (isAvailable) {
                                            navigate('/reserve', {
                                                state: {
                                                    shopId: shopData.id,
                                                    shopName: shopData.name,
                                                    selectedDate: item.fullDate
                                                }
                                            });
                                        } else {
                                            // 利用不可の場合、簡単なフィードバック（オプション）
                                            // 必要に応じてトーストライブラリを使用可能
                                        }
                                    };
                                    return (
                                        <button
                                            key={idx}
                                            onClick={handleDateClick}
                                            disabled={!isAvailable}
                                            className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-2xl border border-gray-200 bg-white transition-all ${
                                                isAvailable
                                                    ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300 active:scale-95'
                                                    : 'cursor-default opacity-60'
                                            }`}
                                        >
                                            <span className="text-xs font-bold mb-1 text-gray-500">
                                                {item.weekDay}
                                            </span>
                                            <span className="text-sm font-bold text-gray-900">
                                                {item.day}
                                            </span>
                                            <span
                                                className={`text-[10px] mt-1 font-bold ${
                                                    item.status === '◎'
                                                        ? 'text-blue-500'
                                                        : item.status === '△'
                                                        ? 'text-orange-400'
                                                        : 'text-gray-300'
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* C. Recommended (Top Pick) */}
                        <section className="py-6 border-b border-gray-50">
                            <div className="px-4 mb-6">
                                <h2 className="font-bold text-gray-900 text-sm mb-3">
                                    おすすめメニュー
                                </h2>
                                {shopData.menus
                                    .filter((m) => m.isRecommended)
                                    .map((menu) => (
                                        <button
                                            key={menu.id}
                                            onClick={() => {
                                                navigate('/reserve', {
                                                    state: {
                                                        shopId: shopData.id,
                                                        shopName: shopData.name,
                                                        selectedMenu: menu
                                                    }
                                                });
                                            }}
                                            className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 group mb-4 w-full text-left hover:shadow-md active:scale-[0.99] transition-all cursor-pointer"
                                        >
                                            <div className="h-32 bg-gray-200">
                                                <img
                                                    src={menu.image}
                                                    alt={menu.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4 bg-white">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2">
                                                        {menu.name}
                                                    </h3>
                                                    <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                                        人気
                                                    </span>
                                                </div>
                                                {menu.description && (
                                                    <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-relaxed">
                                                        {menu.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={12} /> {menu.time}
                                                        </div>
                                                    </div>
                                                    <div className="text-lg font-bold text-blue-600 font-mono">
                                                        {menu.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                            </div>

                            {/* Cases Preview */}
                            <div className="px-0">
                                <div className="px-4 mb-3 flex items-center justify-between">
                                    <h2 className="font-bold text-gray-900 text-sm">新着の症例</h2>
                                    <button
                                        onClick={() => setActiveTab('投稿')}
                                        className="text-xs text-gray-400 font-medium"
                                    >
                                        もっと見る
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 gap-0.5">
                                    {randomCases.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="aspect-square relative bg-gray-100"
                                        >
                                            <img
                                                src={img}
                                                alt="case"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </>
                );
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fade-in font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 h-14 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="p-2 -ml-2 text-gray-700 active:scale-95 transition-transform"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="flex-1 text-center font-bold text-gray-900 truncate px-4">
                    {shopData.name}
                </div>
                <button className="p-2 -mr-2 text-gray-700 active:scale-95 transition-transform">
                    <Share size={20} />
                </button>
            </header>

            {/* A. Profile Section (Common) */}
            <section className="px-5 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-blue-500 to-cyan-400">
                            <img
                                src={shopData.avatar}
                                alt="avatar"
                                className="w-full h-full rounded-full object-cover border-2 border-white"
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex justify-around pl-4">
                        <div className="text-center">
                            <div className="font-bold text-lg text-gray-900">
                                {shopData.stats.posts}
                            </div>
                            <div className="text-xs text-gray-500 font-medium">投稿</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-lg text-gray-900">
                                {shopData.stats.followers}
                            </div>
                            <div className="text-xs text-gray-500 font-medium">フォロワー</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-lg text-gray-900 flex items-center justify-center gap-0.5">
                                {shopData.stats.score}
                                <Star size={12} className="fill-orange-400 text-orange-400" />
                            </div>
                            <div className="text-xs text-gray-500 font-medium">スコア</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <h1 className="font-bold text-gray-900">{shopData.name}</h1>
                    <p className="text-xs text-gray-500">{shopData.info.address}</p>
                    <p className="text-sm text-gray-700 leading-relaxed pt-1">
                        {shopData.description}
                    </p>
                    <a
                        href={shopData.website}
                        className="text-sm text-blue-600 font-medium break-all block truncate"
                    >
                        {shopData.website}
                    </a>
                </div>
            </section>

            {/* Sticky Tabs */}
            <div className="sticky top-14 z-40 bg-white border-b border-gray-100 shadow-sm">
                <div className="flex justify-between px-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-3 text-sm font-bold relative transition-colors px-2 ${
                                activeTab === tab ? 'text-blue-600' : 'text-gray-400'
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

            {/* Content Area (Switchable) */}
            <div className="pb-24">{renderContent()}</div>

            {/* F. Fixed Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-50">
                <button
                    onClick={() => navigate('/reserve', { state: { shopId: shopData.id, shopName: shopData.name } })}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <Calendar size={18} />
                    今すぐ予約する
                </button>
            </div>
        </div>
    );
}
