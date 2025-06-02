import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { SearchableSelect } from '../ui/SearchableSelect';
import { X } from 'lucide-react';
import { Delivery } from '../../types';

type DeliveryEditModalProps = {
  delivery: Delivery;
  onClose: () => void;
  onSave: (updatedDelivery: Delivery) => void;
};

export function DeliveryEditModal({ delivery, onClose, onSave }: DeliveryEditModalProps) {
  const [formData, setFormData] = useState({
    recipientName: delivery.recipientName,
    phone1: delivery.phone1,
    phone2: delivery.phone2 || '',
    city: delivery.city,
    district: delivery.district,
    neighborhood: delivery.neighborhood,
    fullAddress: delivery.fullAddress,
    totalPrice: delivery.totalPrice,
    hasBreakageRisk: delivery.hasBreakageRisk,
    deliveryType: delivery.deliveryType,
    status: delivery.status,
  });

  // Mock data for stores with code and phone
  const stores = [
    { id: '1', code: 'ST001', name: 'فرۆشگای ١', phone: '0750 123 4567' },
    { id: '2', code: 'ST002', name: 'فرۆشگای ٢', phone: '0750 234 5678' },
    { id: '3', code: 'ST003', name: 'فرۆشگای ٣', phone: '0750 345 6789' },
  ];

  const cities = ['هەولێر', 'سلێمانی', 'دهۆک', 'کەرکوک', 'هەڵەبجە'];
  const districts = ['شارەوانی', 'ئازادی', 'گەڕەک ١', 'گەڕەک ٢', 'ناوەندی شار'];
  const neighborhoods = ['گەڕەکی ١', 'گەڕەکی ٢', 'گەڕەکی ٣', 'گەڕەکی ٤'];
  const statuses = ['چاوەڕوانە', 'بەردەوامە', 'تەواوبوو', 'کێشەی هەیە', 'نەگیشتوە'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...delivery,
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">دەستکاری گەیاندن</h2>
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

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                دۆخ
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Recipient Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ناوی وەرگر
              </label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            {/* Phone Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ژمارەی مۆبایل ١
                </label>
                <input
                  type="tel"
                  value={formData.phone1}
                  onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ژمارەی مۆبایل ٢
                </label>
                <input
                  type="tel"
                  value={formData.phone2}
                  onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {/* Location Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  شار
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">هەڵبژاردنی شار</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ناوچە
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">هەڵبژاردنی ناوچە</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  گەڕەک
                </label>
                <select
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">هەڵبژاردنی گەڕەک</option>
                  {neighborhoods.map(neighborhood => (
                    <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Full Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ناونیشانی تەواو
              </label>
              <textarea
                value={formData.fullAddress}
                onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={3}
                required
              />
            </div>

            {/* Total Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                نرخی گشتی
              </label>
              <input
                type="number"
                value={formData.totalPrice}
                onChange={(e) => setFormData({ ...formData, totalPrice: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                min="0"
                required
              />
            </div>

            {/* Breakage Risk */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="breakageRisk"
                checked={formData.hasBreakageRisk}
                onChange={(e) => setFormData({ ...formData, hasBreakageRisk: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="breakageRisk" className="mr-2 block text-sm text-gray-700 dark:text-gray-300">
                ئەگەری مەترسی شکانی هەیە
              </label>
            </div>

            {/* Delivery Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                جۆری گەیاندن
              </label>
              <select
                value={formData.deliveryType}
                onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value as 'فرۆشتن' | 'گەڕاوە' | 'گۆڕین' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="فرۆشتن">فرۆشتن</option>
                <option value="گەڕاوە">گەڕاوە</option>
                <option value="گۆڕین">گۆڕین</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" type="button" onClick={onClose}>
                هەڵوەشاندنەوە
              </Button>
              <Button type="submit">
                پاشەکەوتکردن
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}