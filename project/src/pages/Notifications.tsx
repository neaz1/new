import React, { useState } from 'react';
import { Bell, CheckCircle, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

type Notification = {
  id: string;
  title: string;
  message: string;
  time: Date;
  read: boolean;
  type: 'delivery' | 'driver' | 'issue' | 'system';
};

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
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

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ئاگادارکردنەوەکان</h1>
          <p className="text-gray-600 dark:text-gray-400">بینینی هەموو ئاگادارکردنەوەکان</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={markAllAsRead}
            leftIcon={<CheckCircle size={16} />}
          >
            خوێندنەوەی هەموو
          </Button>
          <Button
            variant="danger"
            onClick={deleteAllNotifications}
            leftIcon={<Trash2 size={16} />}
          >
            سڕینەوەی هەموو
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-4 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="mt-1">
                      <Bell size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(notification.time).toLocaleString('ckb-IQ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCircle size={14} />
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Bell size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              هیچ ئاگادارکردنەوەیەک نیە
            </h3>
            <p className="text-gray-500">
              هیچ ئاگادارکردنەوەیەکی نوێت نیە لە ئێستادا
            </p>
          </div>
        )}
      </div>
    </div>
  );
}