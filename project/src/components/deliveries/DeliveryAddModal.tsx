import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { SearchableSelect } from '../ui/SearchableSelect';
import { X } from 'lucide-react';
import { DeliveryStatus } from '../../types';

type DeliveryFormData = {
  storeId: string;
  recipientName: string;
  phone1: string;
  phone2: string;
  city: string;
  district: string;
  neighborhood: string;
  fullAddress: string;
  totalPrice: number;
  hasBreakageRisk: boolean;
  deliveryType: 'فرۆشتن' | 'گەڕاوە' | 'گۆڕین';
};

type DeliveryAddModalProps = {
  onClose: () => void;
  onAdd: (delivery: DeliveryFormData) => void;
};

export function DeliveryAddModal({ onClose, onAdd }: DeliveryAddModalProps) {
  const [formData, setFormData] = useState<DeliveryFormData>({
    storeId: '',
    recipientName: '',
    phone1: '',
    phone2: '',
    city: '',
    district: '',
    neighborhood: '',
    fullAddress: '',
    totalPrice: 0,
    hasBreakageRisk: false,
    deliveryType: 'فرۆشتن',
  });

  // Mock data for stores with code and phone
  const stores = [
    { id: '1', code: 'ST001', name: 'فرۆشگای ١', phone: '0750 123 4567' },
    { id: '2', code: 'ST002', name: 'فرۆشگای ٢', phone: '0750 234 5678' },
    { id: '3', code: 'ST003', name: 'فرۆشگای ٣', phone: '0750 345 6789' },
    { id: '4', code: 'ST004', name: 'فرۆشگای ٤', phone: '0750 456 7890' },
    { id: '5', code: 'ST005', name: 'فرۆشگای ٥', phone: '0750 567 8901' },
    { id: '6', code: 'ST006', name: 'فرۆشگای ٦', phone: '0750 678 9012' },
    { id: '7', code: 'ST007', name: 'فرۆشگای ٧', phone: '0750 789 0123' },
    { id: '8', code: 'ST008', name: 'فرۆشگای ٨', phone: '0750 890 1234' },
    { id: '9', code: 'ST009', name: 'فرۆشگای ٩', phone: '0750 901 2345' },
    { id: '10', code: 'ST010', name: 'فرۆشگای ١٠', phone: '0750 012 3456' },
  ];

  const cities = ['هەولێر', 'سلێمانی', 'دهۆک', 'کەرکوک', 'هەڵەبجە'];
  const districts = ['شارەوانی', 'ئازادی', 'گەڕەک ١', 'گەڕەک ٢', 'ناوەندی شار'];
  const neighborhoods = ['گەڕەکی ١', 'گەڕەکی ٢', 'گەڕەکی ٣', 'گەڕەکی ٤'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">گەیاندنی نوێ</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Store Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                فرۆشگا
              </label>
              <SearchableSelect
                options={stores}
                value={formData.storeId}
                onChange={(value) => setFormData({ ...formData, storeId: value })}
                placeholder="گەڕان بۆ کۆد، ناو یان ژمارە..."
                required
              />
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
                زیادکردن
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}