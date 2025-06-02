import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';
import { DeliveryStatus } from '../../types';

type FilterOptions = {
  status: DeliveryStatus | '';
  city: string;
  minPrice: number | '';
  maxPrice: number | '';
  dateFrom: string;
  dateTo: string;
  storeId: string;
  driverId: string;
};

type DeliveryFilterModalProps = {
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters?: FilterOptions;
};

export function DeliveryFilterModal({ onClose, onApply, currentFilters }: DeliveryFilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters || {
    status: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    dateFrom: '',
    dateTo: '',
    storeId: '',
    driverId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      status: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      dateFrom: '',
      dateTo: '',
      storeId: '',
      driverId: '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">فلتەرکردنی گەیاندنەکان</h2>
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
                  onChange={(e) => setFilters({ ...filters, status: e.target.value as DeliveryStatus })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  <option value="تەواوبوو">تەواوبوو</option>
                  <option value="بەردەوامە">بەردەوامە</option>
                  <option value="چاوەڕوانە">چاوەڕوانە</option>
                  <option value="کێشەی هەیە">کێشەی هەیە</option>
                  <option value="نەگیشتوە">نەگیشتوە</option>
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
                  <option value="هەولێر">هەولێر</option>
                  <option value="سلێمانی">سلێمانی</option>
                  <option value="دهۆک">دهۆک</option>
                  <option value="کەرکوک">کەرکوک</option>
                  <option value="هەڵەبجە">هەڵەبجە</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  کەمترین نرخ
                </label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="0"
                  placeholder="کەمترین"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  زۆرترین نرخ
                </label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="0"
                  placeholder="زۆرترین"
                />
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  لە بەرواری
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  بۆ بەرواری
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Store Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  فرۆشگا
                </label>
                <select
                  value={filters.storeId}
                  onChange={(e) => setFilters({ ...filters, storeId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  <option value="1">فرۆشگای ١</option>
                  <option value="2">فرۆشگای ٢</option>
                  <option value="3">فرۆشگای ٣</option>
                </select>
              </div>

              {/* Driver Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  شۆفێر
                </label>
                <select
                  value={filters.driverId}
                  onChange={(e) => setFilters({ ...filters, driverId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  <option value="1">شۆفێر ١</option>
                  <option value="2">شۆفێر ٢</option>
                  <option value="3">شۆفێر ٣</option>
                </select>
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