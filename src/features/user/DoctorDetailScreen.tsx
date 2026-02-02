import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Clock } from 'lucide-react';

// --- Types ---
type SpecialtyCase = {
    title: string;
    description: string;
    beforeImage: string;
    afterImage: string;
};

type AssignedMenu = {
    id: number;
    name: string;
    price: string;
    duration: string;
};

type DoctorData = {
    id: number;
    name: string;
    role: string;
    gender: 'male' | 'female';
    image: string;
    message: string;
    bio: string;
    specialtyCases: SpecialtyCase[];
    assignedMenus: AssignedMenu[];
};

// --- Mock Data ---
const doctorData: DoctorData = {
    id: 1,
    name: '田中 美咲',
    role: '院長 / 皮膚科専門医',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&h=400&fit=crop',
    message: '「あなたらしさ」を大切に、自然な美しさを引き出します。',
    bio: '大学病院での形成外科勤務を経て、2020年に当院院長に就任。丁寧なカウンセリングに定評があり、初めての方でも安心して相談できる雰囲気作りを心がけています。',
    specialtyCases: [
        {
            title: '二重埋没法（ナチュラル）',
            description: '切らずに自然な二重ラインを形成。ダウンタイムも最小限に抑えました。',
            beforeImage: 'https://placehold.co/300x200/e2e8f0/64748b?text=Before',
            afterImage: 'https://placehold.co/300x200/3b82f6/ffffff?text=After'
        },
        {
            title: 'ヒアルロン酸（涙袋）',
            description: '目の下のバランスを整え、優しい印象の目元へ。',
            beforeImage: 'https://placehold.co/300x200/e2e8f0/64748b?text=Before',
            afterImage: 'https://placehold.co/300x200/3b82f6/ffffff?text=After'
        }
    ],
    assignedMenus: [
        { id: 101, name: '二重埋没法 2点留め', price: '¥98,000', duration: '60分' },
        { id: 102, name: 'ヒアルロン酸注入（両目）', price: '¥45,000', duration: '30分' },
        { id: 103, name: '糸リフト（小顔施術）', price: '¥150,000', duration: '90分' }
    ]
};

export default function DoctorDetailScreen() {
    console.log('DoctorDetailScreen rendered');
    
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    // Get doctor data from location state or use mock data
    // Always fallback to mock data if state is missing or invalid
    const doctor: DoctorData = (location.state?.doctor as DoctorData) || doctorData;
    
    // Safety check: ensure doctor is never null/undefined
    if (!doctor) {
        console.error('Doctor data is missing, using fallback');
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">ドクター情報が見つかりません</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-blue-500 font-medium"
                    >
                        戻る
                    </button>
                </div>
            </div>
        );
    }

    const handleBookMenu = (menu: AssignedMenu) => {
        navigate('/reserve', {
            state: {
                doctorId: doctor.id,
                doctorName: doctor.name,
                selectedMenu: menu
            }
        });
    };

    return (
        <div className="fixed inset-0 z-[100] bg-white min-h-screen overflow-y-auto animate-fade-in font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 h-14 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 text-gray-700 active:scale-95 transition-transform"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="flex-1 text-center font-bold text-gray-900 truncate px-4">
                    ドクター詳細
                </div>
                <div className="w-10" />
            </header>

            {/* Hero Section */}
            <section className="px-5 pt-8 pb-6">
                <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative mb-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Name & Role */}
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {doctor.name}
                        </h1>
                        {doctor.gender === 'female' ? (
                            <span className="text-pink-500">♀</span>
                        ) : (
                            <span className="text-blue-500">♂</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                        {doctor.role}
                    </p>
                </div>
            </section>

            {/* Message Bubble */}
            <section className="px-5 pb-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100 relative">
                    <div className="absolute -top-2 left-8 w-4 h-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-l border-t border-blue-100 transform rotate-45"></div>
                    <p className="text-sm text-gray-800 leading-relaxed font-medium italic">
                        {doctor.message}
                    </p>
                </div>
            </section>

            {/* Bio Section */}
            <section className="px-5 py-6 border-t border-gray-50">
                <h2 className="text-lg font-bold text-gray-900 mb-3">プロフィール</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                    {doctor.bio}
                </p>
            </section>

            {/* Before/After Carousel */}
            <section className="px-5 py-6 border-t border-gray-50">
                <h2 className="text-lg font-bold text-gray-900 mb-4">症例紹介</h2>
                <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
                    {doctor.specialtyCases.map((caseItem, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[85vw] max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <div className="flex">
                                {/* Before Image */}
                                <div className="flex-1 relative">
                                    <img
                                        src={caseItem.beforeImage}
                                        alt="Before"
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] font-bold py-1 text-center">
                                        Before
                                    </div>
                                </div>
                                {/* Arrow */}
                                <div className="w-8 bg-gray-50 flex items-center justify-center">
                                    <span className="text-gray-400 font-bold">→</span>
                                </div>
                                {/* After Image */}
                                <div className="flex-1 relative">
                                    <img
                                        src={caseItem.afterImage}
                                        alt="After"
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-blue-500/80 text-white text-[10px] font-bold py-1 text-center">
                                        After
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 text-sm mb-1">
                                    {caseItem.title}
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {caseItem.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Assigned Menus List */}
            <section className="px-5 py-6 border-t border-gray-50">
                <h2 className="text-lg font-bold text-gray-900 mb-4">担当メニュー</h2>
                <div className="space-y-3">
                    {doctor.assignedMenus.map((menu) => (
                        <div
                            key={menu.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                        >
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-sm mb-1">
                                        {menu.name}
                                    </h3>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} />
                                            <span>{menu.duration}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-lg font-bold text-blue-600 font-mono">
                                    {menu.price}
                                </div>
                            </div>
                            <button
                                onClick={() => handleBookMenu(menu)}
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-2.5 rounded-xl shadow-md shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                <Calendar size={16} />
                                指名して予約
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Fixed Bottom CTA Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-50">
                <button
                    onClick={() => {
                        navigate('/reserve', {
                            state: {
                                doctor: {
                                    id: doctor.id,
                                    name: doctor.name,
                                    image: doctor.image,
                                    role: doctor.role,
                                }
                            }
                        });
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <Calendar size={18} />
                    このドクターを指名して予約する
                </button>
            </div>

            {/* Bottom padding for fixed button */}
            <div className="h-24" />
        </div>
    );
}
