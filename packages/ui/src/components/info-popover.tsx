import { Info } from 'lucide-react';
import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { IconButton } from '@/components/icon-button';
import cn from '@/lib/classnames';
import type { ExtractProps } from '@/types/helper';

export type InfoPopoverProps = {
  children: React.ReactNode;
  classNames?: {
    content?: string;
    trigger?: string;
  };
} & ExtractProps<typeof Popover>;

const InfoPopover = ({ classNames, children, ...rest }: InfoPopoverProps) => {
  return (
    <Popover {...rest}>
      <PopoverTrigger asChild>
        <IconButton
          className={cn(['rounded-full text-typo-icons', classNames?.trigger])}
          icon={Info}
          size='xs'
          variant='ghost'
        />
      </PopoverTrigger>
      <PopoverContent
        className={cn(['w-60 p-2', classNames?.content])}
        side='top'
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};
InfoPopover.displayName = 'InfoPopover';

export { InfoPopover };
