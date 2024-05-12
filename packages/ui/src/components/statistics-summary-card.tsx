import * as React from 'react';
import { SimpleCard } from '@/components/simple-card';
import { Skeleton } from '@/components/skeleton';
import { Typography } from '@/components/typography';
import cn from '@/lib/classnames';

export type StatisticsSummaryCardProps = {
  title?: string;
  unit?: string;
  data: {
    /** unique id for keys */
    id: number | string;
    /** representation data in a string  */
    label: string;
    /** partial value to calculate getPercentage from  */
    value: number;
    total: number;
    /** representation data in a color  */
    color: string;
  }[];
  isLoading?: boolean;
  includePercentage?: boolean;
  includeTotal?: boolean;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const StatisticsSummaryCard = ({
  title,
  unit,
  data,
  isLoading,
  includePercentage = false,
  includeTotal = false,
  className,
  containerClassName,
  ...rest
}: StatisticsSummaryCardProps) => {
  return (
    <div className={cn(['space-y-4 @container', containerClassName])} {...rest}>
      {title ? (
        <Typography as='h2' variant='h5'>
          {title}
        </Typography>
      ) : null}
      <div className={cn(['grid gap-3 @md:grid-cols-3', className])}>
        {isLoading ? (
          [...Array(3)].map((_, i) => <StatisticsItemSkeleton key={i} />)
        ) : data.length > 0 ? (
          data.map((item) => (
            <StatisticsItem
              data={item}
              includePercentage={includePercentage}
              includeTotal={includeTotal}
              key={item.id}
              total={item.total}
              unit={unit}
            />
          ))
        ) : (
          <SimpleCard className='col-span-full text-center'>
            <Typography variant='c1'>Data tidak ditemukan</Typography>
          </SimpleCard>
        )}
      </div>
    </div>
  );
};
StatisticsSummaryCard.displayName = 'StatisticsSummaryCard';

//#region  //*=========== Helper ===========
function getPercentage(partialValue?: number, totalValue?: number) {
  if (!partialValue || !totalValue) return 0;

  if (totalValue === 0) return 0;

  return (100 * partialValue) / totalValue;
}
//#endregion  //*======== Helper ===========

//#region  //*=========== Components ===========
type StatisticsItem = {
  unit?: string;
  data: StatisticsSummaryCardProps['data'][number];
  total: number;
  includePercentage: boolean;
  includeTotal: boolean;
};
function StatisticsItem({
  unit,
  data,
  total,
  includePercentage,
  includeTotal,
}: StatisticsItem) {
  return (
    <SimpleCard className='border border-typo-divider shadow-sm'>
      <div className='flex items-center gap-2'>
        <span className={cn([data.color, 'h-2 w-2 shrink-0 rounded-full'])} />
        <Typography variant='s3'>{data.label}</Typography>
      </div>

      <Typography className='mt-3' color='secondary' variant='h3'>
        {`${data.value} ${includeTotal ? '' : unit}`}
        {includeTotal ? (
          <span className='b3 text-typo-secondary'>{`/${total} ${
            unit ?? ''
          }`}</span>
        ) : null}
      </Typography>

      {includePercentage ? (
        <div className='mt-1 space-y-1'>
          <div className='w-ful relative h-2 overflow-hidden rounded-full bg-light shadow-inner'>
            <span
              className={cn([
                data.color,
                'absolute left-0 h-2 shrink-0 rounded-r-full',
              ])}
              style={{
                width: `${getPercentage(data.value, total)}%`,
              }}
              title={data.label}
            >
              &nbsp;
            </span>
          </div>
          <div className='flex w-full justify-end'>
            <Typography color='tertiary' variant='b3'>
              {`${getPercentage(data.value, total).toFixed(2)}%`}
            </Typography>
          </div>
        </div>
      ) : null}
    </SimpleCard>
  );
}

function StatisticsItemSkeleton() {
  return (
    <SimpleCard className='border border-typo-divider shadow-sm'>
      <div className='flex items-center gap-2'>
        <Skeleton className={cn(['h-2 w-2 shrink-0 rounded-full'])} />
        <Skeleton className={cn(['h-2 w-1/2 shrink-0 rounded-full'])} />
      </div>
      <Skeleton className='mt-5 h-12 w-full' />
    </SimpleCard>
  );
}
//#endregion  //*======== Components ===========

export { StatisticsSummaryCard };
