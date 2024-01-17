import * as React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerSection,
  DrawerTitle,
} from '@/components/drawer';
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalTitle,
} from '@/components/modal';
import type { ExtractProps } from '@/types/helper';
import { Button } from '@/components/button';
import { useMediaQuery } from '@/hooks/use-media-query';

export type AdaptiveModalProps = {
  title: string;
  description?: string;
  disableClickOutside?: boolean;
  /** @defaultValue 'Close' */
  closeText?: string;
  /** @defaultValue false */
  isOpen: boolean;
  /** Set State Action to control modal isOpen state */
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionButtonProps?: ExtractProps<typeof Button>;
  children?: React.ReactNode;
};

const AdaptiveModal = ({
  title,
  description,
  disableClickOutside = false,
  closeText = 'Close',
  isOpen = false,
  setIsOpen,
  children,
  actionButtonProps,
}: AdaptiveModalProps) => {
  /**
   * To avoid hydration failure, set the open state to the value of isOpen prop when the component is mounted.
   * @see https://github.com/radix-ui/primitives/issues/1386#issuecomment-1171798282
   * @see https://github.com/radix-ui/primitives/issues/1386#issuecomment-1573074278
   */
  React.useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen, setIsOpen]);

  const handleOpenChange = (open: boolean) => {
    disableClickOutside ? setIsOpen(true) : setIsOpen(open);
  };

  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop)
    return (
      <Modal onOpenChange={handleOpenChange} open={isOpen}>
        <ModalContent disableClickOutside={disableClickOutside}>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            {description ? (
              <ModalDescription>{description}</ModalDescription>
            ) : null}
          </ModalHeader>

          {children ? <ModalSection>{children}</ModalSection> : null}

          <ModalFooter>
            {!disableClickOutside && (
              <ModalClose asChild>
                <Button variant='outline'>{closeText}</Button>
              </ModalClose>
            )}
            {actionButtonProps ? (
              <Button variant='primary' {...actionButtonProps} />
            ) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );

  return (
    <Drawer onOpenChange={handleOpenChange} open={isOpen}>
      <DrawerContent disableClickOutside={disableClickOutside}>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description ? (
            <DrawerDescription>{description}</DrawerDescription>
          ) : null}
        </DrawerHeader>

        {children ? <DrawerSection>{children}</DrawerSection> : null}

        <DrawerFooter>
          {actionButtonProps ? (
            <Button variant='primary' {...actionButtonProps} />
          ) : null}
          {!disableClickOutside && (
            <DrawerClose asChild>
              <Button variant='outline'>{closeText}</Button>
            </DrawerClose>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
AdaptiveModal.displayName = 'AdaptiveModal';

export { AdaptiveModal };
