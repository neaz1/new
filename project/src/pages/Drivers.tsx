import React, { useState } from 'react';
import { mockData } from '../utils/mockData';
import { Driver, DriverStatus } from '../types';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Filter, Plus, MapPin, Star, Package, Phone, Wallet, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { DriverDetailsModal } from '../components/drivers/DriverDetailsModal';
import { DriverEditModal } from '../components/drivers/DriverEditModal';
import { DriverDeactivateModal } from '../components/drivers/DriverDeactivateModal';
import { DriverFilterModal } from '../components/drivers/DriverFilterModal';
import { DriverAddModal } from '../components/drivers/DriverAddModal';

type FilterOptions = {
  status: DriverStatus | '';
  vehicleType: string;
  rating: number | '';
  city: string;
  minDeliveries: number | '';
  maxDeliveries: number | '';
};

export function Drivers() {
  const [activeTab, setActiveTab] = useState<DriverStatus | 'هەموو'>('هەموو');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [modalType, setModalType] = useState<'details' | 'edit' | 'deactivate' | 'filter' | 'add' | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    vehicleType: '',
    rating: '',
    city: '',
    minDeliveries: '',
    maxDeliveries: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [drivers, setDrivers] = useState(mockData.drivers);
  
  const tabs: (DriverStatus | 'هەموو')[] = ['هەموو', 'سەرهێڵ', 'بەردەست', 'نەبەردەست'];
  
  // Filter drivers based on all criteria
  const filteredDrivers = drivers.filter(driver => {
    // Tab filter
    if (activeTab !== 'هەموو' && driver.status !== activeTab) {
      return false;
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const searchFields = [
        driver.name.toLowerCase(),
        driver.phone.toLowerCase(),
        driver.vehiclePlate.toLowerCase(),
        driver.vehicleType.toLowerCase(),
        driver.email?.toLowerCase() || ''
      ];
      
      if (!searchFields.some(field => field.includes(query))) {
        return false;
      }
    }

    // Applied filters
    if (filters.status && driver.status !== filters.status) {
      return false;
    }
    
    if (filters.vehicleType && driver.vehicleType !== filters.vehicleType) {
      return false;
    }
    
    if (filters.rating && driver.rating < filters.rating) {
      return false;
    }
    
    if (filters.city) {
      const driverCity = driver.vehiclePlate.split(' ')[0];
      if (driverCity !== filters.city) {
        return false;
      }
    }
    
    if (filters.minDeliveries && driver.deliveriesCompleted < filters.minDeliveries) {
      return false;
    }
    
    if (filters.maxDeliveries && driver.deliveriesCompleted > filters.maxDeliveries) {
      return false;
    }

    return true;
  });

  // Calculate detailed stats for each driver
  const getDriverStats = (driverId: string) => {
    const driverDeliveries = mockData.deliveries.filter(d => d.driverId === driverId);
    
    // Completed deliveries
    const completedDeliveries = driverDeliveries.filter(d => d.status === 'تەواوبوو');
    const totalEarnings = completedDeliveries.reduce((sum, del) => sum + del.deliveryFee, 0);
    
    // Pending deliveries
    const pendingDeliveries = driverDeliveries.filter(d => 
      d.status === 'بەردەوامە' || d.status === 'چاوەڕوانە'
    );
    const pendingEarnings = pendingDeliveries.reduce((sum, del) => sum + del.deliveryFee, 0);
    
    // Today's deliveries
    const today = new Date();
    const todayDeliveries = driverDeliveries.filter(d => {
      const deliveryDate = new Date(d.createdAt);
      return deliveryDate.toDateString() === today.toDateString();
    });
    
    return {
      totalDeliveries: driverDeliveries.length,
      completedDeliveries: completedDeliveries.length,
      pendingDeliveries: pendingDeliveries.length,
      todayDeliveries: todayDeliveries.length,
      totalEarnings,
      pendingEarnings,
      successRate: completedDeliveries.length > 0 
        ? ((completedDeliveries.length / driverDeliveries.length) * 100).toFixed(1)
        : 0
    };
  };

  const handleDriverAction = (action: 'view' | 'edit' | 'deactivate', driver: Driver) => {
    setSelectedDriver(driver);
    setModalType(action === 'view' ? 'details' : action === 'edit' ? 'edit' : 'deactivate');
  };

  const handleEditSave = (updatedDriver: Driver) => {
    setDrivers(drivers.map(d => d.id === updatedDriver.id ? updatedDriver : d));
    setModalType(null);
    setSelectedDriver(null);
  };

  const handleDeactivate = () => {
    if (selectedDriver) {
      setDrivers(drivers.map(d => 
        d.id === selectedDriver.id 
          ? { ...d, status: 'نەبەردەست' as DriverStatus }
          : d
      ));
      setModalType(null);
      setSelectedDriver(null);
    }
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddDriver = (newDriver: Omit<Driver, 'id' | 'createdAt' | 'deliveriesCompleted' | 'rating'>) => {
    const driver: Driver = {
      ...newDriver,
      id: `driver-${drivers.length + 1}`,
      createdAt: new Date(),
      deliveriesCompleted: 0,
      rating: 5,
      lastActive: new Date(),
    };
    setDrivers([driver, ...drivers]);
    setModalType(null);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">شۆفێرەکان</h1>
          <p className="text-gray-600 dark:text-gray-400">بەڕێوەبردنی شۆفێرەکان و چاودێریکردنی چالاکیەکانیان</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            leftIcon={<Filter size={16} />}
            onClick={() => setModalType('filter')}
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
            onClick={() => setModalType('add')}
          >
            شۆفێری نوێ
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
              {filters.vehicleType && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  جۆری ئامێر: {filters.vehicleType}
                </span>
              )}
              {filters.rating && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  هەڵسەنگاندن: {filters.rating}+
                </span>
              )}
              {filters.city && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  شار: {filters.city}
                </span>
              )}
              {(filters.minDeliveries || filters.maxDeliveries) && (
                <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                  گەیاندن: {filters.minDeliveries || 0} - {filters.maxDeliveries || '∞'}
                </span>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFilters({
                status: '',
                vehicleType: '',
                rating: '',
                city: '',
                minDeliveries: '',
                maxDeliveries: '',
              })}
            >
              پاککردنەوەی فلتەرەکان
            </Button>
          </div>
        </div>
      )}
      
      {/* Tabs for filtering drivers */}
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
                  {filteredDrivers.filter(d => d.status === tab).length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDrivers.map((driver) => {
          const stats = getDriverStats(driver.id);
          
          return (
            <div 
              key={driver.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <img 
                    src={driver.image || "https://randomuser.me/api/portraits/men/1.jpg"} 
                    alt={driver.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{driver.name}</h3>
                    <StatusBadge status={driver.status} />
                  </div>
                  
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Phone size={14} className="ml-2" />
                      {driver.phone}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin size={14} className="ml-2" />
                      {driver.vehicleType} - {driver.vehiclePlate}
                    </div>
                    
                    {/* Orders Statistics */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        <div className="flex items-center text-sm">
                          <CheckCircle size={14} className="ml-2 text-success-500" />
                          <span className="text-success-600 dark:text-success-400">تەواوکراو</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {stats.completedDeliveries}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        <div className="flex items-center text-sm">
                          <Clock size={14} className="ml-2 text-warning-500" />
                          <span className="text-warning-600 dark:text-warning-400">چاوەڕوان</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {stats.pendingDeliveries}
                        </div>
                      </div>
                    </div>
                    
                    {/* Financial Information */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded mt-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center text-sm">
                            <Wallet size={14} className="ml-2 text-primary-500" />
                            <span className="text-primary-600 dark:text-primary-400">کۆی داهات</span>
                          </div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {stats.totalEarnings.toLocaleString()} د.ع
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm justify-end">
                            <AlertCircle size={14} className="ml-2 text-warning-500" />
                            <span className="text-warning-600 dark:text-warning-400">چاوەڕوانی پارە</span>
                          </div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {stats.pendingEarnings.toLocaleString()} د.ع
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Performance */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Star size={14} className="ml-2 text-warning-500" />
                        <span>{driver.rating} هەڵسەنگاندن</span>
                      </div>
                      <div className="text-sm text-success-600 dark:text-success-400">
                        {stats.successRate}% سەرکەوتوو
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                    دوا چالاکی: {formatDate(driver.lastActive)}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDriverAction('view', driver)}
                >
                  وردەکاری
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDriverAction('edit', driver)}
                >
                  دەستکاری
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDriverAction('deactivate', driver)}
                >
                  ناچالاککردن
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {selectedDriver && modalType === 'details' && (
        <DriverDetailsModal
          driver={selectedDriver}
          onClose={() => {
            setModalType(null);
            setSelectedDriver(null);
          }}
        />
      )}

      {selectedDriver && modalType === 'edit' && (
        <DriverEditModal
          driver={selectedDriver}
          onClose={() => {
            setModalType(null);
            setSelectedDriver(null);
          }}
          onSave={handleEditSave}
        />
      )}

      {selectedDriver && modalType === 'deactivate' && (
        <DriverDeactivateModal
          driver={selectedDriver}
          onClose={() => {
            setModalType(null);
            setSelectedDriver(null);
          }}
          onConfirm={handleDeactivate}
        />
      )}

      {modalType === 'filter' && (
        <DriverFilterModal
          onClose={() => setModalType(null)}
          onApply={handleApplyFilters}
          currentFilters={filters}
        />
      )}

      {modalType === 'add' && (
        <DriverAddModal
          onClose={() => setModalType(null)}
          onAdd={handleAddDriver}
        />
      )}
    </div>
  );
}