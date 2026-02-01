import React from 'react';

type Post = {
  id: number;
  imageAlt: string;
  caption: string;
};

const dummyPosts: Post[] = [
  { id: 1, imageAlt: '小顔治療ビフォーアフター', caption: '小顔治療でフェイスラインすっきり。' },
  { id: 2, imageAlt: '美肌レーザー施術風景', caption: '最新レーザーで透明感アップ。' },
  { id: 3, imageAlt: '院内受付の写真', caption: '清潔感ある受付でお出迎え。' },
  { id: 4, imageAlt: '施術室の写真', caption: 'プライベート空間でゆったり施術。' },
  { id: 5, imageAlt: 'ドクター集合写真', caption: '経験豊富なドクターが担当します。' },
  { id: 6, imageAlt: 'スキンケア商品の写真', caption: 'ホームケアもトータルサポート。' },
  { id: 7, imageAlt: 'メイクルームの写真', caption: '施術後に整えられるメイクルーム。' },
  { id: 8, imageAlt: '待合スペースの写真', caption: '落ち着いた雰囲気の待合スペース。' },
];

const ShopPostsTab: React.FC = () => {
  return (
    <div className="px-4 pb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-900">店舗の投稿</h2>
        <button className="text-xs font-medium text-[#007AFF] hover:underline">
          すべて見る
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {dummyPosts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-1 cursor-pointer group"
          >
            <div className="relative w-full pb-[100%] rounded-lg overflow-hidden bg-gray-200">
              {/* 実際はここに <img> を入れる */}
              <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-500 px-1 text-center">
                {post.imageAlt}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <p className="text-[10px] text-gray-700 line-clamp-2">
              {post.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPostsTab;

