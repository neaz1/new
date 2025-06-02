import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { Filter, Download, Eye, Calendar, Wallet, X } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

type Receipt = {
  id: string;
  trackingNumber: string;
  date: Date;
  amount: number;
  type: 'فرۆشتن' | 'گەڕاوە' | 'گۆڕین';
  status: 'پارەدراو' | 'چاوەڕوان';
  storeName: string;
  storePhone: string;
};

// Mock data for receipts
const mockReceipts: Receipt[] = Array.from({ length: 20 }, (_, i) => ({
  id: `rec-${i + 1}`,
  trackingNumber: `TK${1000 + i}`,
  date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  amount: Math.floor(Math.random() * 500000) + 10000,
  type: ['فرۆشتن', 'گەڕاوە', 'گۆڕین'][Math.floor(Math.random() * 3)] as any,
  status: Math.random() > 0.3 ? 'پارەدراو' : 'چاوەڕوان',
  storeName: `فرۆشگای ${i + 1}`,
  storePhone: `075${Math.floor(1000000 + Math.random() * 9000000)}`,
}));

export function Receipts() {
  const [receipts] = useState<Receipt[]>(mockReceipts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [filters, setFilters] = useState({
    dateRange: {
      from: '',
      to: '',
    },
    type: '',
    status: '',
    minAmount: '',
    maxAmount: '',
  });

  // Filter receipts based on search and filters
  const filteredReceipts = receipts.filter(receipt => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchFields = [
        receipt.trackingNumber.toLowerCase(),
        receipt.storeName.toLowerCase(),
        receipt.storePhone.toLowerCase(),
      ];
      
      if (!searchFields.some(field => field.includes(query))) {
        return false;
      }
    }

    // Date range filter
    if (filters.dateRange.from) {
      const fromDate = new Date(filters.dateRange.from);
      if (receipt.date < fromDate) {
        return false;
      }
    }
    if (filters.dateRange.to) {
      const toDate = new Date(filters.dateRange.to);
      if (receipt.date > toDate) {
        return false;
      }
    }

    // Type filter
    if (filters.type && receipt.type !== filters.type) {
      return false;
    }

    // Status filter
    if (filters.status && receipt.status !== filters.status) {
      return false;
    }

    // Amount range filter
    if (filters.minAmount && receipt.amount < Number(filters.minAmount)) {
      return false;
    }
    if (filters.maxAmount && receipt.amount > Number(filters.maxAmount)) {
      return false;
    }

    return true;
  });

  const handleDownload = (receipt: Receipt) => {
    // Create receipt content
    const content = `
وەسڵی گەیاندن

ژمارەی تراکینگ: ${receipt.trackingNumber}
بەروار: ${formatDate(receipt.date)}
فرۆشگا: ${receipt.storeName}
ژمارەی مۆبایل: ${receipt.storePhone}
جۆری گەیاندن: ${receipt.type}
بڕی پارە: ${receipt.amount} د.ع
دۆخ: ${receipt.status}
    `;

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receipt.trackingNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">وەسڵەکان</h1>
          <p className="text-gray-600 dark:text-gray-400">بینین و داگرتنی وەسڵەکانی گەیاندن</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            leftIcon={<Filter size={16} />}
            onClick={() => setShowFilterModal(true)}
          >
            فلتەرکردن
          </Button>
          <SearchInput 
            placeholder="گەڕان بۆ تراکینگ، فرۆشگا..."
            onSearch={(query) => setSearchQuery(query)}
            className="w-full sm:w-64"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {Object.values(filters).some(value => 
        typeof value === 'string' ? value !== '' : 
        Object.values(value).some(v => v !== '')
      ) && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">فلتەرە چالاکەکان:</span>
              {(filters.dateRange.from || filters.dateRange.to) && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  بەروار: {filters.dateRange.from || '*'} - {filters.dateRange.to || '*'}
                </span>
              )}
              {filters.type && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  جۆر: {filters.type}
                </span>
              )}
              {filters.status && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  دۆخ: {filters.status}
                </span>
              )}
              {(filters.minAmount || filters.maxAmount) && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  بڕ: {filters.minAmount || '0'} - {filters.maxAmount || '∞'}
                </span>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFilters({
                dateRange: { from: '', to: '' },
                type: '',
                status: '',
                minAmount: '',
                maxAmount: '',
              })}
            >
              پاککردنەوەی فلتەرەکان
            </Button>
          </div>
        </div>
      )}

      {/* Receipts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReceipts.map((receipt) => (
          <div 
            key={receipt.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {receipt.trackingNumber}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{receipt.storeName}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                receipt.status === 'پارەدراو'
                  ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300'
                  : 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300'
              }`}>
                {receipt.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar size={14} className="ml-2" />
                {formatDate(receipt.date)}
              </div>

              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Wallet size={14} className="ml-2" />
                {receipt.amount.toLocaleString()} د.ع
              </div>

              <div className="mt-4 pt-4 border-t dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    receipt.type === 'فرۆشتن'
                      ? 'bg-success-100 text-success-800'
                      : receipt.type === 'گەڕاوە'
                      ? 'bg-danger-100 text-danger-800'
                      : 'bg-warning-100 text-warning-800'
                  }`}>
                    {receipt.type}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Eye size={14} />}
                      onClick={() => setSelectedReceipt(receipt)}
                    >
                      بینین
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Download size={14} />}
                      onClick={() => handleDownload(receipt)}
                    >
                      داگرتن
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                فلتەرکردنی وەسڵەکان
              </h2>

              <form className="space-y-4">
                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      لە بەرواری
                    </label>
                    <input
                      type="date"
                      value={filters.dateRange.from}
                      onChange={(e) => setFilters({
                        ...filters,
                        dateRange: { ...filters.dateRange, from: e.target.value }
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
                        dateRange: { ...filters.dateRange, to: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    جۆری گەیاندن
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">هەموو</option>
                    <option value="فرۆشتن">فرۆشتن</option>
                    <option value="گەڕاوە">گەڕاوە</option>
                    <option value="گۆڕین">گۆڕین</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    دۆخ
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">هەموو</option>
                    <option value="پارەدراو">پارەدراو</option>
                    <option value="چاوەڕوان">چاوەڕوان</option>
                  </select>
                </div>

                {/* Amount Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      کەمترین بڕ
                    </label>
                    <input
                      type="number"
                      value={filters.minAmount}
                      onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="کەمترین"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      زۆرترین بڕ
                    </label>
                    <input
                      type="number"
                      value={filters.maxAmount}
                      onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="زۆرترین"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilterModal(false)}
                  >
                    هەڵوەشاندنەوە
                  </Button>
                  <Button
                    onClick={() => setShowFilterModal(false)}
                  >
                    جێبەجێکردن
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  وەسڵی گەیاندن
                </h2>
                <button 
                  onClick={() => setSelectedReceipt(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">ژمارەی تراکینگ</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedReceipt.trackingNumber}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">فرۆشگا</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedReceipt.storeName}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">ژمارەی مۆبایل</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedReceipt.storePhone}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">بەروار</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {formatDate(selectedReceipt.date)}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">بڕی پارە</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedReceipt.amount.toLocaleString()} د.ع
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">جۆری گەیاندن</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedReceipt.type}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">دۆخ</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedReceipt.status}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedReceipt(null)}
                >
                  داخستن
                </Button>
                <Button
                  leftIcon={<Download size={16} />}
                  onClick={() => handleDownload(selectedReceipt)}
                >
                  داگرتن
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}