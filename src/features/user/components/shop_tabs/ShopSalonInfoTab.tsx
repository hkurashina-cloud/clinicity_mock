import React from 'react';

const ShopSalonInfoTab: React.FC = () => {
  return (
    <div className="px-4 pb-6 space-y-6">
      {/* 基本情報 */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">基本情報</h2>
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-100">
          <div className="px-3 py-3">
            <p className="text-[11px] font-medium text-gray-400 mb-0.5">
              住所
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              〒150-0001
              <br />
              東京都渋谷区神宮前1-2-3 ○○ビル 5F
            </p>
          </div>
          <div className="px-3 py-3">
            <p className="text-[11px] font-medium text-gray-400 mb-1">
              地図
            </p>
            <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center text-[11px] text-gray-500">
              地図プレビュー（実際は地図コンポーネントを表示）
            </div>
          </div>
          <div className="px-3 py-3 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] font-medium text-gray-400 mb-0.5">
                営業時間
              </p>
              <p className="text-xs text-gray-800 leading-relaxed">
                平日 10:00〜20:00
                <br />
                土日祝 10:00〜19:00
                <br />
                定休日：火曜日
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-gray-400 mb-0.5">
                設備・サービス
              </p>
              <ul className="space-y-0.5 text-xs text-gray-800">
                <li>・完全個室の施術室</li>
                <li>・パウダールーム完備</li>
                <li>・クレジットカード / QR 決済可</li>
                <li>・Wi-Fi / 充電スペースあり</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* スタッフ紹介 */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">スタッフ紹介</h2>
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm px-3 py-3 space-y-3">
          {[
            {
              id: 1,
              name: '山田 花子',
              role: '院長 / 美容皮膚科医',
              comment:
                'お一人おひとりに合わせた自然な仕上がりを大切にしています。',
            },
            {
              id: 2,
              name: '佐藤 太郎',
              role: '看護師',
              comment:
                '痛みや不安が少しでも和らぐよう、丁寧なカウンセリングを心がけています。',
            },
            {
              id: 3,
              name: '中村 彩',
              role: 'コンシェルジュ',
              comment:
                '初めての方でも安心して通っていただけるよう、全力でサポートします。',
            },
          ].map((staff) => (
            <div key={staff.id} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-[11px] text-gray-500 shrink-0">
                Photo
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900">
                  {staff.name}
                </p>
                <p className="text-[11px] text-[#007AFF] mb-0.5">{staff.role}</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {staff.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShopSalonInfoTab;

