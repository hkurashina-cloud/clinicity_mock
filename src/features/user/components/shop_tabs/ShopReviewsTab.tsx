import React from 'react';

type Review = {
  id: number;
  userName: string;
  date: string;
  rating: number;
  body: string;
  reply?: string;
};

const reviews: Review[] = [
  {
    id: 1,
    userName: 'mako***',
    date: '2026/01/10',
    rating: 5,
    body: '初めての医療脱毛で不安でしたが、カウンセリングがとても丁寧で安心できました。施術中もこまめに声をかけてくださり、痛みもほとんど感じませんでした。',
    reply:
      'この度はご来院いただきありがとうございました。今後も安心して通っていただけるよう、スタッフ一同努めてまいります。',
  },
  {
    id: 2,
    userName: 'rio***',
    date: '2025/12/28',
    rating: 4,
    body: '院内がとてもきれいで、メイクルームも使いやすかったです。人気の時間帯だったためか、少し待ち時間があったので★4つにしましたが、施術自体は大満足です。',
    reply:
      '貴重なご意見をありがとうございます。待ち時間の短縮に向けて、予約枠の見直しを進めております。',
  },
  {
    id: 3,
    userName: 'yuki***',
    date: '2025/11/15',
    rating: 5,
    body: 'ニキビ跡がずっとコンプレックスでしたが、こちらで数回レーザー治療を受けてかなり薄くなりました。先生が毎回肌の状態を見ながら出力を調整してくれるので安心です。',
  },
];

const renderStars = (value: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    stars.push(
      <span
        key={i}
        className={i <= value ? 'text-[#FFD233]' : 'text-gray-300'}
      >
        ★
      </span>
    );
  }
  return stars;
};

const ShopReviewsTab: React.FC = () => {
  const average = 4.8;
  const totalCount = 123;

  return (
    <div className="px-4 pb-6 space-y-6">
      {/* 総合評価 */}
      <section className="rounded-xl border border-gray-100 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium text-gray-400 mb-0.5">
            総合評価
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-gray-900">
              {average.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">/ 5.0</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm">
            <div>{renderStars(Math.round(average))}</div>
            <span className="ml-1 text-[11px] text-gray-500">
              {totalCount}件の口コミ
            </span>
          </div>
        </div>
        <button className="rounded-full border border-[#007AFF] px-3 py-1.5 text-xs font-semibold text-[#007AFF] hover:bg-[#007AFF] hover:text-white transition-colors">
          口コミを投稿する
        </button>
      </section>

      {/* 個別口コミ */}
      <section className="space-y-3">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-xl border border-gray-100 bg-white shadow-sm px-3 py-3"
          >
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <p className="text-xs font-semibold text-gray-900">
                  {review.userName}
                </p>
                <p className="text-[11px] text-gray-400">{review.date}</p>
              </div>
              <div className="text-xs flex items-center gap-1">
                <span className="font-semibold text-gray-900">
                  {review.rating.toFixed(1)}
                </span>
                <span className="text-[11px] text-gray-500">/5.0</span>
                <span className="ml-1">{renderStars(review.rating)}</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-800 leading-relaxed">
              {review.body}
            </p>

            {review.reply && (
              <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 border border-gray-100">
                <p className="text-[11px] font-medium text-gray-500 mb-0.5">
                  店舗からの返信
                </p>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  {review.reply}
                </p>
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
};

export default ShopReviewsTab;

