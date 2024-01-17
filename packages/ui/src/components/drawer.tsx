import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { Typography } from '@/components/typography';
import cn from '@/lib/classnames';

const Drawer = ({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root {...props} />
);
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    className={cn([
      'fixed inset-0 z-30 bg-gray-500/80 backdrop-blur-sm',
      className,
    ])}
    ref={ref}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    disableClickOutside?: boolean;
  }
>(({ className, children, disableClickOutside, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 flex h-auto flex-col rounded-t-xl bg-white',
        className,
      )}
      onPointerDownOutside={(e) => disableClickOutside && e.preventDefault()}
      ref={ref}
      {...props}
    >
      <div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-neutral-200' />
      <div className='w-full max-w-md p-4 mx-auto space-y-4 '>{children}</div>
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-2', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    asChild
    className={cn('text-center text-balance', className)}
    ref={ref}
    {...props}
  >
    <Typography as={DrawerPrimitive.Title} variant='h2'>
      {props.children}
    </Typography>
  </DrawerPrimitive.Title>
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    asChild
    className={cn('flex text-center w-full flex-col text-pretty', className)}
    ref={ref}
    {...props}
  >
    <Typography as={DrawerPrimitive.Description} color='secondary' variant='b3'>
      {props.children}
    </Typography>
  </DrawerPrimitive.Description>
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

const DrawerSection = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col overflow-y-auto px-4 -mx-4 max-h-[50svh]',
      className,
    )}
    {...props}
  />
);
DrawerSection.displayName = 'DrawerSection';

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerSection,
  DrawerTitle,
  DrawerTrigger,
};
