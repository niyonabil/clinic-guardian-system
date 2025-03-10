
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  iconClassName,
}) => {
  return (
    <div className={cn('glass-card p-6 card-hover', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h4 className="mt-2 text-2xl font-semibold text-gray-900">{value}</h4>
          
          {trend && (
            <p className={cn(
              'mt-1 text-xs flex items-center',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              <span className={cn(
                'inline-block mr-1',
                trend.isPositive ? 'rotate-0' : 'rotate-180'
              )}>
                ↑
              </span>
              {trend.value}% depuis le mois dernier
            </p>
          )}
          
          {description && (
            <p className="mt-3 text-sm text-gray-500">{description}</p>
          )}
        </div>
        
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center',
          iconClassName || 'bg-blue/10 text-blue'
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
