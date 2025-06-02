import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

type FilterOptions = {
  status: 'کراوەیە' | 'چارەسەرکراو' | 'داخراو' | '';
  priority: 'نزم' | 'ناوەند' | 'بەرز' | 'فریاکەوتن' | '';
  type: 'گەیاندن' | 'شۆفێر' | 'فرۆشگا' | 'سیستەم' | '';
  city: string;
  office: string;
  assignedTo: string;
  dateRange: {
    from: string;
    to: string;
  };
};

type IssueFilterModalProps = {
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters?: FilterOptions;
};

export function IssueFilterModal({ onClose, onApply, currentFilters }: IssueFilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters || {
    status: '',
    priority: '',
    type: '',
    city: '',
    office: '',
    assignedTo: '',
    dateRange: {
      from: '',
      to: '',
    },
  });

  const cities = ['هەولێر', 'سلێمانی', 'دهۆک', 'کەرکوک', 'هەڵەبجە'];
  const offices = ['ئۆفیسی سەرەکی', 'ئۆفیسی ١', 'ئۆفیسی ٢', 'ئۆفیسی ٣'];
  const staff = ['کارمەند ١', 'کارمەند ٢', 'کارمەند ٣', 'کارمەند ٤'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      status: '',
      priority: '',
      type: '',
      city: '',
      office: '',
      assignedTo: '',
      dateRange: {
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">فلتەرکردنی کێشەکان</h2>
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
                  <option value="کراوەیە">کراوەیە</option>
                  <option value="چارەسەرکراو">چارەسەرکراو</option>
                  <option value="داخراو">داخراو</option>
                </select>
              </div>

              {/* Priority Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  گرنگی
                </label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  <option value="نزم">نزم</option>
                  <option value="ناوەند">ناوەند</option>
                  <option value="بەرز">بەرز</option>
                  <option value="فریاکەوتن">فریاکەوتن</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  جۆر
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  <option value="گەیاندن">گەیاندن</option>
                  <option value="شۆفێر">شۆفێر</option>
                  <option value="فرۆشگا">فرۆشگا</option>
                  <option value="سیستەم">سیستەم</option>
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

              {/* Office Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ئۆفیس
                </label>
                <select
                  value={filters.office}
                  onChange={(e) => setFilters({ ...filters, office: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  {offices.map(office => (
                    <option key={office} value={office}>{office}</option>
                  ))}
                </select>
              </div>

              {/* Assigned To Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  دیاریکراو بۆ
                </label>
                <select
                  value={filters.assignedTo}
                  onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">هەموو</option>
                  {staff.map(person => (
                    <option key={person} value={person}>{person}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  لە بەرواری
                </label>
                <input
                  type="date"
                  value={filters.dateRange.from}
                  onChange={(e) => setFilters({
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
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
                  value={filters.dateRange.to}
                  onChange={(e) => setFilters({
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
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