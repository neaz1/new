import React from 'react';
import { cn } from '../../utils/cn';

type StatusBadgeProps = {
  status: string;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    // Delivery statuses
    if (status === 'تەواوبوو') return 'bg-success-100 text-success-800';
    if (status === 'بەردەوامە') return 'bg-primary-100 text-primary-800';
    if (status === 'چاوەڕوانە') return 'bg-warning-100 text-warning-800';
    if (status === 'کێشەی هەیە') return 'bg-orange-100 text-orange-800';
    if (status === 'نەگیشتوە') return 'bg-danger-100 text-danger-800';
    
    // Driver statuses
    if (status === 'سەرهێڵ') return 'bg-success-100 text-success-800';
    if (status === 'بەردەست') return 'bg-primary-100 text-primary-800';
    if (status === 'نەبەردەست') return 'bg-gray-100 text-gray-800';
    
    // Store/user statuses
    if (status === 'چالاک') return 'bg-success-100 text-success-800';
    if (status === 'ناچالاک') return 'bg-gray-100 text-gray-800';
    if (status === 'پەسەندکراو') return 'bg-success-100 text-success-800';
    if (status === 'ڕەتکراوە') return 'bg-danger-100 text-danger-800';
    if (status === 'هەڵپەسێردراو') return 'bg-warning-100 text-warning-800';
    
    // Issue statuses
    if (status === 'کراوەیە') return 'bg-danger-100 text-danger-800';
    if (status === 'چارەسەرکراو') return 'bg-success-100 text-success-800';
    if (status === 'داخراو') return 'bg-gray-100 text-gray-800';
    
    // Priority statuses
    if (status === 'نزم') return 'bg-gray-100 text-gray-800';
    if (status === 'ناوەند') return 'bg-warning-100 text-warning-800';
    if (status === 'بەرز') return 'bg-orange-100 text-orange-800';
    if (status === 'فریاکەوتن') return 'bg-danger-100 text-danger-800';
    
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-xs font-medium inline-block',
        getStatusColor(status),
        className
      )}
    >
      {status}
    </span>
  );
}