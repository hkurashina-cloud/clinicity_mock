import React, { useState, useMemo } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    MoreHorizontal,
    Clock
} from 'lucide-react';

// --- Types ---
type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'canceled';

type Reservation = {
    id: string;
    date: string;       // YYYY-MM-DD
    time: string;       // HH:MM
    customerName: string;
    isNewCustomer: boolean;
    menu: string;
    price: number;
    staff: string;
    status: ReservationStatus;
};

// --- Mock Data Generator ---
const generateMockData = (): Reservation[] => {
    const data: Reservation[] = [];
    const today = new Date();

    // Helper to format date YYYY-MM-DD
    const formatDate = (d: Date) => {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const statuses: ReservationStatus[] = ['pending', 'confirmed', 'completed', 'canceled'];
    const staffNames = ['田中', '佐藤', '鈴木', '高橋'];
    const menus = ['全身脱毛コース', 'フェイシャルケア', 'カウンセリング', '部分脱毛(VIO)', 'ホワイトニング'];

    // Generate for today, yesterday, and tomorrow
    for (let i = -1; i <= 1; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dateStr = formatDate(d);

        for (let j = 0; j < 7; j++) {
            data.push({
                id: `${dateStr}-${j}`,
                date: dateStr,
                time: `${10 + j}:00`,
                customerName: `Customer ${dateStr.slice(-2)}-${j}`,
                isNewCustomer: Math.random() > 0.7,
                menu: menus[Math.floor(Math.random() * menus.length)],
                price: Math.floor(Math.random() * 200) * 100 + 3000,
                staff: staffNames[Math.floor(Math.random() * staffNames.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)]
            });
        }
    }
    return data;
};

const MOCK_DATA = generateMockData();

// --- Components ---

export default function ReservationListScreen() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reservations, setReservations] = useState<Reservation[]>(MOCK_DATA);
    const [statusFilter, setStatusFilter] = useState<'all' | ReservationStatus>('all');

    // Format Date for Display
    const formattedDate = useMemo(() => {
        return new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }).format(selectedDate);
    }, [selectedDate]);

    // Date Navigation
    const changeDate = (days: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + days);
        setSelectedDate(newDate);
    };

    // Filter Logic
    const filteredReservations = useMemo(() => {
        const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

        return reservations.filter(r => {
            const matchDate = r.date === dateStr;
            const matchStatus = statusFilter === 'all' || r.status === statusFilter;
            return matchDate && matchStatus;
        });
    }, [selectedDate, reservations, statusFilter]);

    // Status Change Handler
    const handleStatusChange = (id: string, newStatus: ReservationStatus) => {
        setReservations(prev => prev.map(r =>
            r.id === id ? { ...r, status: newStatus } : r
        ));
    };

    // Status Badge Component
    const StatusBadge = ({ status }: { status: ReservationStatus }) => {
        const styles = {
            pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            confirmed: "bg-blue-100 text-blue-800 border-blue-200",
            completed: "bg-green-100 text-green-800 border-green-200",
            canceled: "bg-red-100 text-red-800 border-red-200"
        };

        const labels = {
            pending: "未確定",
            confirmed: "確定",
            completed: "来店済",
            canceled: "キャンセル"
        };

        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <div className="p-6 h-full flex flex-col bg-gray-50">

            {/* 1. Control Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                    <button onClick={() => changeDate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </button>
                    <span className="text-lg font-bold text-gray-800 min-w-[180px] text-center">
                        {formattedDate}
                    </span>
                    <button onClick={() => changeDate(1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronRight size={20} className="text-gray-600" />
                    </button>
                </div>

                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-bold active:scale-95 transform duration-100">
                    <Plus size={18} />
                    新規予約登録
                </button>
            </div>

            {/* 2. Filtering Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {(['all', 'pending', 'confirmed', 'completed', 'canceled'] as const).map(filter => (
                    <button
                        key={filter}
                        onClick={() => setStatusFilter(filter)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${statusFilter === filter
                            ? 'bg-gray-800 text-white shadow-md'
                            : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {filter === 'all' && 'すべて'}
                        {filter === 'pending' && '未確定'}
                        {filter === 'confirmed' && '確定'}
                        {filter === 'completed' && '来店済み'}
                        {filter === 'canceled' && 'キャンセル'}
                    </button>
                ))}
            </div>

            {/* 3. Reservation List (Responsive) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">

                {/* --- A. Desktop Table Layout (md以上) --- */}
                <div className="hidden md:block overflow-x-auto overflow-y-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 sticky top-0 z-10 text-xs text-gray-500 uppercase font-bold border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 whitespace-nowrap w-24">時間</th>
                                <th className="px-4 py-3 whitespace-nowrap w-32">ステータス</th>
                                <th className="px-4 py-3 whitespace-nowrap">お客様</th>
                                <th className="px-4 py-3 whitespace-nowrap">メニュー</th>
                                <th className="px-4 py-3 whitespace-nowrap">金額</th>
                                <th className="px-4 py-3 whitespace-nowrap">担当</th>
                                <th className="px-4 py-3 whitespace-nowrap text-center w-48">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {filteredReservations.length > 0 ? (
                                filteredReservations.map((reservation) => (
                                    <tr key={reservation.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-4 py-3 font-mono font-bold text-gray-600 whitespace-nowrap">
                                            {reservation.time}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <StatusBadge status={reservation.status} />
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-gray-800">{reservation.customerName}</span>
                                                    {reservation.isNewCustomer && (
                                                        <span className="bg-green-500 text-white text-[10px] px-1.5 rounded-sm font-bold">新規</span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-400">ID: {reservation.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">
                                            {reservation.menu}
                                        </td>
                                        <td className="px-4 py-3 font-bold text-gray-800 whitespace-nowrap">
                                            ¥{reservation.price.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                                    {reservation.staff[0]}
                                                </div>
                                                {reservation.staff}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-2">
                                                <select
                                                    value={reservation.status}
                                                    onChange={(e) => handleStatusChange(reservation.id, e.target.value as ReservationStatus)}
                                                    className="text-xs border border-gray-300 rounded p-1"
                                                >
                                                    <option value="pending">未確定</option>
                                                    <option value="confirmed">確定</option>
                                                    <option value="completed">来店済</option>
                                                    <option value="canceled">キャンセル</option>
                                                </select>
                                                <button className="text-gray-400 hover:text-blue-600 p-1">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <Clock size={32} className="text-gray-300" />
                                            <p>この日の予約はありません</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- B. Mobile Card Layout (md未満) --- */}
                <div className="md:hidden flex-1 overflow-y-auto p-4 bg-gray-50">
                    {filteredReservations.length > 0 ? (
                        filteredReservations.map((reservation) => (
                            <div key={reservation.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 last:mb-0">
                                {/* Top Row: Time & Status */}
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-xl font-mono font-bold text-gray-800">
                                        {reservation.time}
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <StatusBadge status={reservation.status} />
                                        <span className="text-[10px] text-gray-400 mt-1">ID: {reservation.id}</span>
                                    </div>
                                </div>

                                {/* Middle Row: Customer */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="font-bold text-lg text-gray-900">{reservation.customerName}</span>
                                    {reservation.isNewCustomer && (
                                        <span className="bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">新規</span>
                                    )}
                                </div>

                                <div className="border-t border-gray-100 my-2"></div>

                                {/* Bottom Row: Info & Actions */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 font-medium truncate max-w-[60%]">{reservation.menu}</span>
                                        <span className="font-bold text-gray-900">¥{reservation.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center font-bold">
                                                {reservation.staff[0]}
                                            </div>
                                            {reservation.staff}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={reservation.status}
                                                onChange={(e) => handleStatusChange(reservation.id, e.target.value as ReservationStatus)}
                                                className="text-xs border border-gray-300 rounded p-1 bg-white"
                                            >
                                                <option value="pending">未確定</option>
                                                <option value="confirmed">確定</option>
                                                <option value="completed">来店済</option>
                                                <option value="canceled">キャンセル</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                            <Clock size={32} className="text-gray-300 mb-2" />
                            <p>この日の予約はありません</p>
                        </div>
                    )}
                </div>

                {/* Footer info */}
                <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
                    <span>Total: {filteredReservations.length} items</span>
                    <span>表示日: {selectedDate.toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}
