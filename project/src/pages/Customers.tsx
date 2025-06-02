import React, { useState } from 'react';
import { mockData } from '../utils/mockData';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { Filter, Phone, MapPin, Package, Calendar, Eye } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { CustomerDetailsModal } from '../components/customers/CustomerDetailsModal';
import { CustomerFilterModal } from '../components/customers/CustomerFilterModal';

type Customer = {
  id: string;
  name: string;
  phone1: string;
  phone2?: string;
  orders: Array<{
    id: string;
    trackingNumber: string;
    status: string;
    createdAt: Date;
    location: {
      city: string;
      district: string;
      neighborhood: string;
      fullAddress: string;
    };
    totalPrice: number;
  }>;
  lastOrder: {
    createdAt: Date;
    location: {
      city: string;
      district: string;
      neighborhood: string;
      fullAddress: string;
    };
  };
};

type FilterOptions = {
  city: string;
  orderCount: {
    min: number | '';
    max: number | '';
  };
  totalSpent: {
    min: number | '';
    max: number | '';
  };
  lastOrderDate: {
    from: string;
    to: string;
  };
};

export function Customers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    city: '',
    orderCount: {
      min: '',
      max: '',
    },
    totalSpent: {
      min: '',
      max: '',
    },
    lastOrderDate: {
      from: '',
      to: '',
    },
  });
  
  // Get unique customers from deliveries
  const customers = mockData.deliveries.reduce((acc, delivery) => {
    if (!acc[delivery.customerId]) {
      acc[delivery.customerId] = {
        id: delivery.customerId,
        name: delivery.recipientName,
        phone1: delivery.phone1,
        phone2: delivery.phone2,
        orders: [],
        lastOrder: null
      };
    }
    
    acc[delivery.customerId].orders.push({
      id: delivery.id,
      trackingNumber: delivery.trackingNumber,
      status: delivery.status,
      createdAt: delivery.createdAt,
      location: {
        city: delivery.city,
        district: delivery.district,
        neighborhood: delivery.neighborhood,
        fullAddress: delivery.fullAddress
      },
      totalPrice: delivery.totalPrice
    });
    
    // Update last order if this is more recent
    if (!acc[delivery.customerId].lastOrder || 
        delivery.createdAt > acc[delivery.customerId].lastOrder.createdAt) {
      acc[delivery.customerId].lastOrder = {
        createdAt: delivery.createdAt,
        location: {
          city: delivery.city,
          district: delivery.district,
          neighborhood: delivery.neighborhood,
          fullAddress: delivery.fullAddress
        }
      };
    }
    
    return acc;
  }, {} as Record<string, Customer>);

  // Convert to array and sort by most recent order
  const customersList = Object.values(customers).sort((a, b) => 
    b.lastOrder.createdAt.getTime() - a.lastOrder.createdAt.getTime()
  );

  // Filter customers based on search and filters
  const filteredCustomers = customersList.filter((customer) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchFields = [
        customer.name.toLowerCase(),
        customer.phone1.toLowerCase(),
        customer.phone2?.toLowerCase() || '',
        customer.lastOrder.location.city.toLowerCase(),
        customer.lastOrder.location.district.toLowerCase(),
        customer.lastOrder.location.neighborhood.toLowerCase(),
        customer.lastOrder.location.fullAddress.toLowerCase(),
      ];
      
      if (!searchFields.some(field => field.includes(query))) {
        return false;
      }
    }

    // City filter
    if (filters.city && customer.lastOrder.location.city !== filters.city) {
      return false;
    }

    // Order count filter
    const orderCount = customer.orders.length;
    if (filters.orderCount.min !== '' && orderCount < filters.orderCount.min) {
      return false;
    }
    if (filters.orderCount.max !== '' && orderCount > filters.orderCount.max) {
      return false;
    }

    // Total spent filter
    const totalSpent = customer.orders.reduce((sum, order) => sum + order.totalPrice, 0);
    if (filters.totalSpent.min !== '' && totalSpent < filters.totalSpent.min) {
      return false;
    }
    if (filters.totalSpent.max !== '' && totalSpent > filters.totalSpent.max) {
      return false;
    }

    // Date range filter
    if (filters.lastOrderDate.from) {
      const fromDate = new Date(filters.lastOrderDate.from);
      if (customer.lastOrder.createdAt < fromDate) {
        return false;
      }
    }
    if (filters.lastOrderDate.to) {
      const toDate = new Date(filters.lastOrderDate.to);
      if (customer.lastOrder.createdAt > toDate) {
        return false;
      }
    }

    return true;
  });

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">کڕیارەکان</h1>
          <p className="text-gray-600 dark:text-gray-400">بینینی زانیاری کڕیارەکان و مێژووی کڕینەکانیان</p>
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
            placeholder="گەڕان بۆ ناو، مۆبایل، ناونیشان..."
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
              {filters.city && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  شار: {filters.city}
                </span>
              )}
              {(filters.orderCount.min !== '' || filters.orderCount.max !== '') && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  ئۆردەر: {filters.orderCount.min || 0} - {filters.orderCount.max || '∞'}
                </span>
              )}
              {(filters.totalSpent.min !== '' || filters.totalSpent.max !== '') && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  خەرجکراو: {filters.totalSpent.min || 0} - {filters.totalSpent.max || '∞'} د.ع
                </span>
              )}
              {(filters.lastOrderDate.from || filters.lastOrderDate.to) && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  بەروار: {filters.lastOrderDate.from || '*'} - {filters.lastOrderDate.to || '*'}
                </span>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFilters({
                city: '',
                orderCount: { min: '', max: '' },
                totalSpent: { min: '', max: '' },
                lastOrderDate: { from: '', to: '' },
              })}
            >
              پاککردنەوەی فلتەرەکان
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <div 
            key={customer.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{customer.name}</h3>
              
              <div className="mt-2 space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone size={14} className="ml-2" />
                  {customer.phone1}
                </div>
                
                {customer.phone2 && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Phone size={14} className="ml-2" />
                    {customer.phone2}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t dark:border-gray-700 pt-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                دوا ناونیشانی وەرگرتن
              </div>
              
              <div className="space-y-1">
                <div className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={14} className="ml-2 mt-1 shrink-0" />
                  <div>
                    <div>{customer.lastOrder.location.city} - {customer.lastOrder.location.district}</div>
                    <div>{customer.lastOrder.location.neighborhood}</div>
                    <div className="text-xs mt-1">{customer.lastOrder.location.fullAddress}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t dark:border-gray-700 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Package size={14} className="ml-2" />
                  {customer.orders.length} ئۆردەر
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                  <Calendar size={14} className="ml-2" />
                  {formatDate(customer.lastOrder.createdAt)}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-full mt-3"
                leftIcon={<Eye size={14} />}
                onClick={() => setSelectedCustomer(customer)}
              >
                بینینی وردەکاری
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      {showFilterModal && (
        <CustomerFilterModal
          onClose={() => setShowFilterModal(false)}
          onApply={handleApplyFilters}
          currentFilters={filters}
        />
      )}
    </div>
  );
}