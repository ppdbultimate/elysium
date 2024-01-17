import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import cn from '@/lib/classnames';
import { Skeleton } from '@/components/skeleton';
import { Typography } from '@/components/typography';
import { LOCALE } from '@/constant/common';

const statisticsCardVariant = [
  'primary',
  'secondary',
  'danger',
  'warning',
  'success',
] as const;
type StatisticsCardVariant = (typeof statisticsCardVariant)[number];

export type StatisticsCardProps = {
  icon?: LucideIcon;
  iconClassName?: string;
  isLoading?: boolean;
  label: string;
  value?: number | null;
  variant?: StatisticsCardVariant;
} & React.ComponentPropsWithoutRef<'div'>;

const StatisticsCard = ({
  className,
  icon: Icon,
  iconClassName,
  isLoading = false,
  label,
  value,
  variant = 'primary',
  ...rest
}: StatisticsCardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl bg-white p-3',
        'border border-typo-divider',
        'flex items-center gap-3',
        className,
      )}
      {...rest}
    >
      {Icon ? (
        <div
          className={cn('rounded-lg p-2', [
            variant === 'primary' && ['bg-primary-50'],
            variant === 'secondary' && ['bg-secondary-50'],
            variant === 'warning' && ['bg-yellow-50'],
            variant === 'danger' && ['bg-red-50'],
            variant === 'success' && ['bg-green-50'],
          ])}
        >
          <Icon
            className={cn(
              [
                variant === 'primary' && ['text-primary-500'],
                variant === 'secondary' && ['text-secondary-500'],
                variant === 'warning' && ['text-yellow-500'],
                variant === 'danger' && ['text-red-500'],
                variant === 'success' && ['text-green-500'],
              ],
              iconClassName,
            )}
            size='1.5em'
          />
        </div>
      ) : null}
      {isLoading ? (
        <div>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='mt-1 h-4 w-10' />
        </div>
      ) : (
        <div>
          <Typography color='secondary' variant='b3'>
            {label}
          </Typography>
          <Typography variant='s2'>
            {value || value === 0 ? value.toLocaleString(LOCALE) : '-'}
          </Typography>
        </div>
      )}
    </div>
  );
};
StatisticsCard.displayName = 'StatisticsCard';

export { StatisticsCard };
