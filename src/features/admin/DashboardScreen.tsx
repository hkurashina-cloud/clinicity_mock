import React from 'react';
import {
    Calendar,
    Users,
    CheckCircle,
    Clock
} from 'lucide-react';

export default function DashboardScreen() {
    return (
        <div className="p-6 md:p-8 space-y-8 bg-gray-50 min-h-full font-sans text-slate-800">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">ダッシュボード</h1>
                <p className="text-sm text-gray-400 mt-1">本日の予約状況とタスクをご確認ください</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- Left Column: Todo List --- */}
                <div className="lg:col-span-1 space-y-6">
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
                        <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2 mb-4">
                            <CheckCircle size={20} className="text-green-500" />
                            To Do リスト
                        </h2>
                        <ul className="space-y-3">
                            <TodoItem label="本日の予約" count={5} color="bg-blue-100 text-blue-700" />
                            <TodoItem label="来店・来場処理" count={4} color="bg-indigo-100 text-indigo-700" />
                            <TodoItem label="お問い合わせ" count={2} color="bg-orange-100 text-orange-700" isWarning />
                            <TodoItem label="予約承認待ち" count={0} color="bg-gray-100 text-gray-500" />
                        </ul>
                    </section>
                </div>

                {/* --- Right Column: Schedule & Stats --- */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Today's Schedule */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                                <Clock size={20} className="text-blue-500" />
                                本日の予約スケジュール
                            </h2>
                            <span className="text-xs font-bold text-gray-400">2026年1月17日 (土)</span>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 w-24">時間</th>
                                        <th className="px-6 py-3">メニュー名</th>
                                        <th className="px-6 py-3">顧客名</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <ScheduleRow time="10:00" menu="全身脱毛コース" name="田中 花子 様" />
                                    <ScheduleRow time="11:30" menu="フェイシャルケア" name="佐藤 美咲 様" />
                                    <ScheduleRow time="13:00" menu="カウンセリング" name="鈴木 一郎 様" />
                                    <ScheduleRow time="15:00" menu="部分脱毛(VIO)" name="高橋 優子 様" />
                                    <ScheduleRow time="16:30" menu="ホワイトニング" name="伊藤 健太 様" />
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Monthly Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <StatCard
                            title="今月の予約件数"
                            count="124"
                            subText="ネット: 98 / 電話: 26"
                            icon={<Calendar size={24} className="text-white" />}
                            iconBg="bg-blue-500"
                        />
                        <StatCard
                            title="今月の新規顧客"
                            count="18"
                            subText="前月比 +12%"
                            icon={<Users size={24} className="text-white" />}
                            iconBg="bg-teal-500"
                        />
                    </div>
                </div>
            </div>

            {/* --- Bottom: Weekly Calendar (Quick View) --- */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
                <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2 mb-6">
                    <Calendar size={20} className="text-purple-500" />
                    週間予約状況
                </h2>
                <div className="overflow-x-auto">
                    <div className="min-w-[600px] grid grid-cols-8 gap-y-2 text-center text-sm">
                        {/* Headers */}
                        <div className="font-bold text-gray-400 p-2 border-b border-gray-100"></div> {/* Corner Spacer */}
                        {['1/17(土)', '1/18(日)', '1/19(月)', '1/20(火)', '1/21(水)', '1/22(木)', '1/23(金)'].map((date, i) => (
                            <div key={i} className={`font-bold p-2 border-b border-gray-100 ${i < 2 ? 'text-red-400' : 'text-gray-700'}`}>
                                {date}
                            </div>
                        ))}

                        {/* Rows */}
                        <CalendarRow label="午前" statuses={['×', '△', '◎', '◎', '◎', '△', '×']} />
                        <CalendarRow label="午後" statuses={['△', '×', '◎', '◎', '△', '◎', '△']} />
                        <CalendarRow label="夕方" statuses={['×', '×', '△', '◎', '◎', '◎', '◎']} />
                    </div>
                </div>
            </section>
        </div>
    );
}

// --- Sub Components ---

const TodoItem = ({ label, count, color, isWarning }: { label: string, count: number, color: string, isWarning?: boolean }) => (
    <li className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
        <span className={`text-sm font-bold ${isWarning ? 'text-orange-600' : 'text-gray-600'}`}>{label}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}>
            {count}件
        </span>
    </li>
);

const ScheduleRow = ({ time, menu, name }: { time: string, menu: string, name: string }) => (
    <tr className="hover:bg-gray-50/50 transition-colors">
        <td className="px-6 py-4 font-bold text-gray-600 font-mono">{time}</td>
        <td className="px-6 py-4 font-bold text-gray-800">{menu}</td>
        <td className="px-6 py-4 text-gray-500">{name}</td>
    </tr>
);

const StatCard = ({ title, count, subText, icon, iconBg }: { title: string, count: string, subText: string, icon: React.ReactNode, iconBg: string }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg ${iconBg} shadow-md flex items-center justify-center shrink-0`}>
            {icon}
        </div>
        <div>
            <p className="text-xs font-bold text-gray-400 mb-0.5">{title}</p>
            <p className="text-2xl font-bold text-gray-800 leading-none mb-1">{count}</p>
            <p className="text-[10px] text-gray-400 font-medium">{subText}</p>
        </div>
    </div>
);

const CalendarRow = ({ label, statuses }: { label: string, statuses: string[] }) => (
    <>
        <div className="font-bold text-gray-500 py-3 self-center bg-gray-50 rounded-l-md">{label}</div>
        {statuses.map((status, i) => {
            let colorClass = "text-gray-300";
            if (status === '◎') colorClass = "text-blue-500 bg-blue-50";
            if (status === '△') colorClass = "text-orange-500 bg-orange-50";
            if (status === '×') colorClass = "text-red-400 bg-red-50";

            return (
                <div key={i} className={`flex items-center justify-center font-bold text-lg rounded-md m-0.5 ${colorClass}`}>
                    {status}
                </div>
            )
        })}
    </>
);
