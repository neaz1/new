import React from 'react';
import { Button } from '../ui/Button';
import { X, Phone, MapPin, Package, Calendar, Wallet, Clock, CheckCircle, AlertTriangle, History } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { StatusBadge } from '../ui/StatusBadge';

type CustomerDetailsModalProps = {
  customer: {
    id: string;
    name: string;
    phone1: string;
    phone2?: string;
    orders: Array<{
      id: string;
      trackingNumber: string;
      status: string;
      createdAt: Date;
      location: {
        city: string;
        district: string;
        neighborhood: string;
        fullAddress: string;
      };
      totalPrice: number;
      history?: Array<{
        status: string;
        timestamp: Date;
        note?: string;
        amount?: number;
        type?: 'payment' | 'refund';
      }>;
    }>;
  };
  onClose: () => void;
};

export function CustomerDetailsModal({ customer, onClose }: CustomerDetailsModalProps) {
  // Calculate statistics
  const totalOrders = customer.orders.length;
  const completedOrders = customer.orders.filter(order => order.status === 'تەواوبوو').length;
  const totalSpent = customer.orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const lastOrderDate = new Date(Math.max(...customer.orders.map(o => o.createdAt.getTime())));
  
  // Get unique delivery locations
  const uniqueLocations = customer.orders.reduce((acc, order) => {
    const locationKey = `${order.location.city}-${order.location.district}-${order.location.neighborhood}`;
    if (!acc[locationKey]) {
      acc[locationKey] = {
        city: order.location.city,
        district: order.location.district,
        neighborhood: order.location.neighborhood,
        fullAddress: order.location.fullAddress,
        count: 0
      };
    }
    acc[locationKey].count++;
    return acc;
  }, {} as Record<string, any>);

  const mostUsedLocation = Object.values(uniqueLocations)
    .sort((a, b) => b.count - a.count)[0];

  // Calculate financial statistics
  const financialStats = customer.orders.reduce((stats, order) => {
    const history = order.history || [];
    const payments = history.filter(h => h.type === 'payment').reduce((sum, h) => sum + (h.amount || 0), 0);
    const refunds = history.filter(h => h.type === 'refund').reduce((sum, h) => sum + (h.amount || 0), 0);
    
    return {
      totalPayments: stats.totalPayments + payments,
      totalRefunds: stats.totalRefunds + refunds,
      pendingAmount: stats.pendingAmount + (order.totalPrice - payments + refunds)
    };
  }, { totalPayments: 0, totalRefunds: 0, pendingAmount: 0 });

  const openInGoogleMaps = (location: { city: string; district: string; neighborhood: string; fullAddress: string }) => {
    const query = encodeURIComponent(`${location.city} ${location.district} ${location.neighborhood} ${location.fullAddress}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">وردەکاری کڕیار</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                کۆدی کڕیار: {customer.id}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">زانیاری سەرەکی</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="font-medium ml-2">ناو:</span>
                    {customer.name}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Phone size={16} className="ml-2" />
                    {customer.phone1}
                  </div>
                  {customer.phone2 && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Phone size={16} className="ml-2" />
                      {customer.phone2}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Package size={16} className="ml-2" />
                    کۆی ئۆردەرەکان: {totalOrders}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CheckCircle size={16} className="ml-2" />
                    ئۆردەری تەواوبوو: {completedOrders}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar size={16} className="ml-2" />
                    دوا ئۆردەر: {formatDate(lastOrderDate)}
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">پوختەی دارایی</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-success-50 dark:bg-success-900/20 p-4 rounded-lg">
                  <div className="flex items-center text-success-600 dark:text-success-400 mb-2">
                    <Wallet size={16} className="ml-2" />
                    پارەی دراو
                  </div>
                  <div className="text-xl font-bold text-success-700 dark:text-success-300">
                    {financialStats.totalPayments.toLocaleString()} د.ع
                  </div>
                </div>

                <div className="bg-warning-50 dark:bg-warning-900/20 p-4 rounded-lg">
                  <div className="flex items-center text-warning-600 dark:text-warning-400 mb-2">
                    <AlertTriangle size={16} className="ml-2" />
                    پارەی ماوە
                  </div>
                  <div className="text-xl font-bold text-warning-700 dark:text-warning-300">
                    {financialStats.pendingAmount.toLocaleString()} د.ع
                  </div>
                </div>

                <div className="bg-danger-50 dark:bg-danger-900/20 p-4 rounded-lg">
                  <div className="flex items-center text-danger-600 dark:text-danger-400 mb-2">
                    <Wallet size={16} className="ml-2" />
                    گەڕاوە
                  </div>
                  <div className="text-xl font-bold text-danger-700 dark:text-danger-300">
                    {financialStats.totalRefunds.toLocaleString()} د.ع
                  </div>
                </div>
              </div>
            </div>

            {/* Most Used Location */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">زۆرترین شوێنی وەرگرتن</h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div 
                  className="flex items-start cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded transition-colors"
                  onClick={() => openInGoogleMaps(mostUsedLocation)}
                >
                  <MapPin size={16} className="ml-2 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {mostUsedLocation.city} - {mostUsedLocation.district}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {mostUsedLocation.neighborhood}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {mostUsedLocation.fullAddress}
                    </div>
                    <div className="text-sm text-primary-600 dark:text-primary-400 mt-2">
                      {mostUsedLocation.count} جار بەکارهێنراوە
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History with Financial Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">مێژووی ئۆردەر و پارەدان</h3>
              <div className="space-y-4">
                {customer.orders.map((order) => (
                  <div key={order.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {order.trackingNumber}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MapPin size={14} className="ml-2" />
                        {order.location.city} - {order.location.district}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Wallet size={14} className="ml-2" />
                        بڕی کۆی: {order.totalPrice.toLocaleString()} د.ع
                      </div>
                    </div>

                    {/* Payment History */}
                    {order.history && order.history.length > 0 && (
                      <div className="mt-4 border-t dark:border-gray-600 pt-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          <History size={14} className="inline ml-1" />
                          مێژووی پارەدان
                        </div>
                        <div className="space-y-2">
                          {order.history.map((event, index) => (
                            <div 
                              key={index}
                              className={`flex justify-between items-center text-sm ${
                                event.type === 'payment' 
                                  ? 'text-success-600 dark:text-success-400'
                                  : 'text-danger-600 dark:text-danger-400'
                              }`}
                            >
                              <div className="flex items-center">
                                <Clock size={14} className="ml-2" />
                                <span>{event.status}</span>
                                {event.note && (
                                  <span className="text-gray-500 dark:text-gray-400 mr-2">
                                    ({event.note})
                                  </span>
                                )}
                              </div>
                              {event.amount && (
                                <span className="font-medium">
                                  {event.amount.toLocaleString()} د.ع
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Total Spent */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">کۆی خەرجکراو</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalSpent.toLocaleString()} د.ع
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">تێکڕای هەر ئۆردەرێک</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {Math.round(totalSpent / totalOrders).toLocaleString()} د.ع
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>داخستن</Button>
          </div>
        </div>
      </div>
    </div>
  );
}