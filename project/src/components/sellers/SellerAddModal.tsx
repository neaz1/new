import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { X, Upload } from 'lucide-react';

type SellerFormData = {
  name: string;
  email: string;
  phone1: string;
  phone2: string;
  fullAddress: string;
  businessLicense?: File;
  taxRegistration?: File;
  ownerIdCard?: File;
};

type SellerAddModalProps = {
  onClose: () => void;
  onAdd: (data: SellerFormData) => void;
};

export function SellerAddModal({ onClose, onAdd }: SellerAddModalProps) {
  const [formData, setFormData] = useState<SellerFormData>({
    name: '',
    email: '',
    phone1: '',
    phone2: '',
    fullAddress: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  const handleFileChange = (field: keyof Pick<SellerFormData, 'businessLicense' | 'taxRegistration' | 'ownerIdCard'>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">زیادکردنی فرۆشیاری نوێ</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ناوی فرۆشگا
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ئیمەیڵ
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

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

            {/* Required Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">بەڵگەنامە پێویستەکان</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  مۆڵەتی کار
                </label>
                <div className="flex items-center">
                  <label className="flex-1 cursor-pointer">
                    <div className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Upload size={16} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {formData.businessLicense?.name || 'هەڵبژاردنی بەڵگەنامە'}
                      </span>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileChange('businessLicense')}
                      className="hidden"
                      accept="image/*,.pdf"
                      required
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  تۆماری باج
                </label>
                <div className="flex items-center">
                  <label className="flex-1 cursor-pointer">
                    <div className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Upload size={16} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {formData.taxRegistration?.name || 'هەڵبژاردنی بەڵگەنامە'}
                      </span>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileChange('taxRegistration')}
                      className="hidden"
                      accept="image/*,.pdf"
                      required
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ناسنامەی خاوەن
                </label>
                <div className="flex items-center">
                  <label className="flex-1 cursor-pointer">
                    <div className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                      <Upload size={16} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {formData.ownerIdCard?.name || 'هەڵبژاردنی بەڵگەنامە'}
                      </span>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileChange('ownerIdCard')}
                      className="hidden"
                      accept="image/*,.pdf"
                      required
                    />
                  </label>
                </div>
              </div>
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