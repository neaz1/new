import React from 'react';
import { Driver } from '../../types';
import { Button } from '../ui/Button';
import { X, AlertTriangle } from 'lucide-react';

type DriverDeactivateModalProps = {
  driver: Driver;
  onClose: () => void;
  onConfirm: () => void;
};

export function DriverDeactivateModal({ driver, onClose, onConfirm }: DriverDeactivateModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center text-danger-600 dark:text-danger-400">
              <AlertTriangle size={24} className="ml-2" />
              <h2 className="text-xl font-bold">ناچالاککردنی شۆفێر</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-400">
              ئایا دڵنیایت لە ناچالاککردنی شۆفێر <span className="font-semibold text-gray-900 dark:text-white">{driver.name}</span>؟
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              ئەم کردارە دەبێتە هۆی:
            </p>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
              <li>ڕاگرتنی هەموو گەیاندنە چالاکەکان</li>
              <li>نەتوانینی وەرگرتنی گەیاندنی نوێ</li>
              <li>شاردنەوەی پڕۆفایل لە لیستی شۆفێرە چالاکەکان</li>
            </ul>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              هەڵوەشاندنەوە
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              ناچالاککردن
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}