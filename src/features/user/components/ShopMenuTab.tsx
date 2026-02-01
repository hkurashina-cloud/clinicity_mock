import React from 'react';
import { Clock } from 'lucide-react';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  time: string;
  image: string;
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'ハイフ（HIFU）全顔',
    description:
      'たるみ・小顔ケアに人気の高密度焦点式超音波。フェイスラインをすっきりさせたい方に。',
    price: '¥39,800',
    time: '60分',
    image: '/images/skin/004.webp',
  },
  {
    id: 2,
    name: 'ボトックス注射（エラ）',
    description:
      '食いしばり・エラ張りが気になる方に。自然な小顔効果を目指します。',
    price: '¥29,800',
    time: '30分',
    image: '/images/skin/005.webp',
  },
  {
    id: 3,
    name: 'ヒアルロン酸注入（ほうれい線）',
    description:
      '気になるほうれい線をふっくらと持ち上げ、若々しい印象へ導きます。',
    price: '¥44,000',
    time: '45分',
    image: '/images/skin/006.webp',
  },
  {
    id: 4,
    name: 'ピコレーザートーニング',
    description:
      'シミ・くすみ・肝斑にアプローチし、ワントーン明るい透明感のある肌へ。',
    price: '¥16,500',
    time: '30分',
    image: '/images/skin/007.webp',
  },
];

const ShopMenuTab: React.FC = () => {
  return (
    <div className="px-4 pb-6 space-y-3">
      {menuItems.map((menu) => (
        <div
          key={menu.id}
          className="flex gap-3 rounded-2xl border border-gray-100 bg-white shadow-sm px-3 py-3"
        >
          {/* 左: サムネイル */}
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 中央: テキスト情報 */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                {menu.name}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-gray-500 line-clamp-3">
                {menu.description}
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500">
              <Clock size={12} className="text-blue-700" />
              <span>所要時間 {menu.time}</span>
            </div>
          </div>

          {/* 右: 料金 + 予約ボタン */}
          <div className="flex flex-col items-end justify-between text-right">
            <div>
              <p className="text-xs font-medium text-gray-400">税込</p>
              <p className="text-base font-bold text-blue-700 font-mono">
                {menu.price}
              </p>
            </div>
            <button className="mt-2 rounded-full bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-600 active:scale-95 transition">
              予約
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopMenuTab;