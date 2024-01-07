import * as React from 'react';
import cn from '@/lib/classnames';

const alertVariant = [
  'primary',
  'secondary',
  'danger',
  'warning',
  'success',
] as const;
type AlertVariant = (typeof alertVariant)[number];

export type AlertProps = {
  variant?: AlertVariant;
} & React.ComponentPropsWithoutRef<'div'>;

const Alert = ({
  variant = 'primary',
  className,
  children,
  ...rest
}: AlertProps) => {
  return (
    <div
      className={cn([
        'w-full rounded-xl p-3',
        'text-secondary text-center text-balance',
        'text-sm',
        [
          variant === 'primary' && ['bg-primary-50'],
          variant === 'secondary' && ['bg-secondary-50'],
          variant === 'warning' && ['bg-yellow-50'],
          variant === 'danger' && ['bg-red-50'],
          variant === 'success' && ['bg-green-50'],
        ],
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  );
};
Alert.displayName = 'Alert';

export { Alert };
