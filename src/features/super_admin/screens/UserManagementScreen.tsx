import React, { useState } from 'react';
import {
    Users,
    UserPlus,
    UserX,
    Search,
    MoreHorizontal,
    ShieldAlert,
    ShieldCheck,
    Ban,
    Unlock
} from 'lucide-react';

type UserStatus = 'active' | 'suspended';

type UserData = {
    id: number;
    name: string;
    email: string;
    phone: string;
    registeredAt: string;
    bookingCount: number;
    cancelCount: number;
    status: UserStatus;
};

const MOCK_USERS: UserData[] = [
    { id: 5001, name: "山田 太郎", email: "taro.yamada@example.com", phone: "090-1234-5678", registeredAt: "2024/01/15", bookingCount: 15, cancelCount: 2, status: 'active' },
    { id: 5002, name: "鈴木 花子", email: "hanako.suzuki@example.com", phone: "080-9876-5432", registeredAt: "2024/02/20", bookingCount: 8, cancelCount: 0, status: 'active' },
    { id: 5003, name: "佐藤 一郎", email: "ichiro.sato@example.com", phone: "090-1111-2222", registeredAt: "2024/03/10", bookingCount: 3, cancelCount: 1, status: 'active' },
    { id: 5004, name: "田中 美咲", email: "misaki.tanaka@example.com", phone: "080-3333-4444", registeredAt: "2024/04/05", bookingCount: 20, cancelCount: 15, status: 'suspended' }, // Suspicious
    { id: 5005, name: "高橋 健太", email: "kenta.takahashi@example.com", phone: "090-5555-6666", registeredAt: "2024/05/01", bookingCount: 5, cancelCount: 4, status: 'active' }, // High cancel rate
    { id: 5006, name: "伊藤 由美", email: "yumi.ito@example.com", phone: "080-7777-8888", registeredAt: "2024/06/15", bookingCount: 12, cancelCount: 1, status: 'active' },
    { id: 5007, name: "渡辺 亮", email: "ryo.watanabe@example.com", phone: "090-9999-0000", registeredAt: "2024/07/20", bookingCount: 0, cancelCount: 0, status: 'active' },
    { id: 5008, name: "山本 さくら", email: "sakura.yamamoto@example.com", phone: "080-1212-3434", registeredAt: "2024/08/10", bookingCount: 45, cancelCount: 3, status: 'active' },
    { id: 5009, name: "中村 剛", email: "tsuyoshi.nakamura@example.com", phone: "090-5656-7878", registeredAt: "2024/09/01", bookingCount: 6, cancelCount: 5, status: 'suspended' }, // Suspicious
    { id: 5010, name: "小林 恵", email: "megumi.kobayashi@example.com", phone: "080-9090-1212", registeredAt: "2024/10/05", bookingCount: 10, cancelCount: 2, status: 'active' },
];

