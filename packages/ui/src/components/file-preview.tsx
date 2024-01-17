import {
  ExternalLink,
  Eye,
  Image as ImageIcon,
  Paperclip,
  X,
} from 'lucide-react';
import * as React from 'react';
import Lightbox from 'react-image-lightbox-rotation';
import 'react-image-lightbox-rotation/style.css';
import type { FileWithPreview } from '@/types/dropzone';
import { UnstyledLink } from '@/components/unstyled-link';

export type FilePreviewProps = {
  file: FileWithPreview;
} & (
  | {
      deleteFile?: (
        e: React.MouseEvent<HTMLButtonElement>,
        file: FileWithPreview,
      ) => void;
      readOnly?: true;
    }
  | {
      deleteFile: (
        e: React.MouseEvent<HTMLButtonElement>,
        file: FileWithPreview,
      ) => void;
      readOnly?: false;
    }
);

const FilePreview = ({
  deleteFile,
  file,
  readOnly,
}: FilePreviewProps): React.ReactElement => {
  const [index, setIndex] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const images = [file.preview];

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteFile?.(e, file);
  };

  const imagesType = ['image/png', 'image/jpg', 'image/jpeg'];

  return imagesType.includes(file.type) ? (
    <>
      <li
        className='flex min-h-[2.25rem] items-center justify-between py-0 pl-3 pr-4 text-sm md:min-h-[2.5rem]'
        key={file.name}
      >
        <div className='flex w-0 flex-1 items-center'>
          <ImageIcon
            aria-hidden='true'
            className='h-5 w-5 flex-shrink-0 text-gray-400'
          />
          <span className='ml-2 w-0 flex-1 truncate'>{file.name}</span>
        </div>
        <div className='ml-4 flex flex-shrink-0 items-center space-x-2'>
          <button
            className='inline-block rounded text-xl font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-primary-500'
            onClick={() => setIsOpen(true)}
            type='button'
          >
            <Eye />
          </button>
          {!readOnly && (
            <button
              className='rounded text-xl font-medium text-red-500 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-500'
              onClick={handleDelete}
              type='button'
            >
              <X />
            </button>
          )}
        </div>
      </li>
      {isOpen ? (
        <Lightbox
          mainSrc={images[index]}
          nextSrc={images[(index + 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMoveNextRequest={() =>
            setIndex((prevIndex) => (prevIndex + 1) % images.length)
          }
          onMovePrevRequest={() =>
            setIndex(
              (prevIndex) => (prevIndex + images.length - 1) % images.length,
            )
          }
          prevSrc={images[(index + images.length - 1) % images.length]}
          rotate={0}
        />
      ) : null}
    </>
  ) : (
    <li
      className='flex min-h-[2.25rem] items-center justify-between py-0 pl-3 pr-4 text-sm md:min-h-[2.5rem]'
      key={file.name}
    >
      <div className='flex w-0 flex-1 items-center'>
        <Paperclip
          aria-hidden='true'
          className='h-5 w-5 flex-shrink-0 text-gray-400'
        />
        <span className='ml-2 w-0 flex-1 truncate'>{file.name}</span>
      </div>
      <div className='ml-4 flex flex-shrink-0 items-center space-x-2'>
        <UnstyledLink
          className='rounded text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-primary-500'
          href={file.preview}
        >
          <ExternalLink size={20} />
        </UnstyledLink>
        {!readOnly && (
          <button
            className='cursor-pointer rounded text-red-500 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-500'
            onClick={(e) => deleteFile?.(e, file)}
            type='button'
          >
            <X size={24} />
          </button>
        )}
      </div>
    </li>
  );
};
FilePreview.displayName = 'FilePreview';

export { FilePreview };
