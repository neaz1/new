import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-600 hover:bg-primary-700 text-white border-transparent focus:ring-primary-500';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800 border-transparent focus:ring-gray-500';
      case 'success':
        return 'bg-success-600 hover:bg-success-700 text-white border-transparent focus:ring-success-500';
      case 'danger':
        return 'bg-danger-600 hover:bg-danger-700 text-white border-transparent focus:ring-danger-500';
      case 'warning':
        return 'bg-warning-500 hover:bg-warning-600 text-white border-transparent focus:ring-warning-500';
      case 'outline':
        return 'bg-transparent hover:bg-gray-100 text-gray-700 border-gray-300 focus:ring-gray-500';
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent focus:ring-gray-500';
      default:
        return 'bg-primary-600 hover:bg-primary-700 text-white border-transparent focus:ring-primary-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2.5 py-1 text-xs';
      case 'md':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-5 py-2.5 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  return (
    <button
      className={cn(
        'font-medium rounded border focus:outline-none focus:ring-2 focus:ring-offset-2',
        'transition-colors duration-200 ease-in-out',
        'flex items-center justify-center space-x-2 rtl:space-x-reverse',
        getVariantClasses(),
        getSizeClasses(),
        isLoading && 'opacity-70 cursor-not-allowed',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -me-1 ms-1 h-4 w-4 text-current\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && leftIcon && <span className="me-2">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="ms-2">{rightIcon}</span>}
    </button>
  );
}