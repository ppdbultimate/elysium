import * as React from 'react';
import { Typography } from '@/components/typography';
import cn from '@/lib/classnames';

export type DescriptionListProps = {
  title: React.ReactNode;
  description: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const DescriptionList = ({
  className,
  title,
  description,
  ...rest
}: DescriptionListProps) => {
  return (
    <div className={cn(className)} {...rest}>
      <Typography as='dt' color='secondary' variant='b3'>
        {title}
      </Typography>
      <Typography as='dd' variant='b2'>
        {description}
      </Typography>
    </div>
  );
};
DescriptionList.displayName = 'DescriptionList';

export { DescriptionList };
