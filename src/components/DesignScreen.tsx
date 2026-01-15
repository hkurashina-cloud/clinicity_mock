import React, { useState } from 'react';
import { Search, Map, Heart } from 'lucide-react';

function DesignScreen() {
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

    const DESIGN_POSTS: DesignPost[] = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1570174004693-8f844c130c55?w=400&q=80",
            likes: 128,
            price: "¥12,000",
            user: {
                name: "Yui Beauty",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80"
            }
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1596549216634-927b587b14d2?w=400&q=80",
            likes: 85,
            price: "¥5,500",
            user: {
                name: "Salon Lux",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
            }
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?w=400&q=80",
            likes: 420,
            price: "¥29,800",
            user: {
                name: "Dr. K",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
            }
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1616394584244-a4b521b36622?w=400&q=80",
            likes: 210,
            price: "¥8,900",
            user: {
                name: "Pure Skin",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
            }
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=400&q=80",
            likes: 56,
            price: "¥15,000",
            user: {
                name: "Men's TBC",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
            }
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80",
            likes: 304,
            price: "¥3,000",
            user: {
                name: "White Lab",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
            }
        }
    ];

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
            <main className="px-1 mt-2">
                <div className="grid grid-cols-2 gap-1.5">
                    {DESIGN_POSTS.map((post, idx) => (
                        <div key={post.id} className="flex flex-col gap-2 mb-2">
                            {/* Image Card */}
                            <div
                                className="relative rounded-xl overflow-hidden bg-gray-200 shadow-sm group"
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
