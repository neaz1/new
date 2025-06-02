import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

type FilterOptions = {
  city: string;
  orderCount: {
    min: number | '';
    max: number | '';
  };
  totalSpent: {
    min: number | '';
    max: number | '';
  };
  lastOrderDate: {
    from: string;
    to: string;
  };
};

type CustomerFilterModalProps = {
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters?: FilterOptions;
};

export function CustomerFilterModal({ onClose, onApply, currentFilters }: CustomerFilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters || {
    city: '',
    orderCount: {
      min: '',
      max: '',
    },
    totalSpent: {
      min: '',
      max: '',
    },
    lastOrderDate: {
      from: '',
      to: '',
    },
  });

  const cities = ['هەولێر', 'سلێمانی', 'دهۆک', 'کەرکوک', 'هەڵەبجە'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      city: '',
      orderCount: {
        min: '',
        max: '',
      },
      totalSpent: {
        min: '',
        max: '',
      },
      lastOrderDate: {
        from: '',
        to: '',
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">فلتەرکردنی کڕیارەکان</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

            {/* Order Count Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  کەمترین ئۆردەر
                </label>
                <input
                  type="number"
                  value={filters.orderCount.min}
                  onChange={(e) => setFilters({
                    ...filters,
                    orderCount: {
                      ...filters.orderCount,
                      min: e.target.value ? Number(e.target.value) : ''
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="0"
                  placeholder="کەمترین"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  زۆرترین ئۆردەر
                </label>
                <input
                  type="number"
                  value={filters.orderCount.max}
                  onChange={(e) => setFilters({
                    ...filters,
                    orderCount: {
                      ...filters.orderCount,
                      max: e.target.value ? Number(e.target.value) : ''
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="0"
                  placeholder="زۆرترین"
                />
              </div>
            </div>

            {/* Total Spent Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  کەمترین خەرجکراو
                </label>
                <input
                  type="number"
                  value={filters.totalSpent.min}
                  onChange={(e) => setFilters({
                    ...filters,
                    totalSpent: {
                      ...filters.totalSpent,
                      min: e.target.value ? Number(e.target.value) : ''
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="0"
                  placeholder="کەمترین"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  زۆرترین خەرجکراو
                </label>
                <input
                  type="number"
                  value={filters.totalSpent.max}
                  onChange={(e) => setFilters({
                    ...filters,
                    totalSpent: {
                      ...filters.totalSpent,
                      max: e.target.value ? Number(e.target.value) : ''
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="0"
                  placeholder="زۆرترین"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  لە بەرواری
                </label>
                <input
                  type="date"
                  value={filters.lastOrderDate.from}
                  onChange={(e) => setFilters({
                    ...filters,
                    lastOrderDate: {
                      ...filters.lastOrderDate,
                      from: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  بۆ بەرواری
                </label>
                <input
                  type="date"
                  value={filters.lastOrderDate.to}
                  onChange={(e) => setFilters({
                    ...filters,
                    lastOrderDate: {
                      ...filters.lastOrderDate,
                      to: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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