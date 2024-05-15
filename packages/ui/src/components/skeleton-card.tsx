import React from 'react';
import type { ExtractProps } from '@/types/helper';
import cn from '@/lib/classnames';
import { Card } from '@/components/card';
import { Skeleton } from '@/components/skeleton';
import { SkeletonButton } from '@/components/skeleton-button';
import { SkeletonInput } from '@/components/skeleton-input';
import { Typography } from '@/components/typography';

export type SkeletonCardProps = {
  withTitle?: boolean;
  withButtons?: boolean;
  withForm?: boolean;
  withDescription?: boolean;
} & ExtractProps<typeof Card>;

const SkeletonCard = ({
  withTitle = false,
  withButtons = false,
  withForm = false,
  withDescription = false,
  className,
  ...rest
}: SkeletonCardProps) => {
  return (
    <Card className={cn(['mt-4 dashboard-layout', className])} {...rest}>
      {withTitle ? (
        <Card.Title>
          <Skeleton className='w-1/5 rounded-full'>
            <Typography as='h5' variant='h5'>
              &nbsp;
            </Typography>
          </Skeleton>
        </Card.Title>
      ) : null}
      {withForm ? (
        <Card.Section>
          <div className='max-w-sm space-y-3'>
            {[...Array(3)].map((_, i) => (
              <SkeletonInput key={i} />
            ))}
          </div>
        </Card.Section>
      ) : null}
      {withDescription ? (
        <Card.TwoColumnSection className='@lg:max-w-2xl @lg:grid-cols-2'>
          {[...Array(2)].map((_, i) => (
            <div className='space-y-4' key={i}>
              {[...Array(4)].map((_index, j) => (
                <React.Fragment key={j}>
                  <Skeleton className='h-3.5 w-1/5 rounded-full' />
                  <Skeleton className='w-1/2 h-4 rounded-full' />
                </React.Fragment>
              ))}
            </div>
          ))}
        </Card.TwoColumnSection>
      ) : null}
      {withButtons ? (
        <Card.Section>
          <div className='flex justify-end gap-2'>
            {[...Array(2)].map((_, i) => (
              <SkeletonButton className='w-20' key={i} />
            ))}
          </div>
        </Card.Section>
      ) : null}
    </Card>
  );
};
SkeletonCard.displayName = 'SkeletonCard';

export { SkeletonCard };
