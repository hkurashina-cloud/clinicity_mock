import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  CreditCard,
  DoorOpen,
  Wifi,
  Car,
  Star,
} from 'lucide-react';

const ShopSalonInfoTab: React.FC = () => {
  return (
    <div className="px-4 pb-6 space-y-6">
      {/* 1. 地図エリア */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-900">地図</h2>
        <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col items-center text-gray-400 text-xs">
            <MapPin size={32} className="mb-1 text-blue-700" />
            <span>Googleマップ風プレビュー</span>
          </div>
          <div className="absolute right-3 bottom-3">
            <button className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm hover:bg-white">
              地図を見る
            </button>
          </div>
        </div>
      </section>

      {/* 2. 基本情報 */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">基本情報</h2>
        <div className="space-y-3 rounded-2xl border border-gray-100 bg-white px-3 py-3 shadow-sm">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 text-blue-700" />
            <div className="text-xs leading-relaxed text-gray-700">
              〒150-0001
              <br />
              東京都渋谷区神宮前1-2-3 ○○ビル 5F
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="mt-0.5 text-blue-700" />
            <div className="text-xs leading-relaxed text-gray-700">
              03-1234-5678
              <br />
              （受付時間 10:00〜19:30）
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} className="mt-0.5 text-blue-700" />
            <div className="text-xs leading-relaxed text-gray-700">
              平日：10:00〜20:00
              <br />
              土日祝：10:00〜19:00
              <br />
              定休日：火曜日
            </div>
          </div>
        </div>
      </section>

      {/* 3. 設備・サービス */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">設備・サービス</h2>
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-50/60 px-2 py-3">
            <CreditCard size={18} className="text-blue-700" />
            <span className="font-medium text-gray-800">カード決済</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-50/60 px-2 py-3">
            <DoorOpen size={18} className="text-blue-700" />
            <span className="font-medium text-gray-800">完全個室</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-50/60 px-2 py-3">
            <Star size={18} className="text-blue-700" />
            <span className="font-medium text-gray-800">女性医師在籍</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-50/60 px-2 py-3">
            <Wifi size={18} className="text-blue-700" />
            <span className="font-medium text-gray-800">Wi-Fi</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-50/60 px-2 py-3">
            <Car size={18} className="text-blue-700" />
            <span className="font-medium text-gray-800">駐車場</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-50/60 px-2 py-3">
            <CreditCard size={18} className="text-blue-700" />
            <span className="font-medium text-gray-800">ポイント利用</span>
          </div>
        </div>
      </section>

      {/* 4. スタッフ紹介（横スクロール） */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">スタッフ</h2>
        <div className="-mx-4 overflow-x-auto px-4 pb-1">
          <div className="flex gap-3">
            {[
              {
                name: '山田 花子',
                role: '院長 / 美容皮膚科医',
                color: 'bg-blue-700',
              },
              {
                name: '佐藤 太郎',
                role: '看護師',
                color: 'bg-sky-500',
              },
              {
                name: '中村 彩',
                role: 'カウンセラー',
                color: 'bg-indigo-500',
              },
              {
                name: '鈴木 結衣',
                role: 'コンシェルジュ',
                color: 'bg-cyan-500',
              },
            ].map((staff) => (
              <div
                key={staff.name}
                className="w-32 flex-shrink-0 rounded-2xl border border-gray-100 bg-white px-3 py-3 shadow-sm"
              >
                <div className="mb-2 flex justify-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white ${staff.color}`}
                  >
                    {staff.name.charAt(0)}
                  </div>
                </div>
                <p className="text-xs font-semibold text-gray-900 text-center line-clamp-1">
                  {staff.name}
                </p>
                <p className="mt-0.5 text-[11px] text-blue-700 text-center line-clamp-2">
                  {staff.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopSalonInfoTab;