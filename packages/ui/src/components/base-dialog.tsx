import clsx from 'clsx';
import { AlertCircle, AlertTriangle, Check, X } from 'lucide-react';
import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/alert-dialog';
import { IconButton } from '@/components/icon-button';

const colorVariant = {
  success: {
    bg: {
      light: 'bg-green-100',
    },
    text: {
      primary: 'text-green-500',
    },
    icon: Check,
  },
  warning: {
    bg: {
      light: 'bg-yellow-100',
    },
    text: {
      primary: 'text-yellow-500',
    },
    icon: AlertTriangle,
  },
  danger: {
    bg: {
      light: 'bg-red-100',
    },
    text: {
      primary: 'text-red-500',
    },
    icon: AlertCircle,
  },
};

export type BaseDialogProps = {
  /** Maintained by useDialogStore */
  open: boolean;
  /** Maintained by useDialogStore */
  onSubmit: () => void;
  /** Maintained by useDialogStore */
  onClose: () => void;
  /** Customizable Dialog Options */
  options: DialogOptions;
};

export type DialogOptions = {
  catchOnCancel?: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
  variant: 'success' | 'warning' | 'danger';
  isLoading: boolean;
  submitText: React.ReactNode;
  listenForLoadingToast?: boolean;
};

/**
 * Base Dialog for useDialog hook implementation.
 *
 * **Should be called with the hook, not by the component itself**
 *
 *
 * @see useDialogStore
 * @example
 * ```tsx
 * const dialog = useDialog();
 *
 * dialog(options);
 * ```
 */
const BaseDialog = ({
  open,
  onSubmit,
  onClose,
  options: {
    title,
    description,
    variant,
    submitText,
    isLoading,
    listenForLoadingToast = false,
  },
}: BaseDialogProps) => {
  const current = colorVariant[variant];

  return (
    <AlertDialog onOpenChange={(isOpen) => !isOpen && onClose()} open={open}>
      <AlertDialogContent className='relative'>
        <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
          <IconButton
            icon={X}
            iconClassName='text-2xl text-typo-icons'
            onClick={onClose}
            size='sm'
            variant='ghost'
          />
        </div>

        <AlertDialogHeader className='sm:flex sm:items-start sm:gap-x-4'>
          <div
            className={clsx(
              'flex flex-shrink-0 items-center justify-center rounded-full',
              'mx-auto h-12 w-12 sm:mx-0 sm:h-10 sm:w-10',
              current.bg.light,
            )}
          >
            <current.icon
              aria-hidden='true'
              className={clsx('h-6 w-6', current.text.primary)}
            />
          </div>
          <div className='space-y-2 mt-3 sm:mt-0'>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            isLoading={listenForLoadingToast ? isLoading : undefined}
          >
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            isLoading={listenForLoadingToast ? isLoading : undefined}
            onClick={onSubmit}
          >
            {submitText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
BaseDialog.displayName = 'BaseDialog';

export { BaseDialog };
