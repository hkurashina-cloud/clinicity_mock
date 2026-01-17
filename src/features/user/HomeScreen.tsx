import React, { useState, useRef, useLayoutEffect } from 'react';
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

interface HomeScreenProps {
    onEnterAdminMode?: () => void;
    onShopClick: (id: number) => void;
}

function HomeScreen({ onEnterAdminMode, onShopClick }: HomeScreenProps) {
    const [activeTab, setActiveTab] = useState('肌');
    const [locationAllowed, setLocationAllowed] = useState(() => {
        return localStorage.getItem('clinicity_location_allowed') === 'true';
    });
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [searchActiveCategory, setSearchActiveCategory] = useState('肌');
    const categories = ['肌', '脱毛', '顔', 'ボディ', '歯'];
    const scrollPositions = useRef<Record<string, number>>({});

    useLayoutEffect(() => {
        window.scrollTo(0, scrollPositions.current[activeTab] || 0);
    }, [activeTab]);

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

    // --- データ生成ヘルパー (Improved) ---
    const generateMockData = (
        category: string,
        startId: number,
        nameSuffixes: string[],
        tagsList: string[][]
    ): ShopData[] => {
        const areaStation = ["青山", "渋谷", "新宿", "銀座", "表参道", "六本木", "恵比寿", "池袋", "代官山", "中目黒", "赤坂", "横浜", "吉祥寺", "大宮", "千葉", "京都", "大阪", "博多"];
        const areaSuffix = ["駅前", "南口", "北口", "本店", "アネックス", "銀座通店", "表参道店"];
        const shopPrefixes = ["Clinicity", "Tokyo", "Beauty", "Medical", "Dermatology", "Skin", "Esthetic", "Salon", "White", "Pure", "Clear", "Fine", "Luxury", "Premium"];

        return Array.from({ length: 100 }).map((_, i) => {
            const id = startId + i;

            // Random attributes
            const areaName = areaStation[Math.floor(Math.random() * areaStation.length)];
            const nameSuffix = nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)];
            const shopPrefix = shopPrefixes[Math.floor(Math.random() * shopPrefixes.length)];

            // Name generation
            const name = i % 3 === 0
                ? `${shopPrefix} ${nameSuffix}`
                : `${areaName}${nameSuffix}`;

            // Image randomization (00 to 15)
            // 全カテゴリで /images/skin/ を使用する（指定要件）
            const imgIndex = Math.floor(Math.random() * 16);
            const prefix = String(imgIndex).padStart(2, '0');

            const images = [
                `/images/skin/${prefix}1.webp`,
                `/images/skin/${prefix}2.webp`,
                `/images/skin/${prefix}3.webp`
            ];

            // Tags randomization
            const tags = [];
            const availableTags = [...tagsList]; // Copy
            // Pick 2-3 random tags
            const tagCount = Math.floor(Math.random() * 2) + 2;
            for (let k = 0; k < tagCount; k++) {
                if (availableTags.length === 0) break;
                const randIdx = Math.floor(Math.random() * availableTags.length);
                const tagGroup = availableTags[randIdx];
                // Pick one from the group (assuming tagsList is array of arrays like [["tagA", "tagB"], ...])
                // Or if it is simple array of strings? The previous code passed arrays of arrays mostly for display variation logic
                // Let's assume input is string[][], and we pick random group then random item?
                // Actually looking at calls: [["ニキビ", "毛穴"], ["美白"...]]
                // Let's simplify: flatten unique tags or just pick a random group as 'tags' for this shop?
                // The Type definition says `tags: string[]`.
                // Let's Just pick one array from tagsList for simplicity and consistency with previous logic, 
                // OR mix them up. To make it "randomized", let's pick 2 random tags from flattened list or just pick one pre-defined set.
                // Let's stick to "Pick one set" to correspond to `tagsList[i % tagsList.length]` logic but randomized.
                tags.push(...availableTags[Math.floor(Math.random() * availableTags.length)]);
            }
            // For better variation, let's just pick one random pair from the provided list
            const finalTags = tagsList[Math.floor(Math.random() * tagsList.length)];

            return {
                id,
                name,
                branch: areaSuffix[Math.floor(Math.random() * areaSuffix.length)],
                area: `${areaName} 徒歩${Math.floor(Math.random() * 15) + 1}分`,
                rating: 3.5 + (Math.random() * 1.5),
                reviewCount: Math.floor(Math.random() * 1000) + 10,
                caseCount: Math.floor(Math.random() * 500) + 5,
                tags: finalTags,
                description: "お客様一人ひとりの悩みに寄り添い、最適なプランをご提案します。カウンセリング無料、当日予約も可能です。ぜひ一度ご相談ください。",
                images,
                avatar: images[0] // 1枚目の画像をアバターにする
            };
        });
    };

    // 100件ずつのダミーデータ生成
    const MOCK_DATA: Record<string, ShopData[]> = {
        '肌': generateMockData(
            '肌',
            1,
            ["スキンクリニック", "皮膚科", "美容皮膚科", "メディカルスキン", "肌質改善ラボ", "美肌センター"],
            [
                ["ニキビ", "毛穴"], ["美白", "シミ取り"], ["肝斑", "ピーリング"],
                ["ボトックス", "ヒアルロン酸"], ["ポテンツァ", "ダーマペン"]
            ]
        ),
        '脱毛': generateMockData(
            '脱毛',
            101,
            ["脱毛クリニック", "レーザー院", "医療脱毛", "メンズ脱毛", "脱毛サロン"],
            [
                ["全身脱毛", "VIO"], ["医療脱毛", "都度払い"], ["メンズ脱毛", "ヒゲ"],
                ["脇脱毛", "ジェントルマックス"], ["SHR脱毛", "痛くない"]
            ]
        ),
        '顔': generateMockData(
            '顔',
            201,
            ["美容外科", "形成外科", "フェイスクリニック", "小顔矯正", "リフトアップ"],
            [
                ["二重整形", "埋没法"], ["糸リフト", "HIFU"], ["鼻整形", "プロテーゼ"],
                ["小顔注射", "ボトックス"], ["クマ取り", "脱脂"]
            ]
        ),
        'ボディ': generateMockData(
            'ボディ',
            301,
            ["痩身クリニック", "ボディラボ", "ダイエットセンター", "脂肪吸引", "美容整体"],
            [
                ["脂肪吸引", "脂肪溶解注射"], ["痩身エステ", "ハイパーナイフ"],
                ["豊胸", "ヒアルロン酸"], ["骨盤矯正", "マッサージ"], ["ワキガ", "多汗症"]
            ]
        ),
        '歯': generateMockData(
            '歯',
            401,
            ["歯科クリニック", "デンタルオフィス", "矯正歯科", "ホワイトニングサロン", "審美歯科"],
            [
                ["ホワイトニング", "オフィス"], ["マウスピース矯正", "インビザライン"],
                ["セラミック", "インプラント"], ["ワイヤー矯正", "部分矯正"], ["クリーニング", "歯石除去"]
            ]
        )
    };

    return (
        <div className="min-h-screen bg-white pb-24 relative font-sans">
            {/* ▼▼▼ Consolidated Header ▼▼▼ */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">

                {/* 1. Logo & Login Row */}
                <div className="h-14 flex items-center justify-between px-4">
                    <div className="text-xl font-bold text-gray-800 tracking-tight">Clinicity</div>
                    <div className="flex gap-2">
                        <button
                            onClick={onEnterAdminMode}
                            className="text-sm font-medium text-gray-600 px-3 py-2 rounded hover:bg-gray-50 transition-colors"
                        >
                            <span className="hidden md:inline">管理者画面</span>
                            <span className="md:hidden">管理</span>
                        </button>
                        <button
                            onClick={() => console.log('Login clicked')}
                            className="text-sm font-bold bg-gray-900 text-white px-4 py-2 rounded shadow-sm hover:bg-black transition-colors"
                        >
                            ログイン
                        </button>
                    </div>
                </div>

                {/* 2. Search Bar Row (Compact) */}
                <div className="px-4 pb-3">
                    <div className="relative flex items-center shadow-sm rounded-full bg-gray-50 border border-gray-100">
                        <input
                            type="text"
                            placeholder="AIに相談する..."
                            className="w-full pl-6 pr-14 py-3 rounded-full bg-transparent text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                        />
                        <button className="absolute right-2 p-1.5 bg-accent-gradient rounded-full text-white shadow-md hover:opacity-90 active:scale-95 transition-all">
                            <Send size={16} />
                        </button>
                    </div>
                </div>

                {/* 3. Category Tabs Row (No top padding) */}
                <div className="px-4 pb-0">
                    <div className="grid grid-cols-5 gap-2 w-full">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    scrollPositions.current[activeTab] = window.scrollY;
                                    setActiveTab(cat);
                                }}
                                className={`pb-3 text-[13px] font-bold transition-all relative ${activeTab === cat
                                    ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </header>
            {/* ▲▲▲ Consolidated Header End ▲▲▲ */}

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
                            onClick={() => {
                                localStorage.setItem('clinicity_location_allowed', 'true');
                                setLocationAllowed(true);
                            }}
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
                                <div
                                    key={shop.id}
                                    onClick={() => onShopClick(shop.id)}
                                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
                                >
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
                                                <span className="text-sm font-bold text-yellow-500 ml-1">{shop.rating.toFixed(1)}</span>

                                                {/* Rating Counts */}
                                                <span className="text-[10px] text-gray-400 ml-2">
                                                    口コミ {shop.reviewCount}件 症例 {shop.caseCount}件
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