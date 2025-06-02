import React, { useState } from 'react';
import { StatisticsCards } from '../components/dashboard/StatisticsCards';
import { DeliveryTable } from '../components/dashboard/DeliveryTable';
import { mockData, getDashboardCounts } from '../utils/mockData';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { Plus } from 'lucide-react';
import { DeliveryAddModal } from '../components/deliveries/DeliveryAddModal';
import { Delivery } from '../types';

export function Dashboard() {
  const { deliveryCounts, driverCounts, storesCounts, issuesCounts } = getDashboardCounts();
  const [deliveries, setDeliveries] = useState(mockData.deliveries);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter deliveries based on search query
  const filteredDeliveries = deliveries.filter(delivery => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    const searchFields = [
      delivery.trackingNumber.toLowerCase(),
      delivery.recipientName.toLowerCase(),
      delivery.phone1.toLowerCase(),
      delivery.phone2?.toLowerCase() || '',
      delivery.city.toLowerCase(),
      delivery.district.toLowerCase(),
      delivery.neighborhood.toLowerCase(),
      delivery.fullAddress.toLowerCase(),
    ];
    
    return searchFields.some(field => field.includes(searchLower));
  });

  const recentDeliveries = [...filteredDeliveries].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">داشبۆرد</h1>
          <p className="text-gray-600 dark:text-gray-400">بینینی ئاماری گەیاندنەکان و چالاکیەکانی سیستەم</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
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
      
      {/* Statistics cards */}
      <StatisticsCards 
        deliveryCounts={deliveryCounts}
        driverCounts={driverCounts}
        storesCounts={storesCounts}
        issuesCounts={issuesCounts}
      />
      
      {/* Recent deliveries */}
      <div className="mt-8">
        <DeliveryTable deliveries={recentDeliveries} limit={5} />
      </div>

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