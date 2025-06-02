import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, Package, Truck, CheckCircle, Clock, DollarSign, Store } from 'lucide-react';

const DeliveryMapComponent = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 36.1911, lng: 44.0092 });

  // Order statuses based on the image
  const orderStatuses = {
    1: { name: 'وەرگیرا', icon: '💯', color: 'bg-green-200', progress: 0 },
    2: { name: 'ئامادەکراوە بۆ داشکردن', icon: '✅', color: 'bg-green-400', progress: 25 },
    3: { name: 'لە ئۆفیسە', icon: '🏢', color: 'bg-green-500', progress: 50 },
    4: { name: 'لەلای شۆڤێرە', icon: '🛵', color: 'bg-green-600', progress: 75 },
    5: { name: 'فرۆشراو', icon: '🏪', color: 'bg-green-700', progress: 100 }
  };

  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customerName: 'ئەحمەد محەمەد',
      address: 'گەڕەکی عەنکاوا، ماڵی ژمارە ١٢',
      phone: '0750-123-4567',
      amount: 45000,
      status: 4,
      lat: 36.2100,
      lng: 44.0200,
      items: ['پیتزا مارگەریتا', 'کۆکاکۆلا'],
      orderTime: '12:30 PM',
      estimatedDelivery: '1:15 PM',
      isPaid: false
    },
    {
      id: 'ORD002',
      customerName: 'فاتیمە ئەحمەد',
      address: 'ئازادی، نزیک پارکی شارستانی',
      phone: '0770-987-6543',
      amount: 32000,
      status: 2,
      lat: 36.1851,
      lng: 44.0085,
      items: ['برگەر', 'پەتاتەی سوور'],
      orderTime: '1:00 PM',
      estimatedDelivery: '1:45 PM',
      isPaid: true
    },
    {
      id: 'ORD003',
      customerName: 'کارۆ حەسەن',
      address: 'شارەوانی، لە دوای بانکی کوردستان',
      phone: '0751-456-7890',
      amount: 28000,
      status: 5,
      lat: 36.1906,
      lng: 44.0088,
      items: ['کەباب', 'دۆخ'],
      orderTime: '11:45 AM',
      estimatedDelivery: '12:30 PM',
      isPaid: true
    },
    {
      id: 'ORD004',
      customerName: 'سەرهەنگ ئەمین',
      address: 'گەڕەکی ١٠٠ مەتری، کۆمپلێکسی ئاسیا',
      phone: '0750-321-9876',
      amount: 67000,
      status: 1,
      lat: 36.1750,
      lng: 44.0150,
      items: ['پیتزا کبیرە', 'مەزە', 'پەپسی'],
      orderTime: '1:20 PM',
      estimatedDelivery: '2:05 PM',
      isPaid: false
    },
    {
      id: 'ORD005',
      customerName: 'ڕۆژان عەلی',
      address: 'ئەنکاوا، گەڕەکی کلیسا',
      phone: '0770-654-3210',
      amount: 39000,
      status: 3,
      lat: 36.2000,
      lng: 44.0100,
      items: ['شاورما', 'سەڵاتە'],
      orderTime: '12:45 PM',
      estimatedDelivery: '1:30 PM',
      isPaid: true
    }
  ]);

  // Statistics
  const stats = {
    totalOrders: orders.length,
    completedOrders: orders.filter(o => o.status === 5).length,
    pendingOrders: orders.filter(o => o.status < 5).length,
    totalRevenue: orders.filter(o => o.isPaid).reduce((sum, o) => sum + o.amount, 0),
    unpaidAmount: orders.filter(o => !o.isPaid).reduce((sum, o) => sum + o.amount, 0)
  };

  // Simulate Google Maps loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusInfo = (status) => orderStatuses[status];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US').format(amount) + ' دینار';
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">بارکردنی نەخشەی گەیاندن...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">{stats.totalOrders}</div>
          <div className="text-sm text-blue-600">کۆی ئۆردەر</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">{stats.completedOrders}</div>
          <div className="text-sm text-green-600">تەواوبوو</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</div>
          <div className="text-sm text-orange-600">چاوەڕوانە</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-lg font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</div>
          <div className="text-sm text-green-600">وەرگیرا</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <DollarSign className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-lg font-bold text-red-600">{formatCurrency(stats.unpaidAmount)}</div>
          <div className="text-sm text-red-600">وەرنەگیراو</div>
        </div>
      </div>

      {/* Order Status Progress */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">قۆناغەکانی گەیاندن</h3>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
          {Object.entries(orderStatuses).map(([key, status], index) => (
            <div key={key} className="flex flex-col items-center flex-1 min-w-[120px]">
              <div className={`w-16 h-16 ${status.color} rounded-full flex items-center justify-center text-white text-2xl shadow-lg border-2 border-white dark:border-gray-700`}>
                {status.icon}
              </div>
              <div className="text-center mt-3">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{status.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{status.progress}%</div>
              </div>
              {index < Object.keys(orderStatuses).length - 1 && (
                <div className="hidden md:block w-12 h-1 bg-green-300 absolute left-1/2 top-1/2 transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
        {/* Fake Map Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-200"></div>
            ))}
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 space-y-2">
          <button className="block w-8 h-8 bg-white hover:bg-gray-50 border rounded flex items-center justify-center text-sm">+</button>
          <button className="block w-8 h-8 bg-white hover:bg-gray-50 border rounded flex items-center justify-center text-sm">−</button>
          <button className="block w-8 h-8 bg-white hover:bg-gray-50 border rounded flex items-center justify-center">
            <Navigation className="w-4 h-4" />
          </button>
        </div>

        {/* Order Markers on Map */}
        {orders.map((order, index) => {
          const statusInfo = getStatusInfo(order.status);
          return (
            <div
              key={order.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${15 + (index * 16)}%`,
                top: `${25 + (index * 12)}%`
              }}
              onClick={() => setSelectedOrder(order)}
            >
              <div className={`w-10 h-10 ${statusInfo.color} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-white`}>
                <span className="text-lg">{statusInfo.icon}</span>
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {order.id}
                </div>
              </div>
            </div>
          );
        })}

        {/* Selected Order Info Popup */}
        {selectedOrder && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-4 min-w-80 max-w-sm z-20 border">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg">{selectedOrder.id}</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div><strong>کڕیار:</strong> {selectedOrder.customerName}</div>
              <div><strong>ناونیشان:</strong> {selectedOrder.address}</div>
              <div><strong>تەلەفۆن:</strong> {selectedOrder.phone}</div>
              <div><strong>بڕی پارە:</strong> {formatCurrency(selectedOrder.amount)}</div>
              <div className="flex items-center">
                <strong>دۆخ:</strong>
                <span className={`ml-2 px-2 py-1 rounded text-xs text-white ${getStatusInfo(selectedOrder.status).color}`}>
                  {getStatusInfo(selectedOrder.status).name}
                </span>
              </div>
              <div><strong>کاتی ئۆردەر:</strong> {selectedOrder.orderTime}</div>
              <div><strong>کاتی گەیاندن:</strong> {selectedOrder.estimatedDelivery}</div>
              <div className="flex items-center">
                <strong>پارەدان:</strong>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${selectedOrder.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {selectedOrder.isPaid ? 'پارەدراو' : 'پارەنەدراو'}
                </span>
              </div>
              
              <div className="border-t pt-2">
                <strong>بڕگەکان:</strong>
                <ul className="list-disc list-inside text-xs mt-1">
                  {selectedOrder.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-xs hover:bg-blue-600">
                پەیوەندی
              </button>
              <button className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-xs hover:bg-green-600">
                ڕێنیشاندان
              </button>
            </div>
          </div>
        )}

        {/* Center Label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          ئەربیل - چڕۆکەی ماڵەوە
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {orders.map((order) => {
          const statusInfo = getStatusInfo(order.status);
          return (
            <div
              key={order.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedOrder?.id === order.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{order.id}</h3>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs text-white ${statusInfo.color}`}>
                  {statusInfo.icon} {statusInfo.name}
                </div>
              </div>
              
              <div className="space-y-1 text-sm mb-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {order.address}
                </div>
                <div className="flex justify-between">
                  <span><strong>بڕی پارە:</strong> {formatCurrency(order.amount)}</span>
                  <span className={`px-2 py-1 rounded text-xs ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {order.isPaid ? 'پارەدراو' : 'پارەنەدراو'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>ئۆردەر: {order.orderTime}</span>
                  <span>گەیاندن: {order.estimatedDelivery}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${statusInfo.progress}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                {statusInfo.progress}% تەواو
              </div>
            </div>
          );
        })}
      </div>

      {/* Development Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
          <p className="text-sm text-yellow-800">
            <strong>سیستەمی گەیاندن:</strong> تاقیکردنەوەی تەواو لەگەڵ ڕوونکردنەوەی ئۆردەر، دۆخ، و پارەدان
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMapComponent;