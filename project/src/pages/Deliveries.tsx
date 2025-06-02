import React, { useState } from 'react';
import { DeliveryTable } from '../components/dashboard/DeliveryTable';
import { mockData } from '../utils/mockData';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { Plus, Filter } from 'lucide-react';
import { DeliveryStatus, Delivery } from '../types';
import { DeliveryFilterModal } from '../components/deliveries/DeliveryFilterModal';
import { DeliveryAddModal } from '../components/deliveries/DeliveryAddModal';

type FilterOptions = {
  status: DeliveryStatus | '';
  city: string;
  minPrice: number | '';
  maxPrice: number | '';
  dateFrom: string;
  dateTo: string;
  storeId: string;
  driverId: string;
};

export function Deliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockData.deliveries);
  const [activeTab, setActiveTab] = useState<DeliveryStatus | 'هەموو'>('هەموو');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    dateFrom: '',
    dateTo: '',
    storeId: '',
    driverId: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  const tabs: (DeliveryStatus | 'هەموو')[] = ['هەموو', 'تەواوبوو', 'بەردەوامە', 'چاوەڕوانە', 'کێشەی هەیە', 'نەگیشتوە'];
  
  // Filter deliveries based on all criteria
  const filteredDeliveries = deliveries.filter(delivery => {
    // Tab filter
    if (activeTab !== 'هەموو' && delivery.status !== activeTab) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchFields = [
        delivery.trackingNumber.toLowerCase(),
        delivery.origin.toLowerCase(),
        delivery.destination.toLowerCase(),
      ];
      if (!searchFields.some(field => field.includes(query))) {
        return false;
      }
    }

    // Applied filters
    if (filters.status && delivery.status !== filters.status) {
      return false;
    }

    if (filters.city) {
      const deliveryCity = delivery.destination.split(',')[0].trim();
      if (deliveryCity !== filters.city) {
        return false;
      }
    }

    if (filters.minPrice && delivery.totalPrice < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice && delivery.totalPrice > filters.maxPrice) {
      return false;
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      if (delivery.createdAt < fromDate) {
        return false;
      }
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      if (delivery.createdAt > toDate) {
        return false;
      }
    }

    if (filters.storeId && delivery.storeId !== filters.storeId) {
      return false;
    }

    if (filters.driverId && delivery.driverId !== filters.driverId) {
      return false;
    }

    return true;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleAddDelivery = (deliveryData: any) => {
    // Create a new delivery object
    const newDelivery: Delivery = {
      id: `del-${deliveries.length + 1}`,
      trackingNumber: `TK${1000 + deliveries.length + 1}`,
      status: 'چاوەڕوانە',
      createdAt: new Date(),
      items: [],
      deliveryFee: 0,
      origin: '',
      destination: '',
      ...deliveryData
    };

    // Add the new delivery to the list
    setDeliveries([newDelivery, ...deliveries]);
    setShowAddModal(false);
  };

  const handleEditDelivery = (updatedDelivery: Delivery) => {
    setDeliveries(deliveries.map(d => 
      d.id === updatedDelivery.id ? updatedDelivery : d
    ));
  };

  const handleDeleteDelivery = (delivery: Delivery) => {
    setDeliveries(deliveries.filter(d => d.id !== delivery.id));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">گەیاندنەکان</h1>
          <p className="text-gray-600 dark:text-gray-400">بەڕێوەبردنی هەموو گەیاندنەکان</p>
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
            placeholder="گەڕان بۆ تراکینگ، مۆبایل..."
            onSearch={handleSearch}
            className="w-full sm:w-64"
          />
          <Button 
            leftIcon={<Plus size={16} />}
            onClick={() => setShowAddModal(true)}
          >
            گەیاندنی نوێ
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
              {(filters.minPrice || filters.maxPrice) && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  نرخ: {filters.minPrice || 0} - {filters.maxPrice || '∞'}
                </span>
              )}
              {(filters.dateFrom || filters.dateTo) && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  بەروار: {filters.dateFrom || '*'} - {filters.dateTo || '*'}
                </span>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFilters({
                status: '',
                city: '',
                minPrice: '',
                maxPrice: '',
                dateFrom: '',
                dateTo: '',
                storeId: '',
                driverId: '',
              })}
            >
              پاککردنەوەی فلتەرەکان
            </Button>
          </div>
        </div>
      )}
      
      {/* Tabs for filtering deliveries */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
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
              {tab !== 'هەموو' && (
                <span className="ms-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-800 bg-primary-100 rounded-full dark:bg-primary-900 dark:text-primary-300">
                  {filteredDeliveries.filter(d => d.status === tab).length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Deliveries table */}
      <DeliveryTable 
        deliveries={filteredDeliveries} 
        onEdit={handleEditDelivery}
        onDelete={handleDeleteDelivery}
      />

      {/* Filter Modal */}
      {showFilterModal && (
        <DeliveryFilterModal
          onClose={() => setShowFilterModal(false)}
          onApply={handleApplyFilters}
          currentFilters={filters}
        />
      )}

      {/* Add Delivery Modal */}
      {showAddModal && (
        <DeliveryAddModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddDelivery}
        />
      )}
    </div>
  );
}