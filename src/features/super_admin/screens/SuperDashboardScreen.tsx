import React from 'react';
import {
    TrendingUp,
    Building,
    Users,
    Briefcase
} from 'lucide-react';

export default function SuperDashboardScreen() {

    const kpiData = [
        {
            label: "総売上",
            value: "¥45,200,000",
            sub: "前月比 +12%",
            isPositive: true,
            icon: TrendingUp,
            color: "blue"
        },
        {
            label: "登録クリニック",
            value: "128件",
            sub: "今月 +4件",
            isPositive: true,
            icon: Building,
            color: "indigo"
        },
        {
            label: "提携代理店",
            value: "15社",
            sub: "変動なし",
            isPositive: false,
            icon: Briefcase,
            color: "orange"
        },
        {
            label: "総会員数",
            value: "8,400人",
            sub: "前月比 +5.4%",
            isPositive: true,
            icon: Users,
            color: "emerald"
        }
    ];

    const recentClinics = [
        { id: 1, name: "渋谷美容皮膚科クリニック", date: "2024-10-24", status: "review" },
        { id: 2, name: "新宿メンズサロン CORE", date: "2024-10-23", status: "approved" },
        { id: 3, name: "表参道ホワイトニングLABO", date: "2024-10-22", status: "approved" },
        { id: 4, name: "銀座エイジングケア歯科", date: "2024-10-21", status: "approved" },
        { id: 5, name: "池袋メディカルエステ", date: "2024-10-20", status: "rejected" },
    ];

    const StatusBadge = ({ status }: { status: string }) => {
        const styles: Record<string, string> = {
            review: "bg-yellow-100 text-yellow-800",
            approved: "bg-green-100 text-green-800",
            rejected: "bg-red-100 text-red-800"
        };
        const labels: Record<string, string> = {
            review: "審査中",
            approved: "承認済",
            rejected: "却下"
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-bold ${styles[status] || "bg-gray-100 text-gray-600"}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map((kpi, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg bg-${kpi.color}-50 text-${kpi.color}-600`}>
                                <kpi.icon size={24} />
                            </div>
                            <span className={`text-xs font-bold ${kpi.isPositive ? 'text-green-600' : 'text-gray-400'}`}>
                                {kpi.sub}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium mb-1">{kpi.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Sales Chart (Mock) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">月間売上推移</h3>
                        <select className="text-sm border-gray-200 rounded-lg bg-gray-50 p-2">
                            <option>2024年 10月</option>
                            <option>2024年 9月</option>
                        </select>
                    </div>

                    {/* CSS-only Bar Chart Mock */}
                    <div className="h-64 flex items-end gap-3 overflow-x-auto pb-4 px-2">
                        {[
                            { month: '1月', value: 35, amount: '¥3,500,000' },
                            { month: '2月', value: 45, amount: '¥4,500,000' },
                            { month: '3月', value: 25, amount: '¥2,500,000' },
                            { month: '4月', value: 60, amount: '¥6,000,000' },
                            { month: '5月', value: 55, amount: '¥5,500,000' },
                            { month: '6月', value: 75, amount: '¥7,500,000' },
                            { month: '7月', value: 40, amount: '¥4,000,000' },
                            { month: '8月', value: 65, amount: '¥6,500,000' },
                            { month: '9月', value: 50, amount: '¥5,000,000' },
                            { month: '10月', value: 85, amount: '¥8,500,000' },
                            { month: '11月', value: 70, amount: '¥7,000,000' },
                            { month: '12月', value: 90, amount: '¥9,000,000' },
                        ].map((item, index) => (
                            <div key={index} className="h-full flex flex-col justify-end items-center gap-2 group cursor-pointer min-w-[40px]">
                                {/* Tooltip */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-slate-800 text-white px-2 py-1 rounded mb-1 whitespace-nowrap">
                                    {item.amount}
                                </div>
                                {/* Bar */}
                                <div
                                    className="w-8 md:w-10 bg-blue-500 rounded-t-md transition-all hover:bg-blue-600"
                                    style={{ height: `${item.value}%` }}
                                />
                                {/* Label */}
                                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">{item.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Recent Registrations */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">最新の登録</h3>
                        <button className="text-sm text-blue-600 font-bold hover:underline">すべて見る</button>
                    </div>

                    <div className="flex flex-col gap-4">
                        {recentClinics.map((clinic) => (
                            <div key={clinic.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded px-2 -mx-2">
                                <div>
                                    <p className="font-bold text-sm text-gray-800 mb-0.5">{clinic.name}</p>
                                    <p className="text-xs text-gray-400">{clinic.date}</p>
                                </div>
                                <StatusBadge status={clinic.status} />
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-sm text-gray-500 font-bold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        さらに読み込む
                    </button>
                </div>

            </div>
        </div>
    );
}
