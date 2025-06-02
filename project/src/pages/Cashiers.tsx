import React, { useState } from 'react';
import { mockData } from '../utils/mockData';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Filter, Plus, MapPin, Phone } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { SellerAddModal } from '../components/sellers/SellerAddModal';
import { CashierFilterModal } from '../components/sellers/CashierFilterModal';
import { SellerDetailsModal } from '../components/sellers/SellerDetailsModal';
import { SellerEditModal } from '../components/sellers/SellerEditModal';
import { SellerDeactivateModal } from '../components/sellers/SellerDeactivateModal';
import { Store } from '../types';

type FilterOptions = {
  status: 'چالاک' | 'ناچالاک' | '';
  city: string;
  district: string;
  hasKyc: boolean | '';
  minBalance: number | '';
  maxBalance: number | '';
};

export function Cashiers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'هەموو' | 'چالاک' | 'ناچالاک' | 'چاوەڕوان'>('هەموو');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Store | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'deactivate' | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    city: '',
    district: '',
    hasKyc: '',
    minBalance: '',
    maxBalance: '',
  });
  const [sellers, setSellers] = useState(mockData.stores);
  
  const filteredSellers = sellers.filter(seller => {
    if (activeTab !== 'هەموو') {
      if (activeTab === 'چاوەڕوان' && seller.status !== 'هەڵپەسێردراو') return false;
      if (activeTab === 'چالاک' && seller.status !== 'چالاک') return false;
      if (activeTab === 'ناچالاک' && seller.status !== 'ناچالاک') return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchFields = [
        seller.name.toLowerCase(),
        seller.ownerName.toLowerCase(),
        seller.phone.toLowerCase(),
        seller.city.toLowerCase(),
        seller.district.toLowerCase(),
      ];
      
      if (!searchFields.some(field => field.includes(query))) {
        return false;
      }
    }

    if (filters.status && seller.status !== filters.status) {
      return false;
    }
    
    if (filters.city && seller.city !== filters.city) {
      return false;
    }
    
    if (filters.district && seller.district !== filters.district) {
      return false;
    }
    
    if (filters.hasKyc !== '' && seller.verifiedAt !== undefined !== filters.hasKyc) {
      return false;
    }
    
    if (filters.minBalance !== '' && seller.balance < filters.minBalance) {
      return false;
    }
    
    if (filters.maxBalance !== '' && seller.balance > filters.maxBalance) {
      return false;
    }

    return true;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddSeller = (formData: any) => {
    const newSeller: Store = {
      id: `store-${sellers.length + 1}`,
      name: formData.name,
      ownerName: formData.name,
      phone: formData.phone1,
      email: formData.email,
      address: formData.fullAddress,
      city: 'هەولێر',
      district: 'مەرکەز',
      status: 'هەڵپەسێردراو',
      balance: 0,
      createdAt: new Date(),
      deliveredOrders: 0,
      undeliveredOrders: 0,
      receivedPayments: 0,
      pendingPayments: 0,
      documents: {
        businessLicense: formData.businessLicense,
        taxRegistration: formData.taxRegistration,
        ownerIdCard: formData.ownerIdCard
      }
    };

    setSellers([newSeller, ...sellers]);
    setShowAddModal(false);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSellerAction = (action: 'view' | 'edit' | 'deactivate', seller: Store) => {
    setSelectedSeller(seller);
    setModalType(action);
  };

  const handleEditSave = (updatedSeller: Store) => {
    setSellers(sellers.map(s => s.id === updatedSeller.id ? updatedSeller : s));
    setModalType(null);
    setSelectedSeller(null);
  };

  const handleDeactivate = () => {
    if (selectedSeller) {
      setSellers(sellers.map(s => 
        s.id === selectedSeller.id 
          ? { ...s, status: 'ناچالاک' }
          : s
      ));
      setModalType(null);
      setSelectedSeller(null);
    }
  };

  const handleApproveSeller = (notes: string) => {
    if (selectedSeller) {
      setSellers(sellers.map(s => 
        s.id === selectedSeller.id 
          ? { 
              ...s, 
              status: 'چالاک',
              verifiedAt: new Date(),
              verifiedBy: 'Admin', // Replace with actual admin name
              verificationNotes: notes
            }
          : s
      ));
      setModalType(null);
      setSelectedSeller(null);
    }
  };

  const handleRejectSeller = (reason: string) => {
    if (selectedSeller) {
      setSellers(sellers.map(s => 
        s.id === selectedSeller.id 
          ? { 
              ...s, 
              status: 'ڕەتکراوە',
              verificationNotes: reason
            }
          : s
      ));
      setModalType(null);
      setSelectedSeller(null);
    }
  };

  const pendingSellers = sellers.filter(s => s.status === 'هەڵپەسێردراو').length;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">فرۆشیار</h1>
          <p className="text-gray-600 dark:text-gray-400">بەڕێوەبردنی فرۆشیارەکان و چاودێریکردنی چالاکیەکانیان</p>
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
            placeholder="گەڕان بۆ ناو، مۆبایل..."
            onSearch={handleSearch}
            className="w-full sm:w-64"
          />
          <Button 
            leftIcon={<Plus size={16} />}
            onClick={() => setShowAddModal(true)}
          >
            فرۆشیاری نوێ
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {Object.values(filters).some(value => value !== '') && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">فلتەرە چالاکەکان:</span>
              {filters.status && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  دۆخ: {filters.status}
                </span>
              )}
              {filters.city && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  شار: {filters.city}
                </span>
              )}
              {filters.district && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  ناوچە: {filters.district}
                </span>
              )}
              {filters.hasKyc !== '' && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  KYC: {filters.hasKyc ? 'تەواوکراو' : 'تەواونەکراو'}
                </span>
              )}
              {(filters.minBalance !== '' || filters.maxBalance !== '') && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  باڵانس: {filters.minBalance || 0} - {filters.maxBalance || '∞'}
                </span>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFilters({
                status: '',
                city: '',
                district: '',
                hasKyc: '',
                minBalance: '',
                maxBalance: '',
              })}
            >
              پاککردنەوەی فلتەرەکان
            </Button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex flex-wrap -mb-px">
          {(['هەموو', 'چالاک', 'ناچالاک', 'چاوەڕوان'] as const).map((tab) => (
            <button
              key={tab}
              className={`inline-block py-3 px-4 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {tab === 'چاوەڕوان' && pendingSellers > 0 && (
                <span className="ms-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-warning-800 bg-warning-100 rounded-full dark:bg-warning-900 dark:text-warning-300">
                  {pendingSellers}
                </span>
              )}
              {tab !== 'هەموو' && tab !== 'چاوەڕوان' && (
                <span className="ms-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-800 bg-primary-100 rounded-full dark:bg-primary-900 dark:text-primary-300">
                  {filteredSellers.filter(c => 
                    tab === 'چالاک' ? c.status === 'چالاک' : 
                    tab === 'ناچالاک' ? c.status === 'ناچالاک' : 0
                  ).length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSellers.map((seller) => (
          <div 
            key={seller.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{seller.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{seller.ownerName}</p>
              </div>
              <StatusBadge status={seller.status} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Phone size={14} className="ml-2" />
                {seller.phone}
              </div>

              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={14} className="ml-2" />
                {seller.city}, {seller.district}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">ئۆردەری گەیشتوو</div>
                  <div className="text-sm font-semibold text-success-600 dark:text-success-400">
                    {seller.deliveredOrders || 0}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">ئۆردەری نەگەیشتوو</div>
                  <div className="text-sm font-semibold text-danger-600 dark:text-danger-400">
                    {seller.undeliveredOrders || 0}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">پارەی گەیشتوو</div>
                  <div className="text-sm font-semibold text-success-600 dark:text-success-400">
                    {(seller.receivedPayments || 0).toLocaleString()} د.ع
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">پارەی نەگەیشتوو</div>
                  <div className="text-sm font-semibold text-danger-600 dark:text-danger-400">
                    {(seller.pendingPayments || 0).toLocaleString()} د.ع
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">باڵانس:</span>
                    <span className="mr-1">{seller.balance.toLocaleString()} د.ع</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    {formatDate(seller.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleSellerAction('view', seller)}
              >
                وردەکاری
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleSellerAction('edit', seller)}
              >
                دەستکاری
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                className="flex-1"
                onClick={() => handleSellerAction('deactivate', seller)}
              >
                ناچالاککردن
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showAddModal && (
        <SellerAddModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSeller}
        />
      )}

      {showFilterModal && (
        <CashierFilterModal
          onClose={() => setShowFilterModal(false)}
          onApply={handleApplyFilters}
          currentFilters={filters}
        />
      )}

      {selectedSeller && modalType === 'view' && (
        <SellerDetailsModal
          seller={selectedSeller}
          onClose={() => {
            setModalType(null);
            setSelectedSeller(null);
          }}
          onApprove={handleApproveSeller}
          onReject={handleRejectSeller}
        />
      )}

      {selectedSeller && modalType === 'edit' && (
        <SellerEditModal
          seller={selectedSeller}
          onClose={() => {
            setModalType(null);
            setSelectedSeller(null);
          }}
          onSave={handleEditSave}
        />
      )}

      {selectedSeller && modalType === 'deactivate' && (
        <SellerDeactivateModal
          seller={selectedSeller}
          onClose={() => {
            setModalType(null);
            setSelectedSeller(null);
          }}
          onConfirm={handleDeactivate}
        />
      )}
    </div>
  );
}