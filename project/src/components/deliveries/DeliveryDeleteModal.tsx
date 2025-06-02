import React from 'react';
import { Button } from '../ui/Button';
import { X, AlertTriangle } from 'lucide-react';
import { Delivery } from '../../types';

type DeliveryDeleteModalProps = {
  delivery: Delivery;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeliveryDeleteModal({ delivery, onClose, onConfirm }: DeliveryDeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center text-danger-600 dark:text-danger-400">
              <AlertTriangle size={24} className="ml-2" />
              <h2 className="text-xl font-bold">سڕینەوەی گەیاندن</h2>
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
              ئایا دڵنیایت لە سڕینەوەی گەیاندن بە ژمارەی تراکینگ <span className="font-semibold text-gray-900 dark:text-white">{delivery.trackingNumber}</span>؟
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              ئەم کردارە ناگەڕێتەوە!
            </p>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
              <li>هەموو زانیاریەکانی گەیاندنەکە دەسڕدرێتەوە</li>
              <li>ناتوانرێت بگەڕێنرێتەوە</li>
              <li>مێژووی گەیاندنەکە نامێنێت</li>
            </ul>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              هەڵوەشاندنەوە
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              سڕینەوە
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}