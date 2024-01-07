import * as React from 'react';
import cn from '@/lib/classnames';
import { Card } from '@/components/card';
import { Typography } from '@/components/typography';

type DevelopmentCardProps = React.ComponentPropsWithoutRef<'div'>;

const DevelopmentCard = ({
  className,
  children,
  ...rest
}: DevelopmentCardProps) => {
  const envFlag = process.env.NEXT_PUBLIC_SHOW_DEVELOPMENT_CARD === 'true';
  const shouldShow = envFlag || process.env.NODE_ENV !== 'production';

  return shouldShow ? (
    <Card
      className={cn([
        'border-2 border-dashed border-secondary-500 bg-secondary-50',
        'pt-2',
        className,
      ])}
      size='sm'
      {...rest}
    >
      <Typography className='mb-2 text-center text-secondary-700' variant='c1'>
        Development Only
      </Typography>
      {children}
    </Card>
  ) : null;
};
DevelopmentCard.displayName = 'DevelopmentCard';

export { DevelopmentCard };
