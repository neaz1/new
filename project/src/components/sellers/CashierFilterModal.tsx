import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

type FilterOptions = {
  status: 'چالاک' | 'ناچالاک' | '';
  city: string;
  district: string;
  hasKyc: boolean | '';
  minBalance: number | '';
  maxBalance: number | '';
};

type CashierFilterModalProps = {
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters?: FilterOptions;
};

export function CashierFilterModal({ onClose, onApply, currentFilters }: CashierFilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters || {
    status: '',
    city: '',
    district: '',
    hasKyc: '',
    minBalance: '',
    maxBalance: '',
  });

  const cities = ['هەولێر', 'سلێمانی', 'دهۆک', 'کەرکوک', 'هەڵەبجە'];
  const districts = ['شارەوانی', 'ئازادی', 'گەڕەک ١', 'گەڕەک ٢', 'ناوەندی شار'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      status: '',
      city: '',
      district: '',
      hasKyc: '',
      minBalance: '',
      maxBalance: '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">فلتەرکردنی فرۆشیارەکان</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  دۆخ
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  <option value="چالاک">چالاک</option>
                  <option value="ناچالاک">ناچالاک</option>
                </select>
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  شار
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* District Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ناوچە
                </label>
                <select
                  value={filters.district}
                  onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              {/* KYC Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  KYC
                </label>
                <select
                  value={filters.hasKyc as any}
                  onChange={(e) => setFilters({ ...filters, hasKyc: e.target.value === '' ? '' : e.target.value === 'true' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  <option value="true">تەواوکراو</option>
                  <option value="false">تەواونەکراو</option>
                </select>
              </div>

              {/* Balance Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  کەمترین باڵانس
                </label>
                <input
                  type="number"
                  value={filters.minBalance}
                  onChange={(e) => setFilters({ ...filters, minBalance: e.target.value ? Number(e.target.value) : '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="0"
                  placeholder="کەمترین"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  زۆرترین باڵانس
                </label>
                <input
                  type="number"
                  value={filters.maxBalance}
                  onChange={(e) => setFilters({ ...filters, maxBalance: e.target.value ? Number(e.target.value) : '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="0"
                  placeholder="زۆرترین"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" type="button" onClick={handleReset}>
                پاککردنەوە
              </Button>
              <Button variant="outline" type="button" onClick={onClose}>
                هەڵوەشاندنەوە
              </Button>
              <Button type="submit">
                جێبەجێکردن
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}