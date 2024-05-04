import * as React from 'react';
import { Typography } from '@/components/typography';
import cn from '@/lib/classnames';

export type CardProps = {
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

function CardRoot({ children, className, ...rest }: CardProps) {
  return (
    <div
      className={cn([
        'rounded-xl border border-typo-divider bg-white',
        className,
      ])}
      {...rest}
    >
      <div className='px-4 divide-y divide-typo-divider sm:px-6'>
        {children}
      </div>
    </div>
  );
}
CardRoot.displayName = 'Card';

function Title({ className, children }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'py-2 sm:py-3',
        '-mx-4 -mb-[1px] px-4 sm:-mx-6 sm:px-6',
        'border-b border-typo-divider',
        className,
      )}
    >
      {typeof children === 'string' ? (
        <Typography as='h2' variant='h5'>
          {children}
        </Typography>
      ) : (
        children
      )}
    </div>
  );
}
Title.displayName = 'Card.Title';

function Section({
  className,
  children,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex w-full flex-col', 'py-4 sm:py-6', className)}>
      {children}
    </div>
  );
}
Section.displayName = 'Card.Section';

type TwoColumnSectionProps = {
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'div'>;

function TwoColumnSection({
  className,
  children,
  containerClassName,
}: TwoColumnSectionProps) {
  return (
    <div className={cn(['@container', containerClassName])}>
      <div
        className={cn(
          'grid gap-4 @lg:grid-cols-[1fr,2.5fr] @lg:gap-8',
          'py-4 sm:py-6',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
TwoColumnSection.displayName = 'Card.TwoColumnSection';

function ActionGroup({
  className,
  children,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('py-4 sm:py-6', '-mx-4 px-4 sm:-mx-6 sm:px-6', className)}
    >
      {children}
    </div>
  );
}
ActionGroup.displayName = 'Card.ActionGroup';

const Card = Object.assign(CardRoot, {
  Title,
  Section,
  TwoColumnSection,
  ActionGroup,
});
export { Card };
