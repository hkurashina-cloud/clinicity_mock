import React, { useState } from 'react';
import {
    Building2,
    MapPin,
    CheckCircle,
    AlertCircle,
    MoreHorizontal,
    Search,
    Plus
} from 'lucide-react';

type ClinicStatus = 'pending' | 'active' | 'suspended';

type ClinicAdminData = {
    id: number;
    name: string;
    category: string;
    agencyName: string;
    registeredAt: string;
    status: ClinicStatus;
};

const MOCK_CLINICS: ClinicAdminData[] = [
    { id: 1, name: "渋谷美容皮膚科クリニック", category: "美容皮膚科", agencyName: "株式会社メディカル・コア", registeredAt: "2024-10-24", status: 'pending' },
    { id: 2, name: "新宿メンズサロン CORE", category: "脱毛", agencyName: "Next Innovation", registeredAt: "2024-10-23", status: 'active' },
    { id: 3, name: "表参道ホワイトニングLABO", category: "審美歯科", agencyName: "デンタルパートナーズ", registeredAt: "2024-10-22", status: 'active' },
    { id: 4, name: "銀座エイジングケア歯科", category: "歯科", agencyName: "デンタルパートナーズ", registeredAt: "2024-10-21", status: 'active' },
    { id: 5, name: "池袋メディカルエステ", category: "エステ", agencyName: "株式会社Beauty & Co", registeredAt: "2024-10-20", status: 'suspended' },
    { id: 6, name: "六本木ヒルズクリニック", category: "美容外科", agencyName: "Global Med", registeredAt: "2024-10-25", status: 'pending' },
    { id: 7, name: "心斎橋ビューティークリニック", category: "美容皮膚科", agencyName: "関西メディカルサポート", registeredAt: "2024-10-25", status: 'pending' },
    { id: 8, name: "福岡天神スキンケア", category: "皮膚科", agencyName: "九州ヘルスケア", registeredAt: "2024-10-18", status: 'active' },
    { id: 9, name: "札幌・北の森歯科", category: "歯科", agencyName: "北海道メディカル", registeredAt: "2024-10-19", status: 'active' },
    { id: 10, name: "横浜みなとみらい整形", category: "形成外科", agencyName: "株式会社メディカル・コア", registeredAt: "2024-10-26", status: 'pending' },
];

export default function ClinicManagementScreen() {
    const [clinics, setClinics] = useState<ClinicAdminData[]>(MOCK_CLINICS);
    const [activeTab, setActiveTab] = useState<'all' | ClinicStatus>('all');

    // Filter Logic
    const filteredClinics = clinics.filter(clinic => {
        if (activeTab === 'all') return true;
        return clinic.status === activeTab;
    });

    // Approve Action
    const handleApprove = (id: number, name: string) => {
        if (window.confirm(`店舗: ${name} を承認し、公開状態にしますか？`)) {
            setClinics(prev => prev.map(c =>
                c.id === id ? { ...c, status: 'active' } : c
            ));
            alert(`店舗: ${name} を承認し、公開状態にしました`);
        }
    };

    const StatusBadge = ({ status }: { status: ClinicStatus }) => {
        const config = {
            pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "審査中", icon: AlertCircle },
            active: { color: "bg-green-100 text-green-800 border-green-200", label: "公開中", icon: CheckCircle },
            suspended: { color: "bg-red-100 text-red-800 border-red-200", label: "停止中", icon: AlertCircle },
        };
        const { color, label, icon: Icon } = config[status];

        return (
            <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${color}`}>
                <Icon size={12} />
                {label}
            </span>
        );
    };

    return (
        <div className="space-y-6 animate-fade-in">

            {/* 1. Header Area */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">クリニック管理</h2>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-blue-700 transition-colors active:scale-95">
                    <Plus size={18} />
                    新規クリニック手動登録
                </button>
            </div>

            {/* 2. Filter Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex gap-6">
                    {(['all', 'pending', 'active', 'suspended'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-800'
                                }`}
                        >
                            {tab === 'all' && 'すべて'}
                            {tab === 'pending' && '審査待ち'}
                            {tab === 'active' && '公開中'}
                            {tab === 'suspended' && '停止中'}
                            <span className="ml-2 text-xs font-normal text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                                {tab === 'all'
                                    ? clinics.length
                                    : clinics.filter(c => c.status === tab).length
                                }
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. Clinic List Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 w-20">ID</th>
                            <th className="px-6 py-4">店舗名</th>
                            <th className="px-6 py-4">カテゴリ</th>
                            <th className="px-6 py-4">担当代理店</th>
                            <th className="px-6 py-4">登録日</th>
                            <th className="px-6 py-4">ステータス</th>
                            <th className="px-6 py-4 text-center">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {filteredClinics.length > 0 ? (
                            filteredClinics.map((clinic) => (
                                <tr key={clinic.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-gray-400 font-mono">#{clinic.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{clinic.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">
                                            {clinic.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{clinic.agencyName}</td>
                                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{clinic.registeredAt}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={clinic.status} />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {clinic.status === 'pending' ? (
                                            <button
                                                onClick={() => handleApprove(clinic.id, clinic.name)}
                                                className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                                            >
                                                承認する
                                            </button>
                                        ) : (
                                            <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                    データがありません
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
