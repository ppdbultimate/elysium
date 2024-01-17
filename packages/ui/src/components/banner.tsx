import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import type { CustomArrowProps, Settings } from 'react-slick';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IconButton } from '@/components/icon-button';
import cn from '@/lib/classnames';
import { Typography } from '@/components/typography';

export type BannerProps = {
  contents: (() => React.ReactNode)[];
} & React.ComponentPropsWithoutRef<'div'>;

function NextArrow({ onClick }: CustomArrowProps) {
  return (
    <IconButton
      className='absolute top-1/2 right-0 z-10 flex translate-x-full -translate-y-1/2 items-center rounded-full'
      icon={ChevronRight}
      onClick={onClick}
      size='sm'
      variant='ghost'
    />
  );
}

function PrevArrow({ onClick }: CustomArrowProps) {
  return (
    <IconButton
      className='absolute top-1/2 left-0 z-10 flex -translate-x-full -translate-y-1/2 items-center rounded-full'
      icon={ChevronLeft}
      onClick={onClick}
      size='sm'
      variant='ghost'
    />
  );
}

const settings: Settings = {
  autoplay: true,
  autoplaySpeed: 6000,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const Banner = ({ className, contents, ...rest }: BannerProps) => {
  if (!contents.length) return null;

  /**
   * @see https://github.com/prismicio/prismic-next/pull/79/files
   *
   * TODO: Remove once https://github.com/vercel/next.js/issues/52216 is resolved.
   */
  let ResolvedSlider = Slider;
  if ('default' in ResolvedSlider) {
    ResolvedSlider = (ResolvedSlider as unknown as { default: typeof Slider })
      .default;
  }

  return (
    <div
      className={cn(
        'flex items-center bg-primary-100 py-3',
        'min-h-[4rem]',
        className,
      )}
      {...rest}
    >
      <div className='sm:layout max-w-full px-8 sm:px-0'>
        <ResolvedSlider {...settings}>
          {contents.map((content, index) => (
            <div className='text-center' key={index}>
              <Typography font='averta' variant='b3'>
                {content()}
              </Typography>
            </div>
          ))}
        </ResolvedSlider>
      </div>
    </div>
  );
};
Banner.displayName = 'Banner';

export { Banner };
