import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Clock, MapPin, Sparkles } from 'lucide-react';

// --- Types ---
type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  time: string;
  image: string;
  tag?: string;
};

type SelectedSlot = {
  date: Date;
  time: string;
  dateStr: string;
  dayLabel: string;
  dayOfWeek: number; // 0=日, 1=月, 2=火, 3=水, 4=木, 5=金, 6=土
};

type AvailabilityStatus = '◎' | '○' | '×' | '—';

// --- Dummy Data ---
const CLINIC_INFO = {
  id: 1,
  name: 'Clinicity 渋谷本院',
  area: '渋谷',
  image: '/images/skin/001.webp',
};

const DUMMY_MENUS: MenuItem[] = [
  {
    id: 1,
    name: 'ハイドラフェイシャル全顔',
    description: '毛穴の黒ずみ・角栓を徹底洗浄。透明感のある肌へ導きます。',
    price: '¥9,800',
    time: '60分',
    image: '/images/skin/002.webp',
    tag: '人気No.1',
  },
  {
    id: 2,
    name: 'ピコレーザートーニング',
    description: 'シミ・肝斑を薄くし透明感へ。ダウンタイムほぼなし。',
    price: '¥12,000',
    time: '45分',
    image: '/images/skin/003.webp',
    tag: 'おすすめ',
  },
  {
    id: 3,
    name: 'ウルセラリフト（全顔）',
    description: '切らないフェイスリフト。圧倒的な引き上げ効果を実感。',
    price: '¥128,000',
    time: '90分',
    image: '/images/skin/012.webp',
  },
  {
    id: 4,
    name: '高濃度ビタミン点滴',
    description: '内側から輝く白玉肌へ。疲労回復にも効果的。',
    price: '¥15,000',
    time: '30分',
    image: '/images/skin/013.webp',
  },
  {
    id: 5,
    name: 'ダーマペン4',
    description: '肌質改善・毛穴・ニキビ跡に。コラーゲン生成を促進。',
    price: '¥19,800',
    time: '50分',
    image: '/images/skin/022.webp',
  },
];

// Time slots from 10:00 to 20:00 (30-min intervals)
const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00',
];

const DAY_LABELS = ['日', '月', '火', '水', '木', '金', '土'];

// Generate random availability (seeded by date+time for consistency)
const getAvailability = (dateStr: string, time: string): AvailabilityStatus => {
  const seed = dateStr.charCodeAt(0) + dateStr.charCodeAt(1) + time.charCodeAt(0) + time.charCodeAt(3);
  const rand = Math.sin(seed) * 10000;
  const val = rand - Math.floor(rand);

  if (val < 0.5) return '◎';
  if (val < 0.75) return '○';
  if (val < 0.9) return '×';
  return '—';
};

