import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Store, 
  Users, 
  AlertCircle,
  BarChart3,
  HelpCircle,
  MapPin,
  Receipt,
  MessageSquare,
  Settings,
  Truck,
  Menu,
  LogOut,
  Building2
} from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
};

export function Sidebar({ isOpen, toggle }: SidebarProps) {
  const navigate = useNavigate();
  
  const menuItems = [
    { path: '/', icon: LayoutDashboard, text: 'داشبۆرد' },
    { path: '/deliveries', icon: Package, text: 'گەیاندنەکان' },
    { path: '/drivers', icon: Truck, text: 'شۆفێرەکان' },
    { path: '/cashiers', icon: Store, text: 'فرۆشیار' },
    { path: '/customers', icon: Users, text: 'کڕیارەکان' },
    { path: '/issues', icon: AlertCircle, text: 'کێشەکان' },
    { path: '/analytics', icon: BarChart3, text: 'ژمێریاری' },
    { path: '/support', icon: HelpCircle, text: 'پشتگیری' },
    { path: '/office', icon: Building2, text: 'ئۆفیس' },
    { path: '/map', icon: MapPin, text: 'نەخشە' },
    { path: '/receipts', icon: Receipt, text: 'وەسڵەکان' },
    { path: '/chats', icon: MessageSquare, text: 'چاتەکان' },
    { path: '/users', icon: Users, text: 'بەکارهێنەران' },
    { path: '/settings', icon: Settings, text: 'ڕێکخستنەکان' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 lg:hidden"
          onClick={toggle}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 right-0 z-30 h-screen w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} lg:static`}
      >
        <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">گەیاندنی خێرا</h1>
          <button 
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            onClick={toggle}
          >
            <Menu size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-68px)]">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`
              }
              end={item.path === '/'}
            >
              <item.icon className="h-5 w-5 ml-2 rtl:ml-0 rtl:mr-2" />
              <span>{item.text}</span>
            </NavLink>
          ))}
          
          <div className="pt-4 mt-4 border-t dark:border-gray-800">
            <button 
              className="flex items-center px-3 py-2 rounded-lg w-full text-sm font-medium transition-colors bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/10 dark:hover:bg-red-900/20 dark:text-red-400"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 ml-2 rtl:ml-0 rtl:mr-2" />
              <span>دەرچوون</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}