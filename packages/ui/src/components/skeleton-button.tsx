import * as React from 'react';
import type { ButtonProps } from '@/components/button';
import { Skeleton } from '@/components/skeleton';
import cn from '@/lib/classnames';

export type SkeletonButtonProps = {
  size?: ButtonProps['size'];
} & React.ComponentPropsWithoutRef<'div'>;

const SkeletonButton = ({
  size = 'base',
  className,
  ...rest
}: SkeletonButtonProps) => {
  return (
    <Skeleton
      className={cn([
        'rounded-lg',
        [
          size === 'lg' && [
            'min-h-[2.75rem] px-3.5 md:min-h-[3rem]',
            'text-base',
          ],
          size === 'base' && [
            'min-h-[2.25rem] px-3 md:min-h-[2.5rem]',
            'text-sm md:text-base',
          ],
          size === 'sm' && [
            'min-h-[1.75rem] px-2 md:min-h-[2rem]',
            'text-xs md:text-sm',
          ],
        ],
        className,
      ])}
      {...rest}
    />
  );
};
SkeletonButton.displayName = 'SkeletonButton';

export { SkeletonButton };
