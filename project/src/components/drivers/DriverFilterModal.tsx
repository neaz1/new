import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';
import { DriverStatus } from '../../types';

type FilterOptions = {
  status: DriverStatus | '';
  vehicleType: string;
  rating: number | '';
  city: string;
  minDeliveries: number | '';
  maxDeliveries: number | '';
};

type DriverFilterModalProps = {
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters?: FilterOptions;
};

export function DriverFilterModal({ onClose, onApply, currentFilters }: DriverFilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters || {
    status: '',
    vehicleType: '',
    rating: '',
    city: '',
    minDeliveries: '',
    maxDeliveries: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      status: '',
      vehicleType: '',
      rating: '',
      city: '',
      minDeliveries: '',
      maxDeliveries: '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">فلتەرکردنی شۆفێرەکان</h2>
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
                  onChange={(e) => setFilters({ ...filters, status: e.target.value as DriverStatus })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  <option value="سەرهێڵ">سەرهێڵ</option>
                  <option value="بەردەست">بەردەست</option>
                  <option value="نەبەردەست">نەبەردەست</option>
                </select>
              </div>

              {/* Vehicle Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  جۆری ئامێر
                </label>
                <select
                  value={filters.vehicleType}
                  onChange={(e) => setFilters({ ...filters, vehicleType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  <option value="ماتۆڕ">ماتۆڕ</option>
                  <option value="ئۆتۆمبێل">ئۆتۆمبێل</option>
                  <option value="ڤان">ڤان</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  هەڵسەنگاندن
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value ? Number(e.target.value) : '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  <option value="5">5 ئەستێرە</option>
                  <option value="4">4 ئەستێرە یان زیاتر</option>
                  <option value="3">3 ئەستێرە یان زیاتر</option>
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
                </select>
              </div>

              {/* Deliveries Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  کەمترین گەیاندن
                </label>
                <input
                  type="number"
                  value={filters.minDeliveries}
                  onChange={(e) => setFilters({ ...filters, minDeliveries: e.target.value ? Number(e.target.value) : '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="0"
                  placeholder="کەمترین"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  زۆرترین گەیاندن
                </label>
                <input
                  type="number"
                  value={filters.maxDeliveries}
                  onChange={(e) => setFilters({ ...filters, maxDeliveries: e.target.value ? Number(e.target.value) : '' })}
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