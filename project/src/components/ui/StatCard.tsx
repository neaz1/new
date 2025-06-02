import React from 'react';
import { cn } from '../../utils/cn';
import { DivideIcon as LucideIcon } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: number;
  className?: string;
  onClick?: () => void;
};

export function StatCard({ title, value, icon: Icon, trend, className, onClick }: StatCardProps) {
  return (
    <div 
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-r-4 border-primary-500 hover:shadow-md transition-shadow',
        className,
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
          
          {trend !== undefined && (
            <span className={cn(
              'text-xs font-medium mt-2 inline-block',
              trend >= 0 ? 'text-success-600' : 'text-danger-600'
            )}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% بەراورد بە دوێنێ
            </span>
          )}
        </div>
        
        <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-full">
          <Icon className="h-5 w-5 text-primary-600 dark:text-primary-300" />
        </div>
      </div>
    </div>
  );
}