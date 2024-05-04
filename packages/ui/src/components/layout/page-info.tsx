import * as React from 'react';
import type { ExtractProps } from '@/types/helper';
import cn from '@/lib/classnames';
import { NextImage } from '@/components/next-image';
import { Typography } from '@/components/typography';

function PageInfoRoot({
  containerClassName,
  className,
  children,
  ...rest
}: {
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'section'>) {
  return (
    <main className={cn(['bg-light', containerClassName])} {...rest}>
      <section
        className={cn([
          'layout flex min-h-screen flex-col-reverse gap-8 py-12 md:flex-row md:gap-24',
          className,
        ])}
      >
        {children}
      </section>
    </main>
  );
}
PageInfoRoot.displayName = 'PageInfoRoot';

function Content({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(['flex w-full flex-col justify-center gap-4', className])}
      {...rest}
    />
  );
}
Content.displayName = 'PageInfoContent';

function Image({
  containerClassName,
  className,
  ...rest
}: { containerClassName?: string } & ExtractProps<typeof NextImage>) {
  return (
    <div
      className={cn([
        'flex w-full shrink-0 items-center md:w-2/5',
        containerClassName,
      ])}
    >
      <NextImage className={cn(['w-full', className])} {...rest} />
    </div>
  );
}
Image.displayName = 'PageInfoImage';

function Title({
  children,
  className,
  ...rest
}: ExtractProps<typeof Typography>) {
  return (
    <Typography
      as='h1'
      className={cn(['font-semibold md:text-5xl', className])}
      variant='j1'
      {...rest}
    >
      {children}
    </Typography>
  );
}
Title.displayName = 'PageInfoTitle';

function Subtitle({
  children,
  className,
  ...rest
}: ExtractProps<typeof Typography>) {
  return (
    <Typography
      as='h2'
      className={cn(['font-normal', className])}
      variant='h2'
      {...rest}
    >
      {children}
    </Typography>
  );
}
Subtitle.displayName = 'PageInfoSubtitle';

const PageInfo = Object.assign(PageInfoRoot, {
  Content,
  Title,
  Subtitle,
  Image,
});
export { PageInfo };
