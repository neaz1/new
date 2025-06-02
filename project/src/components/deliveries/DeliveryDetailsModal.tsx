import React from 'react';
import { Button } from '../ui/Button';
import { X, MapPin, Phone, Package, Calendar, Clock, AlertTriangle, Truck, History, Building2 } from 'lucide-react';
import { Delivery } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { StatusBadge } from '../ui/StatusBadge';

type DeliveryHistory = {
  status: string;
  location: string;
  timestamp: Date;
  note?: string;
  office?: string;
};

type DeliveryDetailsModalProps = {
  delivery: Delivery;
  onClose: () => void;
};

export function DeliveryDetailsModal({ delivery, onClose }: DeliveryDetailsModalProps) {
  // Mock office data - in a real app this would come from your backend
  const office = {
    name: 'ئۆفیسی سەرەکی',
    manager: 'ئەحمەد محەمەد',
    phone: '٠٧٥٠ ١٢٣ ٤٥٦٧',
    address: 'شەقامی ١٠٠ مەتری',
    city: delivery.city
  };

  // Mock delivery history - in a real app this would come from your backend
  const deliveryHistory: DeliveryHistory[] = [
    {
      status: 'وەرگیراوە',
      location: office.name,
      timestamp: delivery.createdAt,
      note: 'داواکاری گەیاندن وەرگیرا',
      office: office.name
    },
    {
      status: 'لە ئۆفیسە',
      location: `${delivery.city} - ئۆفیسی ناوچەیی`,
      timestamp: new Date(delivery.createdAt.getTime() + 2 * 60 * 60 * 1000),
      note: 'گەیشتە ئۆفیسی ناوچەیی',
      office: 'ئۆفیسی ناوچەیی'
    },
    {
      status: 'دابەشکرا بۆ شۆفێر',
      location: delivery.city,
      timestamp: delivery.assignedAt || new Date(delivery.createdAt.getTime() + 3 * 60 * 60 * 1000),
      note: delivery.driverId ? `دابەشکرا بۆ شۆفێر ${delivery.driverId}` : undefined,
      office: 'ئۆفیسی ناوچەیی'
    }
  ];

  // Add delivered status if applicable
  if (delivery.deliveredAt) {
    deliveryHistory.push({
      status: 'گەیشت',
      location: `${delivery.city} - ${delivery.district}`,
      timestamp: delivery.deliveredAt,
      note: 'بە سەرکەوتوویی گەیشت',
      office: 'ئۆفیسی ناوچەیی'
    });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">وردەکاری گەیاندن</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ژمارەی تراکینگ: {delivery.trackingNumber}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {/* Status and Dates */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <StatusBadge status={delivery.status} />
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={16} className="ml-2" />
                  {formatDate(delivery.createdAt)}
                </div>
              </div>
              
              {delivery.assignedAt && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <Truck size={16} className="ml-2" />
                  دیاریکراو: {formatDate(delivery.assignedAt)}
                </div>
              )}
              
              {delivery.deliveredAt && (
                <div className="mt-2 text-sm text-success-600 dark:text-success-400 flex items-center">
                  <Clock size={16} className="ml-2" />
                  گەیشتوو: {formatDate(delivery.deliveredAt)}
                </div>
              )}
            </div>

            {/* Office Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
                <Building2 size={20} className="ml-2" />
                زانیاری ئۆفیس
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ناوی ئۆفیس:</p>
                    <p className="font-medium text-gray-900 dark:text-white">{office.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">بەڕێوەبەر:</p>
                    <p className="font-medium text-gray-900 dark:text-white">{office.manager}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ژمارەی پەیوەندی:</p>
                    <p className="font-medium text-gray-900 dark:text-white">{office.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ناونیشان:</p>
                    <p className="font-medium text-gray-900 dark:text-white">{office.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery History */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <History size={20} className="ml-2" />
                مێژووی گەیاندن
              </h3>
              <div className="space-y-4">
                {deliveryHistory.map((history, index) => (
                  <div 
                    key={index}
                    className="relative pb-8 last:pb-0"
                  >
                    {index < deliveryHistory.length - 1 && (
                      <div className="absolute right-4 top-8 -bottom-2 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    )}
                    <div className="flex items-start">
                      <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-2 ml-4">
                        <Clock size={16} className="text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {history.status}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {history.location}
                            </p>
                            {history.office && (
                              <p className="text-xs text-primary-600 dark:text-primary-400">
                                {history.office}
                              </p>
                            )}
                            {history.note && (
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {history.note}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {formatDate(history.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">زانیاری وەرگر</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="font-medium ml-2">ناو:</span>
                    {delivery.recipientName}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Phone size={16} className="ml-2" />
                    {delivery.phone1}
                  </div>
                  {delivery.phone2 && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Phone size={16} className="ml-2" />
                      {delivery.phone2}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin size={16} className="ml-2" />
                    {delivery.city} - {delivery.district}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="font-medium ml-2">گەڕەک:</span>
                    {delivery.neighborhood}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="font-medium ml-2">ناونیشان:</span>
                    {delivery.fullAddress}
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">وردەکاری گەیاندن</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Package size={16} className="ml-2" />
                    جۆری گەیاندن: {delivery.deliveryType}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="font-medium ml-2">نرخی گشتی:</span>
                    {delivery.totalPrice.toLocaleString()} د.ع
                  </div>
                  {delivery.hasBreakageRisk && (
                    <div className="flex items-center text-warning-600">
                      <AlertTriangle size={16} className="ml-2" />
                      ئەگەری شکانی هەیە
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="font-medium ml-2">کۆدی فرۆشگا:</span>
                    {delivery.storeId}
                  </div>
                  {delivery.driverId && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <span className="font-medium ml-2">کۆدی شۆفێر:</span>
                      {delivery.driverId}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {delivery.notes && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">تێبینی</h3>
                <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded">
                  {delivery.notes}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>داخستن</Button>
          </div>
        </div>
      </div>
    </div>
  );
}