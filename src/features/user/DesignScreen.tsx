import React, { useState } from 'react';
import { Search, Map, Heart } from 'lucide-react';

interface DesignScreenProps {
    onShopClick?: (id: number) => void;
}

function DesignScreen({ onShopClick }: DesignScreenProps) {
    const [activeTab, setActiveTab] = useState('肌');
    const [activeSubTab, setActiveSubTab] = useState('急上昇');
    const categories = ['肌', '脱毛', '顔', 'ボディ', '歯'];
    const subTabs = ['急上昇', '新着', 'フォロー中'];

    type DesignPost = {
        id: number;
        image: string;
        likes: number;
        price: string;
        user: {
            name: string;
            avatar: string;
        };
    };

    // --- Mock Data Generators ---
    const generateDesignPosts = (type: '急上昇' | '新着' | 'フォロー中', count: number): DesignPost[] => {
        const influencers = ["Risa_Beauty", "Dr.Yoko", "Miki_Clinic_Nurse", "Eri_Aesthetic", "Official_Dress"];

        return Array.from({ length: count }).map((_, i) => {
            // Random Image Logic (00-15 prefix, 1-3 suffix)
            const imgSetIndex = Math.floor(Math.random() * 16);
            const imgPrefix = String(imgSetIndex).padStart(2, '0');
            const imgSuffix = Math.floor(Math.random() * 3) + 1;
            const mainImage = `/images/skin/${imgPrefix}${imgSuffix}.webp`;

            // Avatar Image (Different from main if possible, but simplicity is key)
            const avatarSetIndex = Math.floor(Math.random() * 16);
            const avatarPrefix = String(avatarSetIndex).padStart(2, '0');
            const avatarImage = `/images/skin/${avatarPrefix}1.webp`;

            // Type-based Logic
            let likes = 0;
            let name = "";
            let price = "";

            if (type === '急上昇') {
                likes = Math.floor(Math.random() * 4700) + 300; // 300 - 5000
                name = `User_${Math.floor(Math.random() * 10000)}`;
            } else if (type === '新着') {
                likes = Math.floor(Math.random() * 50); // 0 - 50
                name = `NewMember_${Math.floor(Math.random() * 500)}`;
            } else { // フォロー中
                likes = Math.floor(Math.random() * 1000);
                name = influencers[i % influencers.length];
            }

            // Random Price
            const prices = ["¥3,000", "¥5,500", "¥9,800", "¥12,000", "¥29,800", "¥50,000", "¥15,000"];
            price = prices[Math.floor(Math.random() * prices.length)];

            return {
                id: i + (type === '急上昇' ? 0 : type === '新着' ? 1000 : 2000), // Unique IDs partitions
                image: mainImage,
                likes,
                price,
                user: {
                    name,
                    avatar: avatarImage
                }
            };
        });
    };

    // Generate static data once
    const ALL_POSTS = {
        '急上昇': generateDesignPosts('急上昇', 60),
        '新着': generateDesignPosts('新着', 60),
        'フォロー中': generateDesignPosts('フォロー中', 50),
    };

    const displayPosts = ALL_POSTS[activeSubTab as keyof typeof ALL_POSTS] || [];

    return (
        <div className="min-h-screen bg-white pb-24 font-sans">
            {/* 1. Header Area with Category Tabs */}
            <header className="bg-white sticky top-0 z-40">
                {/* Categories */}
                <div className="pt-safe-top bg-white border-b border-gray-50">
                    <div className="px-4 py-3 w-full">
                        <div className="grid grid-cols-5 gap-2 w-full">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className={`w-full rounded-full border py-1.5 text-[11px] font-bold transition-colors ${activeTab === cat
                                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                                        : 'border-gray-200 text-gray-400 bg-white hover:bg-gray-50'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Search Bar & Subtabs */}
                <div className="px-4 py-3 bg-white shadow-sm">
                    {/* Search */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search size={16} />
                            </div>
                            <input
                                type="text"
                                placeholder="ハッシュタグで検索"
                                className="w-full bg-gray-100/80 pl-9 pr-4 py-2.5 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <button className="p-2.5 bg-gray-50 text-gray-600 rounded-full border border-gray-100 shadow-sm active:scale-95 transition-transform">
                            <Map size={20} />
                        </button>
                    </div>

                    {/* Subtabs */}
                    <div className="flex gap-6 border-b border-gray-100">
                        {subTabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveSubTab(tab)}
                                className={`pb-2 text-sm font-bold relative transition-colors ${activeSubTab === tab ? 'text-gray-900' : 'text-gray-400'}`}
                            >
                                {tab}
                                {activeSubTab === tab && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* 2. Image Grid Content */}
            <main className="px-4 mt-2">
                <div className="columns-2 md:columns-3 gap-4">
                    {displayPosts.map((post, idx) => (
                        <div key={post.id} className="break-inside-avoid mb-4 flex flex-col gap-2">
                            {/* Image Card */}
                            <div
                                onClick={() => onShopClick && onShopClick(post.id)}
                                className="relative rounded-xl overflow-hidden bg-gray-200 shadow-sm group cursor-pointer active:opacity-95 transition-opacity"
                                style={{ aspectRatio: idx % 3 === 0 ? '3/4' : '1/1' }} // Masonry-ish feel
                            >
                                <img src={post.image} alt="post" className="w-full h-full object-cover" />

                                {/* Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

                                {/* Like Count (Bottom Left) */}
                                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white">
                                    <Heart size={14} fill="white" className="drop-shadow-sm" />
                                    <span className="text-xs font-bold drop-shadow-md">{post.likes}</span>
                                </div>

                                {/* Price Badge (Bottom Right) */}
                                <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                                    {post.price}
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex items-center gap-2 px-1">
                                <img src={post.user.avatar} className="w-5 h-5 rounded-full object-cover border border-gray-100" />
                                <span className="text-[10px] text-gray-500 font-medium truncate">{post.user.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default DesignScreen;
