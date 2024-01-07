import * as React from 'react';
import cn from '@/lib/classnames';

const CARD_SIZE = ['sm', 'base'] as const;
type CardSize = (typeof CARD_SIZE)[number];

export type CardProps = {
  size?: CardSize;
} & React.ComponentPropsWithoutRef<'div'>;

const Card = ({ className, size = 'base', ...rest }: CardProps) => {
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
Card.displayName = 'Card';

export { Card };
