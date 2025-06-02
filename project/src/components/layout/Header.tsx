import React, { useState } from 'react';
import { Bell, Sun, Moon, Menu, User, Settings, LogOut } from 'lucide-react';
import { SearchInput } from '../ui/SearchInput';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  toggleSidebar: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  time: Date;
  read: boolean;
  type: 'delivery' | 'driver' | 'issue' | 'system';
};

export function Header({ toggleSidebar, toggleTheme, isDarkMode }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'گەیاندنی نوێ',
      message: 'گەیاندنێکی نوێ زیادکرا',
      time: new Date(),
      read: false,
      type: 'delivery'
    },
    {
      id: '2',
      title: 'داواکاری شۆفێر',
      message: 'داواکاریەکی نوێی شۆفێر هەیە',
      time: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      type: 'driver'
    },
    {
      id: '3',
      title: 'کێشەیەک ڕاپۆرتکرا',
      message: 'کێشەیەکی نوێ ڕاپۆرتکرا',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      type: 'issue'
    }
  ]);

  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    navigate('/notifications');
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm py-3 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden mr-2 dark:text-gray-400 dark:hover:bg-gray-800"
          onClick={toggleSidebar}
        >
          <Menu size={22} />
        </button>
        
        <SearchInput 
          placeholder="گەڕان بۆ تراکینگ، مۆبایل، فرۆشگا..."
          onSearch={(query) => console.log('Searching for:', query)}
          className="hidden md:block w-72 lg:w-96"
        />
      </div>
      
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-800">
          <SearchInput 
            onSearch={(query) => console.log('Searching for:', query)}
            className="w-full"
          />
        </button>
        
        <div className="relative">
          <button 
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 relative dark:text-gray-400 dark:hover:bg-gray-800"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white">ئاگادارکردنەوەکان</h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {new Date(notification.time).toLocaleTimeString('ckb-IQ')}
                    </p>
                  </div>
                ))}
              </div>

              {notifications.length > 0 && (
                <div className="p-4 text-center">
                  <button 
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                    onClick={handleViewAllNotifications}
                  >
                    بینینی هەموو ئاگادارکردنەوەکان
                  </button>
                </div>
              )}

              {notifications.length === 0 && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  هیچ ئاگادارکردنەوەیەک نیە
                </div>
              )}
            </div>
          )}
        </div>
        
        <button 
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          onClick={toggleTheme}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="flex items-center relative">
          <div className="mr-2 text-right">
            <p className="text-sm font-medium dark:text-gray-300">ئەحمەد محمد</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">بەڕێوەبەری سیستەم</p>
          </div>
          <button 
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700"
            onClick={handleProfileClick}
          >
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Profile"
              className="w-full h-full object-cover" 
            />
          </button>

          {showProfileMenu && (
            <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 top-full">
              <div className="py-1">
                <button
                  className="w-full text-right px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/settings');
                  }}
                >
                  <Settings size={16} className="ml-2" />
                  ڕێکخستنەکان
                </button>
                <button
                  className="w-full text-right px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="ml-2" />
                  دەرچوون
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}