import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Home, List } from 'lucide-react';

// --- Types ---
type DoctorInfo = {
  id: number;
  name: string;
  image: string;
  role?: string;
};

type ReservationData = {
  clinicName: string;
  clinicArea: string;
  clinicImage: string;
  menuName: string;
  menuTime: string;
  menuPrice: string;
  menuImage: string;
  dateStr: string;
  dayLabel: string;
  dayOfWeek: number; // 0=日, 1=月, 2=火, 3=水, 4=木, 5=金, 6=土
  time: string;
  year: number;
  month: number;
  doctor?: DoctorInfo;
};

export default function ReservationCompleteScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const reservation = location.state as ReservationData | null;

  // Fallback if no data (direct access)
  if (!reservation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">予約情報が見つかりません</p>
          <button
            onClick={() => navigate('/')}
            className="text-blue-500 font-medium"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* Success Animation Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Animated Checkmark */}
        <div className="relative mb-6">
          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-green-100 animate-ping opacity-20" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-green-200 animate-pulse opacity-40" />
          </div>
          {/* Main checkmark circle */}
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30 animate-[bounceIn_0.6s_ease-out]">
            <CheckCircle size={48} className="text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2 animate-[fadeInUp_0.5s_ease-out_0.2s_both]">
          予約が完了しました
        </h1>
        <p className="text-sm text-gray-500 text-center animate-[fadeInUp_0.5s_ease-out_0.3s_both]">
          ご予約ありがとうございます。<br />
          確認メールをお送りしましたのでご確認ください。
        </p>
      </div>

      {/* Reservation Details Card */}
      <div className="px-4 pb-6 animate-[fadeInUp_0.5s_ease-out_0.4s_both]">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-700">予約内容</h2>
          </div>

          {/* Clinic Info */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={reservation.clinicImage}
                  alt={reservation.clinicName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm truncate">
                  {reservation.clinicName}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                  <MapPin size={10} />
                  <span>{reservation.clinicArea}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Info */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={reservation.menuImage}
                  alt={reservation.menuName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm line-clamp-1">
                  {reservation.menuName}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Clock size={11} />
                  <span>{reservation.menuTime}</span>
                </div>
                <div className="text-base font-bold text-green-600 mt-0.5">
                  {reservation.menuPrice}
                </div>
              </div>
            </div>
          </div>

          {/* Doctor / Staff Info */}
          {reservation.doctor && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={reservation.doctor.image}
                    alt={reservation.doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">
                    担当ドクター
                  </div>
                  <div className="font-bold text-gray-900 text-sm">
                    {reservation.doctor.name}
                  </div>
                  {reservation.doctor.role && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      {reservation.doctor.role}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Date & Time Info */}
          <div className="p-4">
            {(() => {
              // 日曜(0)=赤, 土曜(6)=青, 平日=灰色
              const isSunday = reservation.dayOfWeek === 0;
              const isSaturday = reservation.dayOfWeek === 6;
              const bgClass = isSunday
                ? 'bg-gradient-to-br from-red-50 to-rose-50 border-red-100'
                : isSaturday
                ? 'bg-gradient-to-br from-blue-50 to-sky-50 border-blue-100'
                : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200';
              const textClass = isSunday
                ? 'text-red-500'
                : isSaturday
                ? 'text-blue-500'
                : 'text-gray-600';
              return (
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center border ${bgClass}`}>
                    <span className={`text-[10px] font-bold ${textClass}`}>
                      {reservation.dayLabel}
                    </span>
                    <span className={`text-lg font-bold leading-none ${textClass}`}>
                      {reservation.dateStr.split('/')[1]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={11} />
                      <span>
                        {reservation.year}年{reservation.month}月{reservation.dateStr.split('/')[1]}日（{reservation.dayLabel}）
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 mt-0.5">
                      {reservation.time}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-safe pb-6 space-y-3 animate-[fadeInUp_0.5s_ease-out_0.5s_both]">
        <button
          onClick={() => navigate('/', { state: { tab: 'search' } })}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:shadow-xl"
        >
          <Home size={18} />
          ホームに戻る
        </button>
        <button
          onClick={() => navigate('/', { state: { tab: 'reservation' } })}
          className="w-full py-3.5 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <List size={18} />
          予約一覧を見る
        </button>
      </div>

      {/* Custom Animation Keyframes - Injected via style tag */}
      <style>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
