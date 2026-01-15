import React, { useState } from 'react';
import {
    Search,
    MapPin,
    Star,
    ChevronDown,
    SlidersHorizontal,
    ChevronLeft,
    Calendar,
    Send
} from 'lucide-react';

function HomeScreen() {
    const [activeTab, setActiveTab] = useState('肌');
    const [locationAllowed, setLocationAllowed] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [searchActiveCategory, setSearchActiveCategory] = useState('肌');
    const categories = ['肌', '脱毛', '顔', 'ボディ', '歯'];

    // カテゴリ別メニュー定義
    const CATEGORY_MENUS: Record<string, string[]> = {
        '肌': ['しみ・そばかす', '肝斑', 'ニキビ・跡', '毛穴・黒ずみ', '美白・くすみ', 'ほくろ・イボ', '赤ら顔'],
        '脱毛': ['医療脱毛(全身)', '医療脱毛(VIO)', '医療脱毛(顔)', 'メンズ脱毛', 'ワキ脱毛', '都度払い'],
        '顔': ['二重・目元', 'クマ取り', '鼻整形', '糸リフト', '小顔注射', 'あご・輪郭', 'ほうれい線'],
        'ボディ': ['脂肪吸引', '脂肪溶解注射', '豊胸', '痩身エステ', 'ワキガ・多汗症', 'タトゥー除去'],
        '歯': ['ホワイトニング', '矯正歯科', 'インプラント', 'セラミック', '歯肉ピーリング', 'クリーニング']
    };

    // 料金スライダー用ステップ定義
    const PRICE_STEPS = [
        "〜5,000円",
        "〜1万円",
        "〜3万円",
        "〜5万円",
        "〜10万円",
        "〜30万円",
        "〜50万円",
        "〜100万円",
        "〜200万円",
        "300万円以上"
    ];
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 9]);

    // --- 画像設定ガイド ---
    type ShopData = {
        id: number;
        name: string;
        branch: string;
        area: string;
        rating: number;
        tags: string[];
        description: string;
        reviewCount: number;
        caseCount: number;
        images: string[];
        avatar: string;
    };

    const MOCK_DATA: Record<string, ShopData[]> = {
        '肌': [
            {
                id: 1,
                name: "Eco Skin Clinic",
                branch: "表参道本店",
                area: "表参道 徒歩2分",
                rating: 4.9,
                reviewCount: 124,
                caseCount: 85,
                tags: ["美肌", "オーガニック"],
                description: "初回限定！肌質改善コース¥5,000OFFクーポン配布中🌿 自然派志向の方に。",
                images: [
                    "/images/salon_01.webp",
                    "/images/salon_02.webp",
                    "/images/salon_03.webp"
                ],
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80"
            },
            {
                id: 2,
                name: "Skin Labo Tokyo",
                branch: "渋谷店",
                area: "渋谷 徒歩5分",
                rating: 4.7,
                reviewCount: 98,
                caseCount: 120,
                tags: ["ニキビケア", "最新機器"],
                description: "最新レーザー導入！ニキビ跡徹底ケアコース。学生割引あり✨",
                images: [
                    "https://images.unsplash.com/photo-1507652313519-d4e917a584fd?w=400&q=80",
                    "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?w=400&q=80",
                    "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80"
            },
            {
                id: 3,
                name: "Pure Beauty",
                branch: "銀座店",
                area: "銀座 徒歩1分",
                rating: 4.8,
                reviewCount: 210,
                caseCount: 340,
                tags: ["エイジングケア", "個室"],
                description: "ラグジュアリーな完全個室で極上のエイジングケアを。体験予約受付中。",
                images: [
                    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&q=80",
                    "https://images.unsplash.com/photo-1552693673-1bf958298935?w=400&q=80",
                    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80"
            }
        ],
        '脱毛': [
            {
                id: 11,
                name: "Smooth Skin Salon",
                branch: "新宿店",
                area: "新宿 徒歩3分",
                rating: 4.8,
                reviewCount: 305,
                caseCount: 500,
                tags: ["全身脱毛", "痛くない"],
                description: "【全身脱毛】月額¥3,000〜！痛みの少ない最新マシン使用。カウンセリング無料。",
                images: [
                    "https://images.unsplash.com/photo-1588698967468-46c1e34e5652?w=400&q=80",
                    "https://images.unsplash.com/photo-1596549216766-0d19f6a72e81?w=400&q=80",
                    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
            },
            {
                id: 12,
                name: "Men's Datsumo",
                branch: "池袋店",
                area: "池袋 徒歩4分",
                rating: 4.6,
                reviewCount: 45,
                caseCount: 20,
                tags: ["メンズ脱毛", "ヒゲ脱毛"],
                description: "男性専用サロン。朝のヒゲ剃りから解放されませんか？初回¥980キャンペーン。",
                images: [
                    "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=400&q=80",
                    "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&q=80",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
            },
            {
                id: 13,
                name: "Quick Wax",
                branch: "六本木店",
                area: "六本木 徒歩2分",
                rating: 4.9,
                reviewCount: 50,
                caseCount: 100,
                tags: ["ブラジリアンワックス", "即効性"],
                description: "急な予定でも安心！ブラジリアンワックス専門。スピーディーで美しい仕上がり。",
                images: [
                    "https://images.unsplash.com/photo-1555820585-c5ae44394b79?w=400&q=80",
                    "https://images.unsplash.com/photo-1596549216634-927b587b14d2?w=400&q=80",
                    "https://images.unsplash.com/photo-1522337360705-8754d9029060?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
            }
        ],
        '顔': [
            {
                id: 21,
                name: "Face Lift Pro",
                branch: "青山店",
                area: "青山一丁目 徒歩1分",
                rating: 5.0,
                reviewCount: 88,
                caseCount: 150,
                tags: ["小顔", "コルギ"],
                description: "話題の小顔コルギ！痛気持ちいい施術でスッキリフェイスラインへ。モデル来店多数。",
                images: [
                    "https://images.unsplash.com/photo-1601666675154-2c6c965c71b6?w=400&q=80",
                    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&q=80",
                    "https://images.unsplash.com/photo-1570174004693-8f844c130c55?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
            },
            {
                id: 22,
                name: "Pore Cleansing",
                branch: "原宿店",
                area: "原宿 徒歩6分",
                rating: 4.5,
                reviewCount: 30,
                caseCount: 40,
                tags: ["毛穴洗浄", "黒ずみケア"],
                description: "毛穴の黒ずみ・開きを徹底洗浄！ハイドラフェイシャル導入店。",
                images: [
                    "https://images.unsplash.com/photo-1616394584244-a4b521b36622?w=400&q=80",
                    "https://images.unsplash.com/photo-1598440947619-2c35fc9af2fc?w=400&q=80",
                    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80"
            },
            {
                id: 23,
                name: "Relax Facial",
                branch: "代官山店",
                area: "代官山 徒歩3分",
                rating: 4.8,
                reviewCount: 60,
                caseCount: 85,
                tags: ["リラクゼーション", "アロマ"],
                description: "極上のアロマフェイシャルで心も体もリラックス。日頃の疲れを癒しませんか？",
                images: [
                    "https://images.unsplash.com/photo-1544161515-4ab6ce6db48e?w=400&q=80",
                    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=80",
                    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1619895862047-e64331a2ba3d?w=100&q=80"
            }
        ],
        'ボディ': [
            {
                id: 31,
                name: "Slim Body Gym",
                branch: "恵比寿店",
                area: "恵比寿 徒歩2分",
                rating: 4.7,
                reviewCount: 110,
                caseCount: 200,
                tags: ["痩身", "ダイエット"],
                description: "【結果出し重視】キャビテーション×ラジオ波で脂肪燃焼！本気で痩せたい方へ。",
                images: [
                    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
                    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
                    "https://images.unsplash.com/photo-1583454110551-21f2fa928d34?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&q=80"
            },
            {
                id: 32,
                name: "Healing Massage",
                branch: "中目黒店",
                area: "中目黒 徒歩4分",
                rating: 4.9,
                reviewCount: 50,
                caseCount: 20,
                tags: ["マッサージ", "整体"],
                description: "国家資格保持者による本格整体。肩こり・腰痛の根本改善を目指します。",
                images: [
                    "https://images.unsplash.com/photo-1542848284-8afa78a08ccb?w=400&q=80",
                    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80",
                    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1542596594-649edbc13630?w=100&q=80"
            },
            {
                id: 33,
                name: "Detox Spa",
                branch: "麻布十番店",
                area: "麻布十番 徒歩5分",
                rating: 4.6,
                reviewCount: 15,
                caseCount: 5,
                tags: ["デトックス", "リンパ"],
                description: "アロマリンパドレナージュで老廃物を排出。むくみスッキリ、冷え性改善にも。",
                images: [
                    "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=400&q=80",
                    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80",
                    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80"
            }
        ],
        '歯': [
            {
                id: 41,
                name: "White Dental Clinic",
                branch: "赤坂店",
                area: "赤坂 徒歩3分",
                rating: 4.8,
                reviewCount: 220,
                caseCount: 1000,
                tags: ["ホワイトニング", "歯科矯正"],
                description: "【医療ホワイトニング】1回で白さを実感。歯科医師監修で安心・安全。",
                images: [
                    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80",
                    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80",
                    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80"
            },
            {
                id: 42,
                name: "Smile Ortho",
                branch: "渋谷公園通り店",
                area: "渋谷 徒歩7分",
                rating: 4.7,
                reviewCount: 400,
                caseCount: 1500,
                tags: ["マウスピース矯正", "インビザライン"],
                description: "目立たないマウスピース矯正。月々¥3,000〜。3Dシミュレーション無料体験実施中。",
                images: [
                    "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=400&q=80",
                    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80",
                    "https://images.unsplash.com/photo-1588776814546-2ab8ca544346?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&q=80"
            },
            {
                id: 43,
                name: "Dental Salon",
                branch: "目黒店",
                area: "目黒 徒歩1分",
                rating: 4.5,
                reviewCount: 20,
                caseCount: 15,
                tags: ["歯科クリーニング", "口臭ケア"],
                description: "プロのクリーニングでツルツルの歯に。口臭予防、歯周病予防にもおすすめです。",
                images: [
                    "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?w=400&q=80",
                    "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&q=80",
                    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&q=80"
                ],
                avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&q=80"
            }
        ]
    };

    return (
        <div className="min-h-screen bg-white pb-24 relative font-sans">
            {/* 1. Header Area (AI Chatbot) - Optimized for Mobile */}
            <header className="pt-safe-top px-5 pb-5 bg-white sticky top-0 z-40 shadow-sm">
                <div className="flex flex-col gap-4 pt-4">
                    {/* Search Input Area - Prominent */}
                    <div className="relative flex items-center shadow-lg rounded-full ring-1 ring-gray-100">
                        <input
                            type="text"
                            placeholder="AIに相談する..."
                            className="w-full pl-6 pr-14 py-4 rounded-full bg-white text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                        />
                        <button className="absolute right-2 p-2.5 bg-accent-gradient rounded-full text-white shadow-md hover:opacity-90 active:scale-95 transition-all">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* 2. Category Tabs */}
            <nav className="sticky top-[90px] z-30 bg-white/95 backdrop-blur-sm pt-3 pb-3 border-b border-gray-50">
                <div className="px-4 w-full">
                    <div className="grid grid-cols-5 gap-2 w-full">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`py-2 rounded-full text-[13px] font-bold transition-all shadow-sm border ${activeTab === cat
                                    ? 'border-secondary text-secondary bg-blue-50'
                                    : 'border-gray-100 text-gray-500 bg-white hover:bg-gray-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* 3. Main Content Area */}
            <main className="px-5 mt-6">
                {!locationAllowed ? (
                    /* Location Permission Request */
                    <div className="flex flex-col items-center justify-center p-8 border border-gray-100 rounded-2xl bg-gray-50 text-center animate-fade-in">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-primary">
                            <MapPin size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">位置情報の確認</h3>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            近くの人気サロンを表示するために<br />
                            位置情報の利用を許可してください
                        </p>
                        <button
                            onClick={() => setLocationAllowed(true)}
                            className="w-full py-3 bg-accent-gradient text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform"
                        >
                            位置情報を許可する
                        </button>
                    </div>
                ) : (
                    /* Content: Rising Popularity */
                    <div className="animate-fade-in">

                        {/* NEW: Search by Conditions Button */}
                        <div className="mb-6">
                            <button
                                onClick={() => setIsSearchModalOpen(true)}
                                className="w-full py-3.5 bg-accent-gradient rounded-xl shadow-md text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                            >
                                <SlidersHorizontal size={20} />
                                <span>条件から検索する</span>
                            </button>
                        </div>

                        {/* Region Label */}
                        <div className="text-xs text-gray-500 font-medium mb-4 flex items-center gap-1">
                            <MapPin size={12} />
                            東京都すべて
                        </div>

                        {/* Section Header */}
                        <div className="flex justify-between items-end mb-4">
                            <h2 className="text-xl font-bold text-gray-800">人気急上昇</h2>
                            <button className="text-xs text-gray-400 flex items-center gap-0.5">
                                並べ替え <ChevronDown size={12} />
                            </button>
                        </div>

                        {/* Mock Data List Based on Active Tab */}
                        <div className="flex flex-col gap-6">
                            {MOCK_DATA[activeTab]?.map((shop) => (
                                <div key={shop.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                                    {/* Images Row */}
                                    <div className="flex gap-0.5 h-32">
                                        {shop.images.map((img, idx) => (
                                            <div key={idx} className="flex-1 bg-gray-200 relative">
                                                <img src={img} className="w-full h-full object-cover" alt={`shop-img-${idx}`} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Shop Info */}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-100">
                                                    <img src={shop.avatar} className="w-full h-full object-cover" alt="avatar" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">{shop.name}</h3>
                                                    <p className="text-[10px] text-gray-400">{shop.branch}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center gap-1 text-xs font-bold font-mono mb-1">
                                                    <MapPin size={10} className="text-gray-400" />
                                                    <span className="text-gray-600">{shop.area}</span>
                                                </div>
                                                <button className="bg-cyan-50 text-secondary text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-100 hover:bg-cyan-100 transition-colors">
                                                    今すぐ予約
                                                </button>
                                            </div>
                                        </div>

                                        {/* Rating & Tags */}
                                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                                            <div className="flex items-center gap-1">
                                                <div className="flex text-yellow-400 gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={12} fill={i < Math.floor(shop.rating) ? "currentColor" : "none"} className={i < Math.floor(shop.rating) ? "" : "text-gray-300"} />
                                                    ))}
                                                </div>
                                                <span className="text-sm font-bold text-yellow-500 ml-1">{shop.rating}</span>

                                                {/* Rating Counts */}
                                                <span className="text-[10px] text-gray-400 ml-2">
                                                    口コミ {shop.reviewCount}件　症例 {shop.caseCount}件
                                                </span>
                                            </div>
                                            {shop.tags.map(tag => (
                                                <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Coupon / Description Box */}
                                        <div className="bg-gray-50 rounded-lg p-3 text-[11px] text-gray-600 leading-relaxed border border-gray-100 relative">
                                            <span className="absolute -top-1.5 -left-1 text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded-[2px] font-bold">HOT</span>
                                            <p>
                                                {shop.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )) || (
                                    <div className="text-center py-10 text-gray-400 text-sm">
                                        データがありません
                                    </div>
                                )}

                            {/* Scroll padding */}
                            <div className="h-6"></div>
                        </div>

                    </div>
                )}
            </main>

            {/* Search Modal Overlay */}
            {isSearchModalOpen && (
                <div className="fixed inset-0 z-[60] bg-white animate-fade-in overflow-hidden flex flex-col">
                    {/* Modal Header */}
                    <header className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                        <button
                            onClick={() => setIsSearchModalOpen(false)}
                            className="p-2 -ml-2 text-gray-600 active:bg-gray-50 rounded-full transition-colors"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <h2 className="text-lg font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">検索</h2>
                        <div className="w-8"></div> {/* Spacer for center alignment */}
                    </header>

                    {/* Category Tabs (Fixed or Scrollable) */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-white">
                        <div className="grid grid-cols-5 gap-2 w-full">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSearchActiveCategory(cat)}
                                    className={`w-full rounded-full border py-1.5 text-[11px] font-bold transition-colors ${searchActiveCategory === cat
                                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                                        : 'border-gray-200 text-gray-400 bg-white'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Modal Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto pb-24">

                        {/* Keyword Search */}
                        <div className="p-5 pb-2">
                            <div className="relative flex items-center shadow-sm rounded-full bg-gray-50 border border-gray-200">
                                <Search size={18} className="absolute left-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="エリア・駅名・キーワード検索"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-transparent text-sm placeholder-gray-400 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Filter Section: Area */}
                        <div className="px-5 py-4 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-gray-800" />
                                    <span className="font-bold text-sm text-gray-800">駅・エリアを選ぶ</span>
                                </div>
                                <span className="text-xs font-bold text-primary">東京都すべて</span>
                            </div>
                        </div>

                        {/* Filter Section: Menu & Price */}
                        <div className="px-5 py-6 border-b border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-5 flex justify-center"><SlidersHorizontal size={18} className="text-gray-800" /></div>
                                <span className="font-bold text-sm text-gray-800">メニュー・料金を選ぶ</span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6 ml-7">
                                {(CATEGORY_MENUS[searchActiveCategory] || CATEGORY_MENUS['肌']).map(tag => (
                                    <button key={tag} className="border border-gray-300 text-gray-600 rounded-full px-4 py-2 text-xs font-bold bg-white hover:bg-gray-50 transition-colors">
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            {/* Price Slider UI */}
                            <div className="ml-7 pr-7 mt-6">
                                <PriceSlider
                                    steps={PRICE_STEPS}
                                    value={priceRange}
                                    onChange={setPriceRange}
                                />
                            </div>
                        </div>

                        {/* Filter Section: Date */}
                        <div className="px-5 py-6 border-b border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar size={18} className="text-gray-800" />
                                <span className="font-bold text-sm text-gray-800">日にちを選ぶ <span className="text-xs font-normal text-gray-400 ml-1">(最大3つ)</span></span>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {['今日', '明日', '明後日'].map(date => (
                                    <button key={date} className="border border-gray-300 text-gray-600 rounded-lg py-3 text-xs font-bold text-center">
                                        {date}
                                    </button>
                                ))}
                                <button className="border border-gray-300 text-gray-600 rounded-lg py-3 flex items-center justify-center">
                                    <Calendar size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Filter Section: Preferences (Kodawari) */}
                        <div className="px-5 py-6">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-5 h-5 rounded-full border border-gray-800 flex items-center justify-center"><span className="text-[10px] font-bold">+</span></div>
                                <span className="font-bold text-sm text-gray-800">こだわりを選ぶ</span>
                            </div>

                            {/* Toggle Switch Row */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 mb-1">今すぐ予約</h4>
                                    <p className="text-[10px] text-gray-400 leading-tight">ビューティストからの返信を待たなくても<br />その場で予約が確定します</p>
                                </div>
                                <div className="w-12 h-7 bg-gray-200 rounded-full relative cursor-pointer">
                                    <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>

                            {/* Salon Features Icons (Mock) */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-800 mb-3">サロンの特徴</h4>
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                                            <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                                                {/* Dummy icon placeholder */}
                                                <div className="w-6 h-6 border-2 border-gray-300 rounded-sm"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Modal Footer (Fixed) */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100">
                        <button
                            onClick={() => setIsSearchModalOpen(false)}
                            className="w-full py-4 bg-accent-gradient text-white font-bold rounded-full shadow-lg active:scale-95 transition-transform"
                        >
                            検索する
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper Component: PriceSlider
const PriceSlider = ({
    steps,
    value,
    onChange
}: {
    steps: string[];
    value: [number, number];
    onChange: (val: [number, number]) => void;
}) => {
    const [dragging, setDragging] = useState<'min' | 'max' | null>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);

    // Helper to calculate percentage position
    const getPercent = (index: number) => (index / (steps.length - 1)) * 100;

    // Handle pointer down (start dragging)
    const handlePointerDown = (thumb: 'min' | 'max') => (e: React.PointerEvent) => {
        e.preventDefault();
        setDragging(thumb);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    // Handle pointer move (dragging)
    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragging || !trackRef.current) return;

        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        const rawIndex = Math.round(percent * (steps.length - 1));

        if (dragging === 'min') {
            const newValue = Math.min(rawIndex, value[1]); // Clamp to max
            if (newValue !== value[0]) onChange([newValue, value[1]]);
        } else {
            const newValue = Math.max(rawIndex, value[0]); // Clamp to min
            if (newValue !== value[1]) onChange([value[0], newValue]);
        }
    };

    // Handle pointer up (stop dragging)
    const handlePointerUp = (e: React.PointerEvent) => {
        setDragging(null);
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    return (
        <div className="relative h-12 flex items-center select-none touch-none">
            {/* Track Area */}
            <div
                ref={trackRef}
                className="absolute w-full h-1.5 bg-gray-100 rounded-full"
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                {/* Active Range Track */}
                <div
                    className="absolute top-0 h-full bg-accent-gradient rounded-full opacity-40 transition-all duration-75 ease-out"
                    style={{
                        left: `${getPercent(value[0])}%`,
                        width: `${getPercent(value[1]) - getPercent(value[0])}%`
                    }}
                />

                {/* Steps Dots (Optional, purely visual) */}
                {steps.map((_, idx) => (
                    <div
                        key={idx}
                        className={`absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full pointer-events-none transition-colors ${idx >= value[0] && idx <= value[1] ? 'bg-primary/30' : 'bg-gray-300'
                            }`}
                        style={{ left: `${getPercent(idx)}%` }}
                    />
                ))}
            </div>

            {/* Min Thumb */}
            <div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 shadow-lg rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-transform z-20"
                style={{ left: `${getPercent(value[0])}%`, transform: 'translate(-50%, -50%)' }}
                onPointerDown={handlePointerDown('min')}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                {/* Tooltip Label */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-[10px] font-bold rounded-md whitespace-nowrap shadow-sm pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800">
                    {steps[value[0]]}
                </div>
            </div>

            {/* Max Thumb */}
            <div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 shadow-lg rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-transform z-20"
                style={{ left: `${getPercent(value[1])}%`, transform: 'translate(-50%, -50%)' }}
                onPointerDown={handlePointerDown('max')}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                {/* Tooltip Label */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-[10px] font-bold rounded-md whitespace-nowrap shadow-sm pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-800">
                    {steps[value[1]]}
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
