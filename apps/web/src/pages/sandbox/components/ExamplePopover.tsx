import {
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ppdbultimate/elysium';
import { HelpCircle } from 'lucide-react';
import * as React from 'react';

import { ExtractProps } from '@/types/helper';

type ExamplePopoverProps = ExtractProps<typeof Popover>;

export default function ExamplePopover({ ...rest }: ExamplePopoverProps) {
  return (
    <Popover {...rest}>
      <PopoverTrigger asChild>
        <IconButton
          variant='ghost'
          className='rounded-full'
          icon={HelpCircle}
        />
      </PopoverTrigger>
      <PopoverContent side='right'>
        Place content for the popover here.
      </PopoverContent>
    </Popover>
  );
}
