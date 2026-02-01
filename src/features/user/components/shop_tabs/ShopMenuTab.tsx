import React from 'react';

type MenuItem = {
  id: number;
  name: string;
  time: string;
  price: string;
  description: string;
};

type MenuCategory = {
  id: number;
  name: string;
  items: MenuItem[];
};

const dummyMenu: MenuCategory[] = [
  {
    id: 1,
    name: 'フェイシャル',
    items: [
      {
        id: 11,
        name: '美白レーザーフェイシャル',
        time: '60分',
        price: '¥18,700（税込）',
        description: 'くすみ・シミが気になる方におすすめの定番メニューです。',
      },
      {
        id: 12,
        name: '毛穴クリーンピーリング',
        time: '45分',
        price: '¥12,100（税込）',
        description: '毛穴の黒ずみ・ざらつきをやさしくケアします。',
      },
    ],
  },
  {
    id: 2,
    name: '脱毛',
    items: [
      {
        id: 21,
        name: '全身医療脱毛（顔・VIO除く）',
        time: '90分〜120分',
        price: '¥198,000（税込）〜',
        description: '人気No.1の全身脱毛プラン。肌質に合わせて出力を調整します。',
      },
      {
        id: 22,
        name: 'VIO医療脱毛',
        time: '45分',
        price: '¥49,500（税込）〜',
        description: '痛みを抑えた照射で、デリケートゾーンも安心して施術できます。',
      },
    ],
  },
  {
    id: 3,
    name: 'ボディ',
    items: [
      {
        id: 31,
        name: '脂肪溶解注射（部分）',
        time: '30分',
        price: '¥27,500（税込）〜',
        description: '二の腕・お腹など、気になる部分をピンポイントでケアします。',
      },
      {
        id: 32,
        name: 'ボディタイトニングレーザー',
        time: '60分',
        price: '¥33,000（税込）',
        description: 'たるみが気になる部位を引き締め、ハリ感を高めます。',
      },
    ],
  },
];

const ShopMenuTab: React.FC = () => {
  return (
    <div className="px-4 pb-6 space-y-6">
      {dummyMenu.map((category) => (
        <section key={category.id}>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            {category.name}
          </h2>
          <div className="space-y-3">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="flex items-stretch justify-between gap-3 rounded-xl border border-gray-100 bg-white shadow-sm px-3 py-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
                    <span className="px-1.5 py-0.5 rounded-full bg-gray-100">
                      所要時間 {item.time}
                    </span>
                    <span className="font-semibold text-[#007AFF]">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <button className="whitespace-nowrap rounded-full border border-[#007AFF] px-3 py-1.5 text-xs font-semibold text-[#007AFF] hover:bg-[#007AFF] hover:text-white transition-colors">
                    予約する
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ShopMenuTab;

