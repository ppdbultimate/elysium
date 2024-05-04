import clsx from 'clsx';
import * as React from 'react';
import { Skeleton } from '@/components/skeleton';

export type SkeletonInputProps = {
  withLabel?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const SkeletonInput = ({
  withLabel = true,
  className,
  ...rest
}: SkeletonInputProps) => {
  return (
    <div className={className} {...rest}>
      {withLabel ? <Skeleton className='rounded-full w-1/3 h-3.5' /> : null}
      <Skeleton
        className={clsx([
          'w-full md:min-h-[2.5rem] min-h-[2.25rem] rounded-lg mt-1',
          withLabel && 'mt-1',
        ])}
      />
    </div>
  );
};
SkeletonInput.displayName = 'SkeletonInput';

export { SkeletonInput };
