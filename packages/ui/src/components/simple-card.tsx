import * as React from 'react';
import cn from '@/lib/classnames';

const SIMPLE_CARD_SIZE = ['sm', 'base'] as const;
type SimpleCardSize = (typeof SIMPLE_CARD_SIZE)[number];

export type SimpleCardProps = {
  size?: SimpleCardSize;
} & React.ComponentPropsWithoutRef<'div'>;

const SimpleCard = ({ className, size = 'base', ...rest }: SimpleCardProps) => {
  return (
    <div
      className={cn(
        'bg-white shadow-sm',
        [
          size === 'sm' && ['p-4', 'rounded-lg'],
          size === 'base' && ['p-5', 'rounded-xl'],
        ],
        className,
      )}
      {...rest}
    />
  );
};
SimpleCard.displayName = 'SimpleCard';

export { SimpleCard };
