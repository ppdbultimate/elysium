import * as React from 'react';
import cn from '@/lib/classnames';

export type MacCardProps = {
  childrenClassName?: string;
  mode?: 'dark' | 'light';
} & React.ComponentPropsWithoutRef<'div'>;

const MacCard = ({
  className,
  children,
  childrenClassName,
  mode = 'dark',
  ...rest
}: MacCardProps) => {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg',
        mode === 'light' && 'border border-typo-divider shadow-sm',
        className,
      )}
      {...rest}
    >
      <div
        className={cn([
          'flex gap-1 rounded-t-lg p-2',
          [mode === 'dark' && ['bg-dark'], mode === 'light' && ['bg-light']],
        ])}
        data-id='card-bar-with-three-dots'
      >
        <div className='h-2 w-2 rounded-full bg-rose-500' />
        <div className='h-2 w-2 rounded-full bg-amber-500' />
        <div className='h-2 w-2 rounded-full bg-green-400' />
      </div>
      <div
        className={cn([
          'rounded-b-lg bg-neutral-100 p-4',
          [
            mode === 'dark' && ['bg-neutral-100'],
            mode === 'light' && ['bg-white'],
          ],
          childrenClassName,
        ])}
      >
        {children}
      </div>
    </div>
  );
};
MacCard.displayName = 'MacCard';

export { MacCard };
