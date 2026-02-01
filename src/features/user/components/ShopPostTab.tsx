import React from 'react';

type Post = {
  id: number;
  image: string;
  alt: string;
};

const posts: Post[] = Array.from({ length: 12 }).map((_, i) => {
  const prefix = String((i % 9) + 1).padStart(3, '0');
  return {
    id: i + 1,
    image: `/images/skin/${prefix}.webp`,
    alt: `施術イメージ ${i + 1}`,
  };
});

const ShopPostsTab: React.FC = () => {
  return (
    <div className="pb-6">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">店舗の投稿</h2>
        <button className="text-xs font-medium text-blue-700 hover:text-blue-600">
          すべて見る
        </button>
      </div>

      <div className="grid grid-cols-3 gap-0.5">
        {posts.map((post) => (
          <button
            key={post.id}
            className="relative aspect-square bg-gray-100 overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShopPostsTab;