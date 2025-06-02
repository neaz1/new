import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Building2, Users, Phone, Mail, MapPin, Plus, Edit, Trash2, Wallet, Package, CheckCircle, AlertCircle } from 'lucide-react';

type Office = {
  id: string;
  name: string;
  manager: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  employeesCount: number;
  status: 'چالاک' | 'ناچالاک';
  // Add new financial fields
  receivedPayments: number;
  pendingPayments: number;
  completedOrders: number;
  pendingOrders: number;
};

const mockOffices: Office[] = [
  {
    id: '1',
    name: 'ئۆفیسی سەرەکی',
    manager: 'ئەحمەد محمد',
    phone: '٠٧٥٠ ١٢٣ ٤٥٦٧',
    email: 'main@delivery.com',
    address: 'شەقامی ١٠٠ مەتری',
    city: 'هەولێر',
    employeesCount: 25,
    status: 'چالاک',
    receivedPayments: 15000000,
    pendingPayments: 3500000,
    completedOrders: 450,
    pendingOrders: 85
  },
  {
    id: '2',
    name: 'ئۆفیسی سلێمانی',
    manager: 'کارزان عەلی',
    phone: '٠٧٥٠ ٢٣٤ ٥٦٧٨',
    email: 'suli@delivery.com',
    address: 'سالم ستریت',
    city: 'سلێمانی',
    employeesCount: 18,
    status: 'چالاک',
    receivedPayments: 12500000,
    pendingPayments: 2800000,
    completedOrders: 380,
    pendingOrders: 65
  },
  {
    id: '3',
    name: 'ئۆفیسی دهۆک',
    manager: 'هێمن عومەر',
    phone: '٠٧٥٠ ٣٤٥ ٦٧٨٩',
    email: 'duhok@delivery.com',
    address: 'شەقامی نەورۆز',
    city: 'دهۆک',
    employeesCount: 15,
    status: 'چالاک',
    receivedPayments: 9800000,
    pendingPayments: 1900000,
    completedOrders: 290,
    pendingOrders: 45
  }
];

export function Office() {
  const [offices, setOffices] = useState<Office[]>(mockOffices);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete' | null>(null);

  const handleAddOffice = (office: Office) => {
    setOffices([...offices, office]);
    setShowAddModal(false);
  };

  const handleEditOffice = (updatedOffice: Office) => {
    setOffices(offices.map(o => o.id === updatedOffice.id ? updatedOffice : o));
    setSelectedOffice(null);
    setModalType(null);
  };

  const handleDeleteOffice = (office: Office) => {
    setOffices(offices.filter(o => o.id !== office.id));
    setSelectedOffice(null);
    setModalType(null);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ئۆفیسەکان</h1>
          <p className="text-gray-600 dark:text-gray-400">بەڕێوەبردنی ئۆفیسەکان و کارمەندان</p>
        </div>
        
        <Button 
          leftIcon={<Plus size={16} />}
          onClick={() => setShowAddModal(true)}
        >
          ئۆفیسی نوێ
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offices.map((office) => (
          <div 
            key={office.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <Building2 className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{office.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{office.city}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                office.status === 'چالاک' 
                  ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {office.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Users size={16} className="mr-2" />
                <span>{office.manager}</span>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Phone size={16} className="mr-2" />
                <span>{office.phone}</span>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail size={16} className="mr-2" />
                <span>{office.email}</span>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin size={16} className="mr-2" />
                <span>{office.address}</span>
              </div>

              {/* Financial Information */}
              <div className="pt-4 mt-4 border-t dark:border-gray-700 space-y-4">
                {/* Payments */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center text-success-600 dark:text-success-400 mb-2">
                      <Wallet size={16} className="mr-2" />
                      <span className="text-sm">پارەی وەرگیراو</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {office.receivedPayments.toLocaleString()} د.ع
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center text-warning-600 dark:text-warning-400 mb-2">
                      <AlertCircle size={16} className="mr-2" />
                      <span className="text-sm">پارەی وەرنەگیراو</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {office.pendingPayments.toLocaleString()} د.ع
                    </div>
                  </div>
                </div>

                {/* Orders */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center text-success-600 dark:text-success-400 mb-2">
                      <CheckCircle size={16} className="mr-2" />
                      <span className="text-sm">ئۆردەری تەواو</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {office.completedOrders}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center text-warning-600 dark:text-warning-400 mb-2">
                      <Package size={16} className="mr-2" />
                      <span className="text-sm">ئۆردەری ماوە</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {office.pendingOrders}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>ژمارەی کارمەندان</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {office.employeesCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1"
                leftIcon={<Edit size={14} />}
                onClick={() => {
                  setSelectedOffice(office);
                  setModalType('edit');
                }}
              >
                دەستکاری
              </Button>
              <Button 
                variant="danger" 
                size="sm"
                className="flex-1"
                leftIcon={<Trash2 size={14} />}
                onClick={() => {
                  setSelectedOffice(office);
                  setModalType('delete');
                }}
              >
                سڕینەوە
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || (selectedOffice && modalType === 'edit')) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedOffice ? 'دەستکاری ئۆفیس' : 'زیادکردنی ئۆفیسی نوێ'}
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ناوی ئۆفیس
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    بەڕێوەبەر
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ژمارەی مۆبایل
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ئیمەیڵ
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    شار
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">هەڵبژاردنی شار</option>
                    <option value="هەولێر">هەولێر</option>
                    <option value="سلێمانی">سلێمانی</option>
                    <option value="دهۆک">دهۆک</option>
                    <option value="کەرکوک">کەرکوک</option>
                    <option value="هەڵەبجە">هەڵەبجە</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ناونیشان
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedOffice(null);
                      setModalType(null);
                    }}
                  >
                    هەڵوەشاندنەوە
                  </Button>
                  <Button type="submit">
                    {selectedOffice ? 'پاشەکەوتکردن' : 'زیادکردن'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {selectedOffice && modalType === 'delete' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              دڵنیای لە سڕینەوەی ئەم ئۆفیسە؟
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ئەم کردارە ناگەڕێتەوە و هەموو داتاکانی ئەم ئۆفیسە دەسڕێتەوە.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedOffice(null);
                  setModalType(null);
                }}
              >
                هەڵوەشاندنەوە
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteOffice(selectedOffice)}
              >
                سڕینەوە
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}