import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Save, Upload, X, ImageIcon, MapPin, Store as StoreIcon } from 'lucide-react';

// 型定義
type Category = '肌' | '脱毛' | '顔' | 'ボディ' | '歯';

type ShopData = {
    id: number;
    name: string;
    branch: string;
    area: string;
    category: Category;
    tags: string[];
    description: string;
    images: string[];
    avatar: string;
};

// 初期データ（プレースホルダー用に一部空文字）
const INITIAL_DATA: ShopData = {
    id: 1,
    name: "",
    branch: "",
    area: "",
    category: '肌',
    tags: ["美肌", "オーガニック", "完全個室"],
    description: "",
    images: [], // 画像は最初は空
    avatar: ""
};

export default function StoreEditScreen() {
    const [shopData, setShopData] = useState<ShopData>(INITIAL_DATA);

    // 入力ハンドラ
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setShopData(prev => {
            if (name === 'category') {
                return { ...prev, category: value as Category };
            }
            return { ...prev, [name]: value } as ShopData;
        });
    };

    // タグ削除
    const removeTag = (tagToRemove: string) => {
        setShopData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    // タグ追加
    const [newTag, setNewTag] = useState("");
    const addTag = () => {
        if (newTag.trim() && !shopData.tags.includes(newTag.trim())) {
            setShopData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag("");
        }
    };

    // 画像削除
    const removeImage = (index: number) => {
        setShopData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    // --- Drag & Drop (Avatar) ---
    const onDropAvatar = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const imageUrl = URL.createObjectURL(file);
            setShopData(prev => ({ ...prev, avatar: imageUrl }));
        }
    }, []);

    const { getRootProps: getAvatarRootProps, getInputProps: getAvatarInputProps, isDragActive: isAvatarDragActive } = useDropzone({
        onDrop: onDropAvatar,
        accept: { 'image/*': [] },
        multiple: false
    });

    // --- Drag & Drop (Shop Images) ---
    const onDropImages = useCallback((acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map(file => URL.createObjectURL(file));
        setShopData(prev => ({
            ...prev,
            images: [...prev.images, ...newImages]
        }));
    }, []);

    const { getRootProps: getImagesRootProps, getInputProps: getImagesInputProps, isDragActive: isImagesDragActive } = useDropzone({
        onDrop: onDropImages,
        accept: { 'image/*': [] }
    });

    // 保存処理
    const handleSave = () => {
        console.log("Saving data:", shopData);
        alert("保存しました！（コンソールを確認してください）");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">店舗情報の編集</h1>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <Save size={20} />
                    保存する
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 左カラム：基本情報 */}
                <div className="lg:col-span-2 space-y-6">

                    {/* 基本情報カード */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <StoreIcon size={20} /> 基本情報
                        </h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">店舗名</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={shopData.name}
                                        onChange={handleChange}
                                        placeholder="例：Eco Skin Clinic"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">カテゴリ</label>
                                    <select
                                        name="category"
                                        value={shopData.category}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="肌">肌</option>
                                        <option value="脱毛">脱毛</option>
                                        <option value="顔">顔</option>
                                        <option value="ボディ">ボディ</option>
                                        <option value="歯">歯</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">支店名</label>
                                <input
                                    type="text"
                                    name="branch"
                                    value={shopData.branch}
                                    onChange={handleChange}
                                    placeholder="例：表参道本店"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">エリア</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="area"
                                        value={shopData.area}
                                        onChange={handleChange}
                                        placeholder="例：表参道 徒歩2分"
                                        className="w-full border border-gray-300 rounded-lg p-2 pl-10 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">紹介文</label>
                                <textarea
                                    name="description"
                                    value={shopData.description}
                                    onChange={handleChange}
                                    placeholder="例：自然由来の成分にこだわった肌質改善クリニックです。"
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 右カラム：画像・タグ */}
                <div className="space-y-6">

                    {/* タグ管理 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">⭐ 特徴タグ</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {shopData.tags.map(tag => (
                                <span key={tag} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-blue-800"><X size={14} /></button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="新しいタグを入力"
                                className="flex-1 border border-gray-300 rounded-lg p-2 text-sm outline-none"
                                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                            />
                            <button onClick={addTag} className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600">追加</button>
                        </div>
                    </div>

                    {/* 画像管理 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <ImageIcon size={20} /> 画像管理
                        </h2>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-600 mb-2">アイコン画像</label>
                            <div
                                {...getAvatarRootProps()}
                                className={`w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden transition-colors ${isAvatarDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <input {...getAvatarInputProps()} />
                                {shopData.avatar ? (
                                    <img src={shopData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xs text-gray-400 text-center px-1">画像を<br />ドロップ</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">店舗画像</label>
                            <div className="grid grid-cols-3 gap-2">
                                {shopData.images.map((img, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                                        <img src={img} alt={`Shop ${index}`} className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}

                                {/* 画像追加ボタン（Dropzone） */}
                                <div
                                    {...getImagesRootProps()}
                                    className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${isImagesDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    <input {...getImagesInputProps()} />
                                    <Upload size={20} className="text-gray-400 mb-1" />
                                    <span className="text-xs text-gray-400">追加</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
