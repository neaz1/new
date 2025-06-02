import React, { useState } from 'react';
import { Delivery } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { PrintButton } from '../ui/PrintButton';
import { DeliveryDetailsModal } from '../deliveries/DeliveryDetailsModal';
import { DeliveryEditModal } from '../deliveries/DeliveryEditModal';
import { DeliveryDeleteModal } from '../deliveries/DeliveryDeleteModal';
import { useNavigate } from 'react-router-dom';

type DeliveryTableProps = {
  deliveries: Delivery[];
  limit?: number;
  onEdit?: (updatedDelivery: Delivery) => void;
  onDelete?: (delivery: Delivery) => void;
};

export function DeliveryTable({ deliveries, limit, onEdit, onDelete }: DeliveryTableProps) {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);
  const displayedDeliveries = limit ? deliveries.slice(0, limit) : deliveries;
  const navigate = useNavigate();

  const handleEdit = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setModalType('edit');
  };

  const handleDelete = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setModalType('delete');
  };

  const handleSave = (updatedDelivery: Delivery) => {
    if (onEdit) {
      onEdit(updatedDelivery);
    }
    setSelectedDelivery(null);
    setModalType(null);
  };

  const handleConfirmDelete = () => {
    if (selectedDelivery && onDelete) {
      onDelete(selectedDelivery);
    }
    setSelectedDelivery(null);
    setModalType(null);
  };

  return (
    <>
      <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">دوایین گەیاندنەکان</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ژمارەی تراکینگ
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  فرۆشگا
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  شوێنی گەیاندن
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  بڕی کۆی
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  دۆخ
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  بەروار
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  کردار
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {displayedDeliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {delivery.trackingNumber}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {delivery.storeId}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {delivery.destination}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {delivery.totalPrice} د.ع
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={delivery.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {formatDate(delivery.createdAt)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        leftIcon={<Eye size={14} />}
                        onClick={() => {
                          setSelectedDelivery(delivery);
                          setModalType('view');
                        }}
                      >
                        بینین
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        leftIcon={<Edit size={14} />}
                        onClick={() => handleEdit(delivery)}
                      >
                        دەستکاری
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        leftIcon={<Trash2 size={14} />}
                        onClick={() => handleDelete(delivery)}
                      >
                        سڕینەوە
                      </Button>
                      <PrintButton delivery={delivery} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {limit && deliveries.length > limit && (
          <div className="p-4 text-center border-t border-gray-200 dark:border-gray-700">
            <Button variant="secondary" onClick={() => navigate('/deliveries')}>
              بینینی هەموو گەیاندنەکان
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedDelivery && modalType === 'view' && (
        <DeliveryDetailsModal
          delivery={selectedDelivery}
          onClose={() => {
            setSelectedDelivery(null);
            setModalType(null);
          }}
        />
      )}

      {selectedDelivery && modalType === 'edit' && (
        <DeliveryEditModal
          delivery={selectedDelivery}
          onClose={() => {
            setSelectedDelivery(null);
            setModalType(null);
          }}
          onSave={handleSave}
        />
      )}

      {selectedDelivery && modalType === 'delete' && (
        <DeliveryDeleteModal
          delivery={selectedDelivery}
          onClose={() => {
            setSelectedDelivery(null);
            setModalType(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}