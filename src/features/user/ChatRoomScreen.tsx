import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Send } from 'lucide-react';

// --- Types ---
type Message = {
  id: number;
  text: string;
  isMine: boolean;
  time: string;
};

type ChatPartner = {
  id: string;
  name: string;
  avatar: string;
};

// --- Dummy Data ---
const CHAT_PARTNERS: Record<string, ChatPartner> = {
  '1': {
    id: '1',
    name: 'Dress 渋谷本院',
    avatar: '/images/skin/001.webp',
  },
  '2': {
    id: '2',
    name: 'White Dental Clinic',
    avatar: '/images/skin/011.webp',
  },
  '3': {
    id: '3',
    name: 'BuildUpBeauty',
    avatar: '/images/skin/021.webp',
  },
};

const DUMMY_MESSAGES: Message[] = [
  {
    id: 1,
    text: 'お問い合わせありがとうございます。Dress 渋谷本院です。',
    isMine: false,
    time: '10:00',
  },
  {
    id: 2,
    text: 'ご予約の変更についてですね。確認いたします。',
    isMine: false,
    time: '10:01',
  },
  {
    id: 3,
    text: 'はい、2月5日の14:00の予約を別の日に変更したいのですが、可能でしょうか？',
    isMine: true,
    time: '10:05',
  },
  {
    id: 4,
    text: 'かしこまりました。ご希望の日時はございますか？',
    isMine: false,
    time: '10:07',
  },
  {
    id: 5,
    text: '2月8日か9日の午後であれば助かります。',
    isMine: true,
    time: '10:10',
  },
  {
    id: 6,
    text: '確認いたしました。2月8日（土）15:00と、2月9日（日）14:30に空きがございます。',
    isMine: false,
    time: '10:15',
  },
  {
    id: 7,
    text: 'どちらがご都合よろしいでしょうか？',
    isMine: false,
    time: '10:15',
  },
  {
    id: 8,
    text: '2月8日の15:00でお願いします！',
    isMine: true,
    time: '10:18',
  },
  {
    id: 9,
    text: 'ありがとうございます。2月8日（土）15:00に変更いたしました。',
    isMine: false,
    time: '10:20',
  },
  {
    id: 10,
    text: '当日お待ちしております。',
    isMine: false,
    time: '10:20',
  },
];

// --- Message Bubble Component ---
const MessageBubble: React.FC<{
  message: Message;
  partnerAvatar: string;
  showAvatar: boolean;
}> = ({ message, partnerAvatar, showAvatar }) => {
  if (message.isMine) {
    return (
      <div className="flex justify-end items-end gap-2 mb-2">
        <span className="text-[10px] text-gray-400 mb-1">{message.time}</span>
        <div className="max-w-[75%] bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2.5 rounded-2xl rounded-br-md shadow-sm">
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2 mb-2">
      {showAvatar ? (
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
          <img src={partnerAvatar} alt="avatar" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-8 shrink-0" />
      )}
      <div className="max-w-[75%] bg-gray-100 text-gray-800 px-4 py-2.5 rounded-2xl rounded-bl-md">
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
      <span className="text-[10px] text-gray-400 mb-1">{message.time}</span>
    </div>
  );
};

// --- Main Component ---
export default function ChatRoomScreen() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const partner = CHAT_PARTNERS[id || '1'] || CHAT_PARTNERS['1'];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText.trim(),
      isMine: true,
      time: timeStr,
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMessage: Message = {
        id: messages.length + 2,
        text: 'メッセージを受け取りました。担当者より改めてご連絡いたします。',
        isMine: false,
        time: timeStr,
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Determine if avatar should be shown (first message or different sender from previous)
  const shouldShowAvatar = (index: number) => {
    if (messages[index].isMine) return false;
    if (index === 0) return true;
    return messages[index - 1].isMine;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 h-14 flex items-center gap-3 shadow-sm">
        <button
          onClick={() => navigate('/', { state: { tab: 'reservation' } })}
          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all -ml-2"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 shrink-0">
          <img src={partner.avatar} alt={partner.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-gray-900 text-sm truncate">{partner.name}</h1>
          <p className="text-[10px] text-green-500">オンライン</p>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
        {/* Date Divider */}
        <div className="flex items-center justify-center mb-4">
          <span className="text-[10px] text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
            今日
          </span>
        </div>

        {/* Messages */}
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            partnerAvatar={partner.avatar}
            showAvatar={shouldShowAvatar(index)}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 pb-safe">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="メッセージを入力..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border border-transparent focus:border-blue-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              inputText.trim()
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md active:scale-95'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
