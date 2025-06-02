import React from 'react';
import { StatCard } from '../ui/StatCard';
import { 
  Package, 
  PackageCheck, 
  PackageOpen, 
  Clock, 
  AlertTriangle, 
  PackageX,
  Truck,
  UserCheck,
  UserX,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';

type StatisticsProps = {
  deliveryCounts: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
    problematic: number;
    failed: number;
  };
  driverCounts: {
    total: number;
    online: number;
    available: number;
    offline: number;
  };
  storesCounts: {
    total: number;
    active: number;
    pending: number;
  };
  issuesCounts: {
    total: number;
    open: number;
    resolved: number;
    closed: number;
  };
};

export function StatisticsCards({ 
  deliveryCounts,
  driverCounts,
  storesCounts,
  issuesCounts
}: StatisticsProps) {
  return (
    <div>
      {/* Delivery Statistics */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">کۆی گەیاندنەکان</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard 
            title="کۆی گەیاندنەکان" 
            value={deliveryCounts.total} 
            icon={Package} 
            trend={5}
          />
          <StatCard 
            title="تەواوبوو" 
            value={deliveryCounts.completed} 
            icon={PackageCheck} 
            className="border-success-500"
            trend={8}
          />
          <StatCard 
            title="بەردەوامە" 
            value={deliveryCounts.inProgress} 
            icon={PackageOpen} 
            className="border-primary-500"
          />
          <StatCard 
            title="چاوەڕوانە" 
            value={deliveryCounts.pending} 
            icon={Clock} 
            className="border-warning-500"
            trend={-3}
          />
          <StatCard 
            title="کێشەی هەیە" 
            value={deliveryCounts.problematic} 
            icon={AlertTriangle} 
            className="border-orange-500"
            trend={12}
          />
          <StatCard 
            title="نەگیشتوە" 
            value={deliveryCounts.failed} 
            icon={PackageX} 
            className="border-danger-500"
            trend={-7}
          />
        </div>
      </div>

      {/* Driver Statistics */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">درایڤەرە چالاکەکان</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="کۆی درایڤەرەکان" 
            value={driverCounts.total} 
            icon={Truck}
          />
          <StatCard 
            title="ئێستا سەرهێڵ" 
            value={driverCounts.online} 
            icon={UserCheck} 
            className="border-success-500"
          />
          <StatCard 
            title="بەردەست" 
            value={driverCounts.available} 
            icon={Truck} 
            className="border-primary-500"
          />
          <StatCard 
            title="لەسەرهێڵ نین" 
            value={driverCounts.offline} 
            icon={UserX} 
            className="border-gray-500"
          />
        </div>
      </div>

      {/* Other Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Stores */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">فرۆشیار</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard 
              title="کۆی فرۆشیارەکان" 
              value={storesCounts.total} 
              icon={ShoppingBag} 
              className="border-primary-500"
            />
            <StatCard 
              title="چالاک" 
              value={storesCounts.active} 
              icon={ShoppingBag} 
              className="border-success-500"
            />
            <StatCard 
              title="چاوەڕوانن" 
              value={storesCounts.pending} 
              icon={ShoppingBag} 
              className="border-warning-500"
            />
          </div>
        </div>

        {/* Issues */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">کێشەکان</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard 
              title="کۆی کێشەکان" 
              value={issuesCounts.total} 
              icon={AlertCircle} 
              className="border-primary-500"
            />
            <StatCard 
              title="کراوە" 
              value={issuesCounts.open} 
              icon={AlertCircle} 
              className="border-danger-500"
            />
            <StatCard 
              title="چارەسەرکراو" 
              value={issuesCounts.resolved} 
              icon={AlertCircle} 
              className="border-success-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}