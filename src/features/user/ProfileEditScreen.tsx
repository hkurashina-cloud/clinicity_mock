import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// --- Types ---
type ProfileFormData = {
    name: string;
    username: string;
    pronouns: string;
    bio: string;
    link: string;
    gender: string;
};

// --- Component ---
function ProfileEditScreen() {
    const navigate = useNavigate();

    // Form state initialized with dummy data
    const [formData, setFormData] = useState<ProfileFormData>({
        name: '田中 綾香',
        username: 'ayaka_beauty',
        pronouns: '',
        bio: '美容クリニック巡りが趣味です\n最新の美容医療についてシェアしていきます',
        link: '',
        gender: '女性',
    });

    const [avatarUrl] = useState(
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80'
    );

    // Handle input changes
    const handleChange = (field: keyof ProfileFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Handle save
    const handleSave = () => {
        // In a real app, save to backend here
        console.log('Saving profile:', formData);
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-12 flex items-center justify-between px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-base text-gray-900 font-normal"
                >
                    キャンセル
                </button>
                <h1 className="font-semibold text-gray-900 text-base">
                    プロフィールを編集
                </h1>
                <button
                    onClick={handleSave}
                    className="text-base text-blue-500 font-semibold"
                >
                    完了
                </button>
            </header>

            {/* Avatar Section */}
            <section className="bg-white py-6 flex flex-col items-center border-b border-gray-200">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200 mb-3">
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <button className="text-blue-500 text-sm font-medium">
                    写真またはアバターを編集
                </button>
            </section>

            {/* Form Fields */}
            <section className="bg-white mt-4">
                {/* Name */}
                <div className="flex items-center px-4 py-3 border-b border-gray-100">
                    <label className="w-28 text-sm text-gray-900 shrink-0">名前</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="flex-1 text-sm text-gray-900 bg-transparent outline-none"
                        placeholder="名前"
                    />
                </div>

                {/* Username */}
                <div className="flex items-center px-4 py-3 border-b border-gray-100">
                    <label className="w-28 text-sm text-gray-900 shrink-0">ユーザーネーム</label>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => handleChange('username', e.target.value)}
                        className="flex-1 text-sm text-gray-900 bg-transparent outline-none"
                        placeholder="ユーザーネーム"
                    />
                </div>

                {/* Pronouns */}
                <div className="flex items-center px-4 py-3 border-b border-gray-100">
                    <label className="w-28 text-sm text-gray-900 shrink-0">代名詞</label>
                    <input
                        type="text"
                        value={formData.pronouns}
                        onChange={(e) => handleChange('pronouns', e.target.value)}
                        className="flex-1 text-sm text-gray-400 bg-transparent outline-none"
                        placeholder="代名詞"
                    />
                </div>

                {/* Bio */}
                <div className="flex px-4 py-3 border-b border-gray-100">
                    <label className="w-28 text-sm text-gray-900 shrink-0 pt-0.5">自己紹介</label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        rows={3}
                        className="flex-1 text-sm text-gray-900 bg-transparent outline-none resize-none"
                        placeholder="自己紹介"
                    />
                </div>

                {/* Link */}
                <div className="flex items-center px-4 py-3 border-b border-gray-100">
                    <label className="w-28 text-sm text-gray-900 shrink-0">リンク</label>
                    <input
                        type="text"
                        value={formData.link}
                        onChange={(e) => handleChange('link', e.target.value)}
                        className="flex-1 text-sm text-gray-400 bg-transparent outline-none"
                        placeholder="リンクを追加"
                    />
                </div>

                {/* Gender - Clickable Row */}
                <button
                    className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white"
                    onClick={() => {
                        // In a real app, open a picker/modal here
                        const options = ['女性', '男性', 'カスタム', '回答しない'];
                        const currentIndex = options.indexOf(formData.gender);
                        const nextIndex = (currentIndex + 1) % options.length;
                        handleChange('gender', options[nextIndex]);
                    }}
                >
                    <span className="text-sm text-gray-900">性別</span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{formData.gender}</span>
                        <ChevronRight size={18} className="text-gray-400" />
                    </div>
                </button>
            </section>

            {/* Additional Options Section */}
            <section className="bg-white mt-4">
                <button className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <span className="text-sm text-blue-500">プロアカウントに切り替える</span>
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <span className="text-sm text-blue-500">個人の情報の設定</span>
                </button>
            </section>

            {/* Bottom padding */}
            <div className="h-20" />
        </div>
    );
}

export default ProfileEditScreen;