// --- Step Indicator Component (Premium Style) ---
const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'メニュー選択' },
    { num: 2, label: '日時選択' },
    { num: 3, label: '確認' },
  ];

  return (
    <div className="px-6 py-5">
      <div className="flex items-center justify-between relative">
        {/* Progress Line Background */}
        <div className="absolute top-4 left-8 right-8 h-[2px] bg-gray-200" />
        {/* Progress Line Active */}
        <div
          className="absolute top-4 left-8 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
          style={{ width: `calc(${((currentStep - 1) / 2) * 100}% - 32px)` }}
        />

        {steps.map((step) => (
          <div key={step.num} className="flex flex-col items-center relative z-10">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                currentStep > step.num
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-500/30'
                  : currentStep === step.num
                  ? 'bg-white border-2 border-blue-500 text-blue-600 shadow-md'
                  : 'bg-white border-2 border-gray-200 text-gray-400'
              }`}
            >
              {currentStep > step.num ? <Check size={16} strokeWidth={3} /> : step.num}
            </div>
            <span
              className={`text-[11px] mt-2 font-medium transition-colors ${
                currentStep >= step.num ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Weekly Calendar Component ---
const WeeklyCalendar: React.FC<{
  weekOffset: number;
  selectedSlot: SelectedSlot | null;
  onSelectSlot: (slot: SelectedSlot) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}> = ({ weekOffset, selectedSlot, onSelectSlot, onPrevWeek, onNextWeek }) => {
  // Generate 7 days starting from today + weekOffset
  const weekDays = useMemo(() => {
    const days: { date: Date; dateNum: string; dayLabel: string; dayOfWeek: number }[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + (weekOffset * 7) + i);
      days.push({
        date,
        dateNum: String(date.getDate()).padStart(2, '0'),
        dayLabel: DAY_LABELS[date.getDay()],
        dayOfWeek: date.getDay(),
      });
    }
    return days;
  }, [weekOffset]);

  // Get month/year label
  const monthLabel = useMemo(() => {
    const firstDay = weekDays[0].date;
    const lastDay = weekDays[6].date;
    const year = firstDay.getFullYear();
    const month1 = firstDay.getMonth() + 1;
    const month2 = lastDay.getMonth() + 1;

    if (month1 === month2) {
      return `${year}年${month1}月`;
    }
    return `${year}年${month1}月〜${month2}月`;
  }, [weekDays]);

  const isSelected = (date: Date, time: string) => {
    if (!selectedSlot) return false;
    return (
      selectedSlot.date.toDateString() === date.toDateString() &&
      selectedSlot.time === time
    );
  };

  const handleCellClick = (day: typeof weekDays[0], time: string, status: AvailabilityStatus) => {
    if (status === '×' || status === '—') return;

    onSelectSlot({
      date: day.date,
      time,
      dateStr: `${day.date.getMonth() + 1}/${day.date.getDate()}`,
      dayLabel: day.dayLabel,
      dayOfWeek: day.dayOfWeek,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Calendar Header with Navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <button
          onClick={onPrevWeek}
          disabled={weekOffset === 0}
          className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
            weekOffset === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-200 active:scale-95'
          }`}
        >
          <ChevronLeft size={14} />
          前週
        </button>
        <span className="text-sm font-bold text-gray-900">{monthLabel}</span>
        <button
          onClick={onNextWeek}
          className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-all active:scale-95"
        >
          翌週
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Calendar Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[360px] border-collapse">
          {/* Day Headers */}
          <thead>
            <tr>
              <th className="w-14 p-2 text-[10px] text-gray-400 font-medium border-b border-gray-100 bg-gray-50 sticky left-0 z-10">
                時間
              </th>
              {weekDays.map((day, idx) => {
                const isSunday = day.dayOfWeek === 0;
                const isSaturday = day.dayOfWeek === 6;
                return (
                  <th
                    key={idx}
                    className={`p-2 text-center border-b border-gray-100 min-w-[44px] ${
                      isSunday
                        ? 'bg-red-50'
                        : isSaturday
                        ? 'bg-blue-50'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div
                      className={`text-[10px] font-medium ${
                        isSunday
                          ? 'text-red-400'
                          : isSaturday
                          ? 'text-blue-400'
                          : 'text-gray-400'
                      }`}
                    >
                      {day.dayLabel}
                    </div>
                    <div
                      className={`text-sm font-bold ${
                        isSunday
                          ? 'text-red-500'
                          : isSaturday
                          ? 'text-blue-500'
                          : 'text-gray-700'
                      }`}
                    >
                      {day.dateNum}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          {/* Time Rows */}
          <tbody>
            {TIME_SLOTS.map((time) => (
              <tr key={time} className="border-b border-gray-50 last:border-b-0">
                <td className="p-1.5 text-[11px] text-gray-500 font-medium text-center border-r border-gray-100 bg-gray-50/50 sticky left-0 z-10">
                  {time}
                </td>
                {weekDays.map((day, idx) => {
                  const dateStr = `${day.date.getMonth() + 1}/${day.date.getDate()}`;
                  const status = getAvailability(dateStr, time);
                  const isAvailable = status === '◎' || status === '○';
                  const selected = isSelected(day.date, time);

                  return (
                    <td key={idx} className="p-0.5 text-center">
                      <button
                        onClick={() => handleCellClick(day, time, status)}
                        disabled={!isAvailable}
                        className={`w-full py-1.5 text-sm font-bold rounded transition-all ${
                          selected
                            ? 'bg-pink-500 text-white shadow-sm'
                            : isAvailable
                            ? 'text-pink-500 hover:bg-pink-50 active:bg-pink-100'
                            : 'text-gray-300 cursor-default'
                        }`}
                      >
                        {status}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50 flex items-center justify-center gap-4 text-[10px] text-gray-500">
        <span className="flex items-center gap-1">
          <span className="text-pink-500 font-bold">◎</span> 空きあり
        </span>
        <span className="flex items-center gap-1">
          <span className="text-pink-500 font-bold">○</span> 残りわずか
        </span>
        <span className="flex items-center gap-1">
          <span className="text-gray-300 font-bold">×</span> 満席
        </span>
        <span className="flex items-center gap-1">
          <span className="text-gray-300 font-bold">—</span> 受付外
        </span>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function ReservationFlowScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  // Get clinic info from navigation state or use default
  const clinicInfo = location.state?.shopName
    ? { ...CLINIC_INFO, name: location.state.shopName, id: location.state.shopId }
    : CLINIC_INFO;

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleConfirm = () => {
    // Navigate to complete screen with reservation data
    navigate('/reserve/complete', {
      state: {
        clinicName: clinicInfo.name,
        clinicArea: clinicInfo.area,
        clinicImage: clinicInfo.image,
        menuName: selectedMenu?.name,
        menuTime: selectedMenu?.time,
        menuPrice: selectedMenu?.price,
        menuImage: selectedMenu?.image,
        dateStr: selectedSlot?.dateStr,
        dayLabel: selectedSlot?.dayLabel,
        dayOfWeek: selectedSlot?.dayOfWeek,
        time: selectedSlot?.time,
        year: selectedSlot?.date.getFullYear(),
        month: (selectedSlot?.date.getMonth() ?? 0) + 1,
      },
    });
  };

  const canProceed =
    (currentStep === 1 && selectedMenu !== null) ||
    (currentStep === 2 && selectedSlot !== null) ||
    currentStep === 3;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/50 px-4 h-14 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 text-center">
          <span className="font-bold text-gray-900">予約</span>
          <span className="text-xs text-gray-400 ml-2">Step {currentStep}/3</span>
        </div>
        <div className="w-10" />
      </header>

      {/* Step Indicator */}
      <div className="bg-white border-b border-gray-100">
        <StepIndicator currentStep={currentStep} />
        {/* Shop Name Subtitle */}
        {currentStep !== 3 && (
          <div className="px-4 pb-4 text-center">
            <p className="text-sm text-gray-500">
              予約店舗: <span className="font-bold text-gray-900">{clinicInfo.name}</span>
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Step 1: Menu Selection */}
        {currentStep === 1 && (
          <div className="px-4 pb-4 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">メニューを選択</h2>
              <span className="text-xs text-gray-400">{DUMMY_MENUS.length}件</span>
            </div>
            <div className="space-y-3">
              {DUMMY_MENUS.map((menu) => (
                <button
                  key={menu.id}
                  onClick={() => setSelectedMenu(menu)}
                  className={`w-full text-left bg-white rounded-2xl shadow-sm border-2 transition-all duration-200 overflow-hidden ${
                    selectedMenu?.id === menu.id
                      ? 'border-blue-500 shadow-md shadow-blue-500/10'
                      : 'border-transparent hover:shadow-md'
                  }`}
                >
                  <div className="flex">
                    {/* Menu Image */}
                    <div className="w-24 h-24 shrink-0 bg-gray-100">
                      <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
                    </div>
                    {/* Menu Details */}
                    <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start gap-2">
                          <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-1 flex-1">
                            {menu.name}
                          </h3>
                          {menu.tag && (
                            <span className="shrink-0 text-[9px] bg-gradient-to-r from-orange-400 to-pink-400 text-white px-1.5 py-0.5 rounded font-bold">
                              {menu.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                          {menu.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <Clock size={12} />
                          <span>{menu.time}</span>
                        </div>
                        <span className="text-base font-bold text-blue-600">
                          {menu.price}
                        </span>
                      </div>
                    </div>
                    {/* Selection Indicator */}
                    <div className="w-10 flex items-center justify-center shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedMenu?.id === menu.id
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-200'
                        }`}
                      >
                        {selectedMenu?.id === menu.id && (
                          <Check size={14} className="text-white" strokeWidth={3} />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection (Weekly Matrix Calendar) */}
        {currentStep === 2 && (
          <div className="px-4 pb-4 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">日時を選択</h2>
              {selectedSlot && (
                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full font-medium">
                  {selectedSlot.dateStr}({selectedSlot.dayLabel}) {selectedSlot.time}
                </span>
              )}
            </div>

            <WeeklyCalendar
              weekOffset={weekOffset}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
              onPrevWeek={() => setWeekOffset(Math.max(0, weekOffset - 1))}
              onNextWeek={() => setWeekOffset(weekOffset + 1)}
            />
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <div className="px-4 py-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">予約内容の確認</h2>

            {/* Confirmation Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Clinic Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">予約店舗</div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                    <img src={clinicInfo.image} alt={clinicInfo.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{clinicInfo.name}</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                      <MapPin size={10} />
                      <span>{clinicInfo.area}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Menu */}
              <div className="p-4 border-b border-gray-100">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">施術メニュー</div>
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img src={selectedMenu?.image} alt={selectedMenu?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">{selectedMenu?.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Clock size={12} />
                      <span>{selectedMenu?.time}</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600 mt-1">
                      {selectedMenu?.price}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Date & Time */}
              <div className="p-4">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">予約日時</div>
                {(() => {
                  // 日曜(0)=赤, 土曜(6)=青, 平日=灰色
                  const isSunday = selectedSlot?.dayOfWeek === 0;
                  const isSaturday = selectedSlot?.dayOfWeek === 6;
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
                        <span className={`text-xs font-bold ${textClass}`}>{selectedSlot?.dayLabel}</span>
                        <span className={`text-lg font-bold leading-none ${textClass}`}>{selectedSlot?.dateStr.split('/')[1]}</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          {selectedSlot?.date.getFullYear()}年{(selectedSlot?.date.getMonth() ?? 0) + 1}月
                        </div>
                        <div className="text-xl font-bold text-gray-900">{selectedSlot?.time}</div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Notice */}
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">ご予約の確認</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    予約確定後、クリニックからの確認メールをお待ちください。
                    キャンセルは予約日の前日まで可能です。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100/50 p-4 pb-safe z-50">
        <div className="flex gap-3 max-w-md mx-auto">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 py-3.5 rounded-xl bg-gray-100 font-bold text-gray-700 active:scale-[0.98] transition-all hover:bg-gray-200"
            >
              戻る
            </button>
          )}
          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`flex-1 py-3.5 rounded-xl font-bold transition-all ${
                canProceed
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30 active:scale-[0.98] hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              次へ進む
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all hover:shadow-xl"
            >
              予約を確定する
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
