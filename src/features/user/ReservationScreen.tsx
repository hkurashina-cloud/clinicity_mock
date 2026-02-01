import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, Bell, Search } from 'lucide-react';

function ReservationScreen({ onNavigateToSearch }: { onNavigateToSearch?: () => void }) {
    const navigate = useNavigate();

    // --- TOGGLE THIS VARIABLE to switch between Pattern A (true) and Pattern B (false) ---
    const [hasReservation, setHasReservation] = useState<boolean>(true);

    // Mock Reservation Data
    const reservation = {
        date: "2026年 1月 15日 (木)",
        time: "17:30",
        salonName: "BuildUpBeauty",
        menu: "【ハンドジェル】ワンカラーorラメグラデーション",
        price: "¥3,980",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=100&q=80",
        tags: ["全員", "オフ無料"]
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">
            {/* 1. Header (Sticky) */}
            <header className="pt-safe-top bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="px-5 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">あなたの予約</h2>
                    {!hasReservation ? (
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <Bell size={24} />
                        </button>
                    ) : (
                        <button className="text-xs text-gray-500 font-bold hover:text-gray-800 transition-colors">
                            もっと見る
                        </button>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="p-5 flex flex-col items-center h-full">

                {/* Temporary Toggle for Demo */}
                <div className="w-full mb-4 flex justify-end">
                    <button
                        onClick={() => setHasReservation(!hasReservation)}
                        className="text-[10px] text-gray-400 border border-gray-200 px-2 py-1 rounded hover:bg-gray-100"
                    >
                        {hasReservation ? '検証用: 予約なしにする' : '検証用: 予約ありにする'}
                    </button>
                </div>

                {hasReservation ? (
                    /* Pattern A: Has Reservation */
                    <div className="w-full animate-fade-in">
                        {/* Campaign Banner (Optional) */}
                        <div className="mb-4 bg-gradient-to-r from-orange-100 to-amber-50 border border-orange-200 rounded-lg p-3 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-2">
                                <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">GET</span>
                                <span className="text-xs text-orange-800 font-bold">口コミ投稿で<span className="text-sm">500pt</span>プレゼント！</span>
                            </div>
                            <ChevronRight size={16} className="text-orange-400" />
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 flex gap-4">
                                {/* Salon Image */}
                                <div className="w-20 h-20 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                                    <img src={reservation.image} alt="salon" className="w-full h-full object-cover" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between py-0.5">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">{reservation.salonName}</h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
                                            <Calendar size={12} />
                                            <span className="font-bold text-gray-700">{reservation.date} <span className="text-primary ml-1">{reservation.time}〜</span></span>
                                        </div>
                                        <p className="text-[11px] text-gray-400 line-clamp-1">{reservation.menu}</p>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div className="flex gap-1">
                                            {reservation.tags.map(tag => (
                                                <span key={tag} className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-[4px]">{tag}</span>
                                            ))}
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">{reservation.price}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="px-4 pb-4">
                                <button
                                    onClick={() => navigate('/reserve', { state: { shopId: 1, shopName: reservation.salonName } })}
                                    className="w-full py-2.5 bg-white border border-blue-500 text-blue-500 font-bold rounded-xl text-xs hover:bg-blue-50 transition-colors active:scale-[0.98]"
                                >
                                    もう一度予約する
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Pattern B: No Reservation */
                    <div className="flex flex-col items-center justify-center flex-1 py-10 animate-fade-in w-full">

                        {/* Illustration */}
                        <div className="w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center mb-6 text-primary relative">
                            <Search size={48} className="opacity-80" />
                            <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-accent-gradient flex items-center justify-center">
                                <span className="text-white text-xs font-bold">?</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 text-center mb-8 leading-snug">
                            あなたにぴったりの<br />
                            ビューティストに出会おう！
                        </h3>

                        {/* Action Button */}
                        <div className="w-full px-4 fixed bottom-24 left-0 right-0">
                            <button
                                onClick={onNavigateToSearch}
                                className="w-full max-w-sm mx-auto block py-4 bg-accent-gradient text-white font-bold rounded-full shadow-lg active:scale-95 transition-transform"
                            >
                                さっそく検索する
                            </button>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default ReservationScreen;
