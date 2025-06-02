import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { MessageSquare, Phone, Send, Image, Paperclip, MoreVertical, User, Building2, Store, Users } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

type ChatType = 'office' | 'seller' | 'customer';

type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
};

type Chat = {
  id: string;
  type: ChatType;
  participantId: string;
  participantName: string;
  participantImage?: string;
  lastMessage?: Message;
  unreadCount: number;
  status: 'online' | 'offline';
  lastActive?: Date;
};

// Mock data for different chat types
const mockChats: Chat[] = [
  // Office chats
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `chat-office-${i + 1}`,
    type: 'office' as ChatType,
    participantId: `office-${i + 1}`,
    participantName: `ئۆفیسی ${i + 1}`,
    participantImage: `https://randomuser.me/api/portraits/men/${i + 1}.jpg`,
    lastMessage: {
      id: `msg-${i}`,
      senderId: Math.random() > 0.5 ? 'current-user' : `office-${i + 1}`,
      receiverId: Math.random() > 0.5 ? `office-${i + 1}` : 'current-user',
      content: `نامەی ئۆفیس ${i + 1}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)),
      status: ['sent', 'delivered', 'read'][Math.floor(Math.random() * 3)] as any,
      type: 'text'
    },
    unreadCount: Math.floor(Math.random() * 5),
    status: Math.random() > 0.3 ? 'online' : 'offline',
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 60) * 60 * 1000),
  })),
  
  // Seller chats
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `chat-seller-${i + 1}`,
    type: 'seller' as ChatType,
    participantId: `seller-${i + 1}`,
    participantName: `فرۆشیار ${i + 1}`,
    participantImage: `https://randomuser.me/api/portraits/women/${i + 1}.jpg`,
    lastMessage: {
      id: `msg-${i}`,
      senderId: Math.random() > 0.5 ? 'current-user' : `seller-${i + 1}`,
      receiverId: Math.random() > 0.5 ? `seller-${i + 1}` : 'current-user',
      content: `نامەی فرۆشیار ${i + 1}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)),
      status: ['sent', 'delivered', 'read'][Math.floor(Math.random() * 3)] as any,
      type: 'text'
    },
    unreadCount: Math.floor(Math.random() * 5),
    status: Math.random() > 0.3 ? 'online' : 'offline',
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 60) * 60 * 1000),
  })),
  
  // Customer chats
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `chat-customer-${i + 1}`,
    type: 'customer' as ChatType,
    participantId: `customer-${i + 1}`,
    participantName: `کڕیار ${i + 1}`,
    participantImage: `https://randomuser.me/api/portraits/men/${i + 10}.jpg`,
    lastMessage: {
      id: `msg-${i}`,
      senderId: Math.random() > 0.5 ? 'current-user' : `customer-${i + 1}`,
      receiverId: Math.random() > 0.5 ? `customer-${i + 1}` : 'current-user',
      content: `نامەی کڕیار ${i + 1}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)),
      status: ['sent', 'delivered', 'read'][Math.floor(Math.random() * 3)] as any,
      type: 'text'
    },
    unreadCount: Math.floor(Math.random() * 5),
    status: Math.random() > 0.3 ? 'online' : 'offline',
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 60) * 60 * 1000),
  })),
];

const mockMessages: Record<string, Message[]> = {};
mockChats.forEach(chat => {
  mockMessages[chat.id] = Array.from({ length: 20 }, (_, i) => ({
    id: `msg-${chat.id}-${i}`,
    senderId: Math.random() > 0.5 ? 'current-user' : chat.participantId,
    receiverId: Math.random() > 0.5 ? chat.participantId : 'current-user',
    content: `نامەی ${i + 1} لە چاتی ${chat.participantName}`,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)),
    status: ['sent', 'delivered', 'read'][Math.floor(Math.random() * 3)] as any,
    type: 'text'
  }));
});

export function Chats() {
  const [chats] = useState<Chat[]>(mockChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ChatType>('office');

  const filteredChats = chats.filter(chat => {
    if (chat.type !== activeTab) return false;
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      chat.participantName.toLowerCase().includes(query) ||
      chat.lastMessage?.content.toLowerCase().includes(query)
    );
  });

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setMessages(mockMessages[chat.id]);
  };

  const handleSendMessage = () => {
    if (!selectedChat || !newMessage.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      receiverId: selectedChat.participantId,
      content: newMessage,
      timestamp: new Date(),
      status: 'sent',
      type: 'text'
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const getTabIcon = (type: ChatType) => {
    switch (type) {
      case 'office':
        return <Building2 size={20} />;
      case 'seller':
        return <Store size={20} />;
      case 'customer':
        return <Users size={20} />;
    }
  };

  const getTabLabel = (type: ChatType) => {
    switch (type) {
      case 'office':
        return 'ئۆفیسەکان';
      case 'seller':
        return 'فرۆشیارەکان';
      case 'customer':
        return 'کڕیارەکان';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Chat List */}
      <div className="w-full md:w-80 border-l border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">چاتەکان</h1>
          
          {/* Chat Type Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
            {(['office', 'seller', 'customer'] as ChatType[]).map((type) => (
              <button
                key={type}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === type
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab(type)}
              >
                {getTabIcon(type)}
                <span className="text-sm font-medium">{getTabLabel(type)}</span>
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                  {chats.filter(chat => chat.type === type).length}
                </span>
              </button>
            ))}
          </div>
          
          <SearchInput 
            placeholder="گەڕان بۆ چات..."
            onSearch={(query) => setSearchQuery(query)}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                selectedChat?.id === chat.id ? 'bg-gray-50 dark:bg-gray-800' : ''
              }`}
              onClick={() => handleChatSelect(chat)}
            >
              <div className="relative">
                {chat.participantImage ? (
                  <img 
                    src={chat.participantImage} 
                    alt={chat.participantName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
                <span className={`absolute bottom-0 left-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                  chat.status === 'online' ? 'bg-success-500' : 'bg-gray-400'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {chat.participantName}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {chat.lastMessage && formatDate(chat.lastMessage.timestamp)}
                  </span>
                </div>

                {chat.lastMessage && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {chat.lastMessage.content}
                  </p>
                )}

                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {chat.status === 'offline' && chat.lastActive && `دوا چالاکی: ${formatDate(chat.lastActive)}`}
                  </span>
                  {chat.unreadCount > 0 && (
                    <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-1 flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedChat.participantImage ? (
                  <img 
                    src={selectedChat.participantImage} 
                    alt={selectedChat.participantName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
                <div>
                  <h2 className="font-medium text-gray-900 dark:text-white">
                    {selectedChat.participantName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedChat.status === 'online' ? 'سەرهێڵ' : 'دەرهێڵ'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" leftIcon={<Phone size={16} />}>
                  پەیوەندی
                </Button>
                <Button variant="outline" size="sm" leftIcon={<MoreVertical size={16} />}>
                  زیاتر
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${
                    message.senderId === 'current-user'
                      ? 'bg-primary-500 text-white rounded-l-lg rounded-tr-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-r-lg rounded-tl-lg'
                  } p-3`}>
                    <p>{message.content}</p>
                    <div className={`text-xs mt-1 flex items-center gap-1 ${
                      message.senderId === 'current-user'
                        ? 'text-primary-100'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatDate(message.timestamp)}
                      {message.senderId === 'current-user' && (
                        <span>{message.status === 'read' ? '✓✓' : '✓'}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Image size={18} />
                </Button>
                <Button variant="outline" size="sm">
                  <Paperclip size={18} />
                </Button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="نامەکەت بنووسە..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                چاتێک هەڵبژێرە
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                چاتێک لە لیستی چاتەکان هەڵبژێرە بۆ دەستپێکردنی گفتوگۆ
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}