import React, { useState } from 'react';
import { MessageCircle, ChevronRight, Mail } from 'lucide-react';

function NotificationScreen({ onNavigateToSearch }: { onNavigateToSearch?: () => void }) {
    const [activeTab, setActiveTab] = useState<'notification' | 'message'>('message');
    // --- TOGGLE THIS VARIABLE to switch between Message List (true) and Empty State (false) ---
    const [hasMessages, setHasMessages] = useState<boolean>(true);

    // Mock Messages Data (Reused)
    const messages = [
        {
            id: 1,
            name: "BuildUpBeauty",
            message: "本日はご来店ありがとうございました！またのご利用をお待ちしております。",
            time: "2時間前",
            unread: true,
            avatar: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=100&q=80"
        },
        {
            id: 2,
            name: "White Dental Clinic",
            message: "次回の予約確認です。1月20日14:00〜お待ちしております。",
            time: "昨日",
            unread: false,
            avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80"
        },
        {
            id: 3,
            name: "Relax Facial 表参道",
            message: "お得なキャンペーン情報のご案内です✨ 詳しくはこちらをご確認ください。",
            time: "3日前",
            unread: false,
            avatar: "https://images.unsplash.com/photo-1619895862047-e64331a2ba3d?w=100&q=80"
        },
        {
            id: 4,
            name: "Men's Datsumo 池袋店",
            message: "コースの変更について承知いたしました。当日お待ちしております。",
            time: "1週間前",
            unread: false,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
        },
        {
            id: 5,
            name: "Eco Skin Clinic",
            message: "予約が確定しました。",
            time: "2週間前",
            unread: false,
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans flex flex-col">
            {/* 1. Header with Tabs */}
            <header className="pt-safe-top bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="px-16 py-3">
                    <div className="flex bg-gray-100 p-1 rounded-full relative">
                        {/* Animated Sliding Background (Simplified with CSS classes) */}
                        <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-out ${activeTab === 'notification' ? 'left-1' : 'left-[50%]'}`}></div>

                        <button
                            onClick={() => setActiveTab('notification')}
                            className={`flex-1 relative z-10 py-1.5 text-xs font-bold text-center transition-colors ${activeTab === 'notification' ? 'text-gray-900' : 'text-gray-400'}`}
                        >
                            お知らせ
                        </button>
                        <button
                            onClick={() => setActiveTab('message')}
                            className={`flex-1 relative z-10 py-1.5 text-xs font-bold text-center transition-colors ${activeTab === 'message' ? 'text-gray-900' : 'text-gray-400'}`}
                        >
                            メッセージ
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col p-5">

                {/* Tab Content: Notification */}
                {activeTab === 'notification' && (
                    <div className="flex flex-col items-center justify-center flex-1 text-gray-400 gap-4 animate-fade-in">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Mail size={32} className="opacity-50" />
                        </div>
                        <p className="text-sm font-bold">新しいお知らせはありません</p>
                    </div>
                )}

                {/* Tab Content: Message */}
                {activeTab === 'message' && (
                    <div className="flex flex-col gap-4 animate-fade-in h-full">

                        {/* Toggle switch for demo */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setHasMessages(!hasMessages)}
                                className="text-[10px] text-gray-400 border border-gray-200 px-2 py-1 rounded hover:bg-gray-100"
                            >
                                {hasMessages ? '検証用: 空にする' : '検証用: リスト表示'}
                            </button>
                        </div>

                        {hasMessages ? (
                            /* Pattern A: Message List */
                            <div className="flex flex-col gap-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                {messages.map(msg => (
                                    <div key={msg.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0 relative">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0 overflow-hidden border border-gray-100">
                                            <img src={msg.avatar} alt={msg.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <h4 className="text-sm font-bold text-gray-900 truncate pr-2">{msg.name}</h4>
                                                <span className="text-[10px] text-gray-400 shrink-0">{msg.time}</span>
                                            </div>
                                            <p className={`text-xs truncate ${msg.unread ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                                                {msg.message}
                                            </p>
                                        </div>

                                        {/* Unread Dot */}
                                        {msg.unread && (
                                            <div className="w-2.5 h-2.5 bg-accent-gradient rounded-full absolute right-4 top-1/2 -translate-y-1/2 shadow-sm"></div>
                                        )}
                                    </div>
                                ))}
                                <div className="p-3 text-center border-t border-gray-50">
                                    <button className="text-xs text-gray-400 font-bold hover:text-gray-600">すべてのメッセージを見る</button>
                                </div>
                            </div>
                        ) : (
                            /* Pattern B: Empty State */
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-6 text-primary">
                                    <MessageCircle size={40} className="opacity-80" />
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 mb-2">まだメッセージはありません</h4>
                                <p className="text-xs text-gray-500 mb-8 leading-relaxed">
                                    気になることは<br />直接メッセージで聞こう！<br />
                                    <span className="text-[10px] text-gray-400 mt-2 block">サロンからのお得な情報も届きます。</span>
                                </p>
                                <button
                                    onClick={onNavigateToSearch}
                                    className="w-full max-w-[240px] py-3.5 bg-accent-gradient text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
                                >
                                    <span>ビューティストを探す</span>
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </main>
        </div>
    );
}

export default NotificationScreen;
