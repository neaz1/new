import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';
import { Issue } from '../../types';

type IssueAddModalProps = {
  onClose: () => void;
  onAdd: (issueData: Partial<Issue>) => void;
};

export function IssueAddModal({ onClose, onAdd }: IssueAddModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    relatedType: 'گەیاندن' as const,
    relatedId: '',
    priority: 'ناوەند' as const,
    city: '',
    district: '',
    office: '',
  });

  const cities = ['هەولێر', 'سلێمانی', 'دهۆک', 'کەرکوک', 'هەڵەبجە'];
  const districts = ['شارەوانی', 'ئازادی', 'گەڕەک ١', 'گەڕەک ٢', 'ناوەندی شار'];
  const offices = ['ئۆفیسی سەرەکی', 'ئۆفیسی ١', 'ئۆفیسی ٢', 'ئۆفیسی ٣'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      reportedBy: 'user-1', // In a real app, this would be the current user's ID
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">زیادکردنی کێشەی نوێ</h2>
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
                ناونیشان
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                وەسف
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  جۆری کێشە
                </label>
                <select
                  value={formData.relatedType}
                  onChange={(e) => setFormData({ ...formData, relatedType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="گەیاندن">گەیاندن</option>
                  <option value="شۆفێر">شۆفێر</option>
                  <option value="فرۆشگا">فرۆشگا</option>
                  <option value="سیستەم">سیستەم</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  کۆدی پەیوەندیدار
                </label>
                <input
                  type="text"
                  value={formData.relatedId}
                  onChange={(e) => setFormData({ ...formData, relatedId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="کۆدی گەیاندن/شۆفێر/فرۆشگا"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                گرنگی
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="نزم">نزم</option>
                <option value="ناوەند">ناوەند</option>
                <option value="بەرز">بەرز</option>
                <option value="فریاکەوتن">فریاکەوتن</option>
              </select>
            </div>

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
                  ئۆفیس
                </label>
                <select
                  value={formData.office}
                  onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">هەڵبژاردنی ئۆفیس</option>
                  {offices.map(office => (
                    <option key={office} value={office}>{office}</option>
                  ))}
                </select>
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