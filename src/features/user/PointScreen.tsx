import React, { useState, useEffect } from 'react';
import { Sun, RefreshCw } from 'lucide-react';

function PointScreen() {
    const [currentPoints] = useState(1250);
    const [memberNumber] = useState('1234-5678-9012');
    const [brightness, setBrightness] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    // Simulate refresh
    const handleRefresh = () => {
        setLastUpdated(new Date());
    };

    // Format time
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    };

    // Auto-brightness simulation effect
    useEffect(() => {
        if (brightness) {
            document.body.style.backgroundColor = '#fff';
        }
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [brightness]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-500 to-cyan-400 font-sans">
            {/* Header */}
            <header className="pt-safe-top px-4 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-white text-xl font-bold">ポイントカード</h1>
                    <button
                        onClick={handleRefresh}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>
            </header>

            {/* Main Card */}
            <main className="px-4 pb-32">
                {/* Brightness Notice */}
                <div
                    onClick={() => setBrightness(!brightness)}
                    className={`mb-4 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all cursor-pointer ${
                        brightness
                            ? 'bg-yellow-400 text-yellow-900'
                            : 'bg-white/20 text-white'
                    }`}
                >
                    <Sun size={18} className={brightness ? 'animate-pulse' : ''} />
                    <span className="text-sm font-medium">
                        {brightness ? '画面を明るくしています' : '画面を明るくして提示してください'}
                    </span>
                </div>

                {/* Card Container */}
                <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all ${
                    brightness ? 'ring-4 ring-yellow-400' : ''
                }`}>
                    {/* Card Header - Points */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-5">
                        <div className="text-white/70 text-xs font-medium mb-1">現在のポイント</div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-white tracking-tight">
                                {currentPoints.toLocaleString()}
                            </span>
                            <span className="text-xl font-bold text-white/90">pt</span>
                        </div>
                        <div className="mt-2 text-white/60 text-xs">
                            最終更新: {formatTime(lastUpdated)}
                        </div>
                    </div>

                    {/* Barcode Section */}
                    <div className="px-6 py-6 border-b border-gray-100">
                        <div className="text-center text-xs text-gray-500 mb-3 font-medium">
                            バーコード
                        </div>
                        <div className="flex justify-center">
                            <div className="w-full max-w-[280px] h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                {/* Simulated Barcode Pattern */}
                                <div className="flex items-end gap-[2px] h-12">
                                    {Array.from({ length: 50 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="bg-gray-900"
                                            style={{
                                                width: Math.random() > 0.5 ? '2px' : '1px',
                                                height: `${Math.random() * 30 + 70}%`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="px-6 py-6">
                        <div className="text-center text-xs text-gray-500 mb-3 font-medium">
                            QRコード
                        </div>
                        <div className="flex justify-center">
                            <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-2xl p-3 shadow-inner">
                                {/* Simulated QR Code Pattern */}
                                <div className="w-full h-full grid grid-cols-11 gap-[2px]">
                                    {Array.from({ length: 121 }).map((_, i) => {
                                        // Create QR-like pattern with position markers
                                        const row = Math.floor(i / 11);
                                        const col = i % 11;
                                        const isCorner =
                                            (row < 3 && col < 3) ||
                                            (row < 3 && col > 7) ||
                                            (row > 7 && col < 3);
                                        const isCornerInner =
                                            (row === 1 && col === 1) ||
                                            (row === 1 && col === 9) ||
                                            (row === 9 && col === 1);
                                        const isFilled = isCorner || isCornerInner || Math.random() > 0.5;

                                        return (
                                            <div
                                                key={i}
                                                className={`rounded-[1px] ${
                                                    isFilled ? 'bg-gray-900' : 'bg-white'
                                                }`}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Member Number Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <div className="text-center">
                            <span className="text-xs text-gray-400 block mb-1">会員No.</span>
                            <span className="text-sm font-mono font-bold text-gray-700 tracking-wider">
                                {memberNumber}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Point History Preview */}
                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <h3 className="text-white font-bold text-sm mb-3">最近のポイント履歴</h3>
                    <div className="space-y-2">
                        {[
                            { date: '1/28', shop: 'Dress 渋谷本院', point: '+50', type: '来店' },
                            { date: '1/15', shop: 'White Dental 銀座', point: '+30', type: '来店' },
                            { date: '1/10', shop: 'キャンペーン', point: '+100', type: 'ボーナス' },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-white/60 text-xs w-10">{item.date}</span>
                                    <div>
                                        <div className="text-white text-sm font-medium">{item.shop}</div>
                                        <div className="text-white/50 text-xs">{item.type}</div>
                                    </div>
                                </div>
                                <span className="text-emerald-300 font-bold text-sm">{item.point}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PointScreen;
