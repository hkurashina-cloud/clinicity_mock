import React from 'react';
import { Star } from 'lucide-react';

type Review = {
  id: number;
  userName: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  reply?: string;
};

const reviews: Review[] = [
  {
    id: 1,
    userName: '田中さん（30代 / 女性）',
    date: '2026/01/10',
    rating: 5,
    title: 'ハイフ施術でフェイスラインがすっきり',
    body: '初めてのハイフで不安でしたが、カウンセリングがとても丁寧で安心できました。施術後数週間でフェイスラインがスッキリしてきて、写真写りも良くなった気がします。',
    reply:
      'この度はハイフ施術をご利用いただきありがとうございます。効果を実感いただけて大変嬉しく思います。今後もご満足いただけるよう、照射条件の微調整を行いながらサポートさせていただきます。',
  },
  {
    id: 2,
    userName: 'Y.M さん（20代 / 女性）',
    date: '2025/12/22',
    rating: 5,
    title: '効果を実感できて大満足です',
    body: 'ピコレーザー3回目ですが、シミが少しずつ薄くなってきているのを実感しています。看護師さんが毎回肌の状態を見ながら照射してくれるので安心です。',
    reply:
      '継続して通っていただきありがとうございます。シミ治療は回数を重ねることでより効果を感じていただけますので、一緒に理想のお肌を目指していきましょう。',
  },
  {
    id: 3,
    userName: 'S.K さん（40代 / 女性）',
    date: '2025/11/05',
    rating: 4,
    title: '院内がとても清潔で落ち着きます',
    body: 'ヒアルロン酸注入でお世話になりました。仕上がりが自然で「何をしたの？」と聞かれないくらい、でも自分でははっきり違いが分かります。人気の時間帯は少し待つこともあるので★4つにしました。',
  },
];

const renderStars = (value: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    stars.push(
      <Star
        key={i}
        size={14}
        className={i <= value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
      />
    );
  }
  return stars;
};

const ShopReviewsTab: React.FC = () => {
  const average = 4.8;
  const totalCount = 87;

  return (
    <div className="px-4 pb-6 space-y-6">
      {/* ヘッダー（総合評価） */}
      <section className="mt-3 flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-4 py-4 text-center shadow-sm">
        <p className="text-[11px] font-medium text-gray-500">総合評価</p>
        <div className="mt-1 flex items-baseline justify-center gap-1">
          <span className="text-3xl font-semibold text-gray-900">
            {average.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">/ 5.0</span>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1">
          {renderStars(Math.round(average))}
          <span className="ml-1 text-[11px] text-gray-500">
            {totalCount}件の口コミ
          </span>
        </div>
      </section>

      {/* レビューリスト */}
      <section className="space-y-3">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-gray-100 bg-white px-3 py-3 shadow-sm"
          >
            <div className="mb-1.5 flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-gray-900">
                  {review.userName}
                </p>
                <p className="text-[11px] text-gray-400">{review.date}</p>
              </div>
              <div className="flex flex-col items-end text-right">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-gray-900">
                    {review.rating.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-gray-400">/ 5.0</span>
                </div>
                <div className="mt-0.5 flex items-center gap-0.5">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>

            <p className="mt-1 text-xs font-semibold text-gray-900">
              {review.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-gray-800">
              {review.body}
            </p>

            {review.reply && (
              <div className="mt-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                <p className="text-[11px] font-medium text-gray-500 mb-0.5">
                  店舗からの返信
                </p>
                <p className="text-[11px] leading-relaxed text-gray-700">
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