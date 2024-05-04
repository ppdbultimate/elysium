import * as React from 'react';
import Lightbox from 'react-image-lightbox-rotation';
import 'react-image-lightbox-rotation/style.css';
import type { ExtractProps } from '@/types/helper';
import { NextImage } from '@/components/next-image';

export type NextImageLightboxProps = {
  src: string;
} & ExtractProps<typeof NextImage>;

const NextImageLightbox = (props: NextImageLightboxProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className='cursor-zoom-in'>
      <NextImage onClick={() => setIsOpen(true)} {...props} />
      {isOpen ? (
        <Lightbox
          mainSrc={props.src}
          onCloseRequest={() => setIsOpen(false)}
          rotate={0}
        />
      ) : null}
    </div>
  );
};
NextImageLightbox.displayName = 'NextImageLightbox';

export { NextImageLightbox };
