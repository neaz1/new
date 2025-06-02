import React from 'react';
import { Driver } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { Button } from '../ui/Button';
import { X, MapPin, Phone, Mail, Star, Package, Wallet, Calendar } from 'lucide-react';

type DriverDetailsModalProps = {
  driver: Driver;
  onClose: () => void;
};

export function DriverDetailsModal({ driver, onClose }: DriverDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">وردەکاری شۆفێر</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-6">
            {/* Basic Information */}
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <img 
                  src={driver.image || "https://randomuser.me/api/portraits/men/1.jpg"} 
                  alt={driver.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{driver.name}</h3>
                
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Phone size={16} className="ml-2" />
                    {driver.phone}
                  </div>
                  
                  {driver.email && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Mail size={16} className="ml-2" />
                      {driver.email}
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin size={16} className="ml-2" />
                    {driver.vehicleType} - {driver.vehiclePlate}
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <Package size={16} className="ml-2" />
                  گەیاندنەکان
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {driver.deliveriesCompleted}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <Star size={16} className="ml-2" />
                  هەڵسەنگاندن
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {driver.rating}/5
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <Calendar size={16} className="ml-2" />
                  بەرواری دامەزراندن
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatDate(driver.createdAt)}
                </div>
              </div>
            </div>

            {/* Current Location */}
            {driver.currentLocation && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">شوێنی ئێستا</h4>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin size={16} className="ml-2" />
                    {`${driver.currentLocation.lat}, ${driver.currentLocation.lng}`}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>داخستن</Button>
          </div>
        </div>
      </div>
    </div>
  );
}