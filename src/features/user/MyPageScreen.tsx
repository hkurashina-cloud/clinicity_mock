import React, { useState } from 'react';
import { Menu, ChevronRight, Calendar } from 'lucide-react';

function MyPageScreen() {
    const [activeTab, setActiveTab] = useState<'reserved' | 'history'>('reserved');

    // Mock User Data
    const user = {
        name: "nako_.",
        rank: "シルバー",
        points: 79,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
    };

    // Mock Doctors Data
    const doctors = [
        { id: 1, name: "Dr. Elena", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80" },
        { id: 2, name: "Dr. Ken", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&q=80" },
        { id: 3, name: "Yuka", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" },
        { id: 4, name: "Satoshi", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" },
        { id: 5, name: "Ami", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" },
    ];

    // Mock Reservation Data (Current)
    const currentReservation = {
        id: 101,
        date: "2026年 1月 15日 (木)",
        time: "17:30",
        salonName: "BuildUpBeauty",
        area: "表参道",
        menu: "【ハンドジェル】ワンカラーorラメグラデーション",
        price: "¥3,980",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=100&q=80",
        tags: ["全員", "オフ無料"]
    };

    // Mock History Data
    const historyReservations = [
        {
            id: 201,
            date: "2025年 12月 20日 (土)",
            time: "11:00",
            salonName: "White Dental",
            area: "新宿",
            menu: "オフィスホワイトニング 1回集中",
            price: "¥12,000",
            image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=100&q=80",
            tags: ["再来"]
        },
        {
            id: 202,
            date: "2025年 11月 10日 (月)",
            time: "18:30",
            salonName: "Head Spa TOKYO",
            area: "銀座",
            menu: "極上ドライヘッドスパ 60分",
            price: "¥6,500",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db48e?w=100&q=80",
            tags: ["新規"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans text-gray-800">

            {/* 1. Profile Header */}
            <header className="bg-white pt-safe-top px-5 pb-6 border-b border-gray-100 relative">
                <div className="absolute top-4 right-5">
                    <Menu size={24} className="text-gray-600" />
                </div>

                <div className="flex flex-col items-center mt-4">
                    <div className="w-20 h-20 rounded-full border border-gray-100 p-0.5 mb-3 shadow-sm">
                        <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md font-bold border border-gray-200">{user.rank}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center text-[8px] font-bold text-white">P</div>
                        <span className="text-sm font-bold text-gray-700">{user.points}<span className="text-xs font-normal ml-0.5">P</span></span>
                    </div>
                </div>
            </header>

            <main className="flex flex-col gap-6 p-5">

                {/* 2. Campaign Banner */}
                <div className="w-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-4 shadow-md text-white flex items-center justify-between relative overflow-hidden group">
                    <div className="relative z-10">
                        <span className="block text-[10px] font-bold opacity-80 mb-0.5">期間限定</span>
                        <h3 className="font-bold text-lg leading-tight">¥1,000分ポイント<br />を受け取る</h3>
                    </div>
                    <ChevronRight className="relative z-10" />
                    <div className="absolute right-0 bottom-0 w-24 h-24 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
                </div>

                {/* 3. Recommended Doctors */}
                <section>
                    <h3 className="font-bold text-gray-900 mb-3 px-1">あなたにおすすめのドクター</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5">
                        {doctors.map(doc => (
                            <div key={doc.id} className="flex flex-col items-center gap-2 shrink-0 w-16">
                                <div className="w-14 h-14 rounded-full border border-gray-200 p-0.5">
                                    <img src={doc.image} alt={doc.name} className="w-full h-full rounded-full object-cover" />
                                </div>
                                <span className="text-[10px] font-medium text-gray-600 truncate w-full text-center">{doc.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Reservations & History Tabs */}
                <section>
                    {/* Custom Tab Switcher */}
                    <div className="flex p-1 bg-gray-200 rounded-lg mb-4">
                        <button
                            onClick={() => setActiveTab('reserved')}
                            className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${activeTab === 'reserved' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            予約中
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${activeTab === 'history' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            来店履歴
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="animate-fade-in">
                        {activeTab === 'reserved' ? (
                            /* Reserved Card */
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 flex gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                                        <img src={currentReservation.image} alt="salon" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                                        <h3 className="text-xs font-bold text-gray-900 truncate mb-1">{currentReservation.salonName}</h3>
                                        <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
                                            <Calendar size={10} />
                                            <span className="font-bold text-gray-700">{currentReservation.date} {currentReservation.time}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-400 truncate">{currentReservation.menu}</p>
                                        <div className="flex justify-between items-end mt-1">
                                            <span className="text-xs font-bold text-gray-900">{currentReservation.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-3 pb-3">
                                    <button className="w-full py-2 bg-white border border-pink-400 text-pink-500 font-bold rounded-lg text-xs hover:bg-pink-50 transition-colors">
                                        もう一度予約する
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* History List */
                            <div className="flex flex-col gap-3">
                                {historyReservations.map(res => (
                                    <div key={res.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden opacity-80">
                                        <div className="p-3 flex gap-3">
                                            <div className="w-14 h-14 rounded-lg bg-gray-200 shrink-0 overflow-hidden grayscale">
                                                <img src={res.image} alt="salon" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-xs font-bold text-gray-900 truncate">{res.salonName}</h3>
                                                    <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">施術完了</span>
                                                </div>
                                                <div className="text-[10px] text-gray-500">{res.date}</div>
                                                <p className="text-[10px] text-gray-400 truncate">{res.menu}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

            </main>
        </div>
    );
}

export default MyPageScreen;
