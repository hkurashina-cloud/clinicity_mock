import React, { useState } from 'react';
import {
    Building,
    Users,
    TrendingUp,
    MoreHorizontal,
    Plus,
    Briefcase
} from 'lucide-react';

type AgencyStatus = 'active' | 'inactive';

type AgencyData = {
    id: number;
    name: string;
    repName: string;
    clinicCount: number;
    totalSales: number;
    commissionRate: number;
    status: AgencyStatus;
};

const MOCK_AGENCIES: AgencyData[] = [
    { id: 101, name: "株式会社メディカル・コア", repName: "佐藤 健一", clinicCount: 42, totalSales: 12500000, commissionRate: 15.0, status: 'active' },
    { id: 102, name: "Next Innovation", repName: "田中 未来", clinicCount: 28, totalSales: 8400000, commissionRate: 18.0, status: 'active' },
    { id: 103, name: "デンタルパートナーズ", repName: "鈴木 歯科", clinicCount: 15, totalSales: 3200000, commissionRate: 12.5, status: 'active' },
    { id: 104, name: "株式会社Beauty & Co", repName: "高橋 美咲", clinicCount: 8, totalSales: 980000, commissionRate: 20.0, status: 'inactive' },
    { id: 105, name: "九州ヘルスケア", repName: "福岡 太郎", clinicCount: 5, totalSales: 1500000, commissionRate: 15.0, status: 'active' },
    { id: 106, name: "北海道メディカル", repName: "札幌 次郎", clinicCount: 3, totalSales: 450000, commissionRate: 15.0, status: 'active' },
    { id: 107, name: "Global Med", repName: "James Smith", clinicCount: 1, totalSales: 120000, commissionRate: 25.0, status: 'inactive' },
];

export default function AgencyManagementScreen() {
    const [agencies] = useState<AgencyData[]>(MOCK_AGENCIES);

    // Summary Metrics
    const activeCount = agencies.filter(a => a.status === 'active').length;
    const totalMonthSales = agencies.reduce((acc, curr) => acc + curr.totalSales, 0);
    const avgCommission = (agencies.reduce((acc, curr) => acc + curr.commissionRate, 0) / agencies.length).toFixed(1);

    const StatusBadge = ({ status }: { status: AgencyStatus }) => {
        return (
            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${status === 'active'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                {status === 'active' ? '稼働中' : '停止中'}
            </span>
        );
    };

    return (
        <div className="space-y-8 animate-fade-in">

            {/* 1. Page Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Briefcase className="text-slate-700" size={28} />
                        代理店・パートナー管理
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">提携パートナーのパフォーマンス管理</p>
                </div>
                <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-slate-800 transition-colors active:scale-95">
                    <Plus size={18} />
                    新規代理店登録
                </button>
            </div>

            {/* 2. Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <Building size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold">稼働中の代理店</p>
                        <p className="text-2xl font-bold text-gray-900 font-mono">{activeCount} <span className="text-sm text-gray-400 font-sans">社</span></p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold">今月の代理店経由総売上</p>
                        <p className="text-2xl font-bold text-gray-900 font-mono">{(totalMonthSales / 10000).toLocaleString()} <span className="text-sm text-gray-400 font-sans">万円</span></p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold">平均手数料率</p>
                        <p className="text-2xl font-bold text-gray-900 font-mono">{avgCommission}%</p>
                    </div>
                </div>
            </div>

            {/* 3. Agency List Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-bold border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 w-20">ID</th>
                            <th className="px-6 py-4">代理店名</th>
                            <th className="px-6 py-4">担当者</th>
                            <th className="px-6 py-4 text-center">獲得店舗数</th>
                            <th className="px-6 py-4 text-right min-w-[160px] whitespace-nowrap">担当売上 (当月)</th>
                            <th className="px-6 py-4 text-right">手数料率</th>
                            <th className="px-6 py-4 text-center">ステータス</th>
                            <th className="px-6 py-4 text-center">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {agencies.map((agency) => (
                            <tr key={agency.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-gray-400 font-mono">#{agency.id}</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-800 text-base">{agency.name}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {agency.repName}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold font-mono ${agency.clinicCount >= 20 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {agency.clinicCount}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-slate-700 font-mono">
                                    {(agency.totalSales / 10000).toLocaleString()} <span className="text-xs text-gray-400 font-sans">万円</span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-gray-600">
                                    {agency.commissionRate.toFixed(1)}%
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <StatusBadge status={agency.status} />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="text-blue-600 font-bold text-xs hover:underline">詳細</button>
                                        <span className="text-gray-300">|</span>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