export default function UserManagementScreen() {
    const [users, setUsers] = useState<UserData[]>(MOCK_USERS);
    const [filter, setFilter] = useState<'all' | 'suspended'>('all');

    // KPI Metrics
    const totalUsers = 8450;
    const newUsersMonth = 120;
    const suspendedUsers = users.filter(u => u.status === 'suspended').length;

    const filteredUsers = users.filter(user => {
        if (filter === 'suspended') return user.status === 'suspended';
        return true;
    });

    const handleToggleStatus = (id: number, currentStatus: UserStatus, name: string) => {
        const action = currentStatus === 'active' ? '停止(BAN)' : '解除';
        if (window.confirm(`ユーザー: ${name} のアカウントを${action}しますか？`)) {
            setUsers(prev => prev.map(u =>
                u.id === id ? { ...u, status: currentStatus === 'active' ? 'suspended' : 'active' } : u
            ));
            alert(`ユーザー: ${name} のアカウントを${action}しました`);
        }
    };

    const isHighRisk = (booking: number, cancel: number) => {
        if (booking === 0) return false;
        return (cancel / booking > 0.3) && cancel >= 3;
    };

    const StatusBadge = ({ status }: { status: UserStatus }) => {
        return (
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${status === 'active'
                ? 'bg-green-100 text-green-700 border-green-200'
                : 'bg-red-100 text-red-700 border-red-200'}`}>
                {status === 'active' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                {status === 'active' ? '利用中' : '利用停止'}
            </span>
        );
    };

    return (
        <div className="space-y-8 animate-fade-in">

            {/* 1. Page Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Users className="text-slate-700" size={28} />
                    一般ユーザー管理
                </h2>
            </div>

            {/* 2. KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold">総会員数</p>
                        <p className="text-2xl font-bold text-gray-900 font-mono">{totalUsers.toLocaleString()} <span className="text-sm text-gray-400 font-sans">人</span></p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                        {/* Note: UserPlus is not exported by default in some lucide versions, checking keys. using fallback icon if needed. 
                      Actually prompt asked for 'Users' for kpi but distinct icons help. I'll use Users for total. 
                   */}
                        {/* Typo in imports earlier, fixed to use safe standard icons */}
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold">今月の新規登録</p>
                        <p className="text-2xl font-bold text-gray-900 font-mono">+{newUsersMonth.toLocaleString()} <span className="text-sm text-gray-400 font-sans">人</span></p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                        <UserX size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold">利用停止中</p>
                        <p className="text-2xl font-bold text-red-600 font-mono">{suspendedUsers} <span className="text-sm text-gray-400 font-sans">アカウント</span></p>
                    </div>
                </div>
            </div>

            {/* 3. Controls & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div className="w-full md:w-96 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="名前、メールアドレスで検索"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                </div>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${filter === 'all' ? 'bg-white shadow text-slate-800' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        すべて
                    </button>
                    <button
                        onClick={() => setFilter('suspended')}
                        className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${filter === 'suspended' ? 'bg-white shadow text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        利用停止中のみ
                    </button>
                </div>
            </div>

            {/* 4. User List Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-bold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 w-20">ID</th>
                                <th className="px-6 py-4">氏名 / メール</th>
                                <th className="px-6 py-4 whitespace-nowrap">電話番号</th>
                                <th className="px-6 py-4 whitespace-nowrap">登録日</th>
                                <th className="px-6 py-4 min-w-[200px]">予約実績 (キャンセル)</th>
                                <th className="px-6 py-4 text-center">ステータス</th>
                                <th className="px-6 py-4 text-center">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {filteredUsers.map((user) => {
                                const highRisk = isHighRisk(user.bookingCount, user.cancelCount);
                                return (
                                    <tr key={user.id} className={`hover:bg-slate-50 transition-colors ${user.status === 'suspended' ? 'bg-red-50/30' : ''}`}>
                                        <td className="px-6 py-4 text-gray-400 font-mono">#{user.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800">{user.name}</div>
                                            <div className="text-xs text-gray-500 whitespace-nowrap max-w-[200px] truncate">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-mono">
                                            {user.phone}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono text-xs">
                                            {user.registeredAt}
                                        </td>
                                        <td className="px-6 py-4 font-mono min-w-[200px]">
                                            <span className="font-bold">{user.bookingCount}回</span>
                                            <span className={`ml-2 text-xs ${highRisk || user.cancelCount >= 5 ? 'text-red-600 font-bold' : 'text-gray-400'}`}>
                                                (キャンセル {user.cancelCount}回)
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <StatusBadge status={user.status} />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {user.status === 'active' ? (
                                                <button
                                                    onClick={() => handleToggleStatus(user.id, user.status, user.name)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded text-xs font-bold transition-colors"
                                                >
                                                    <Ban size={14} />
                                                    停止
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleToggleStatus(user.id, user.status, user.name)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 text-gray-600 hover:bg-gray-100 rounded text-xs font-bold transition-colors"
                                                >
                                                    <Unlock size={14} />
                                                    解除
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
