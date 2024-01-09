import type { LucideIcon } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import cn from '@/lib/classnames';

const ButtonVariant = [
  'primary',
  'secondary',
  'danger',
  'outline',
  'ghost',
  'warning',
] as const;
const ButtonSize = ['sm', 'base', 'lg'] as const;

export type ButtonProps = {
  isLoading?: boolean;
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium',
          'focus:outline-none focus-visible:ring',
          'shadow-sm',
          'transition-colors duration-75',
          //#region  //*=========== Size ===========
          [
            size === 'lg' && [
              'min-h-[2.75rem] px-3.5 md:min-h-[3rem]',
              'text-base',
            ],
            size === 'base' && [
              'min-h-[2.25rem] px-3 md:min-h-[2.5rem]',
              'text-sm md:text-base',
            ],
            size === 'sm' && [
              'min-h-[1.75rem] px-2 md:min-h-[2rem]',
              'text-xs md:text-sm',
            ],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-primary-500 text-white',
              'border-primary-600 border',
              'hover:bg-primary-600 hover:text-white',
              'active:bg-primary-700',
              'disabled:bg-primary-700',
              'focus-visible:ring-primary-400',
            ],
            variant === 'secondary' && [
              'bg-secondary-500 text-white',
              'border-secondary-600 border',
              'hover:bg-secondary-600 hover:text-white',
              'active:bg-secondary-700',
              'disabled:bg-secondary-700',
              'focus-visible:ring-secondary-400',
            ],
            variant === 'danger' && [
              'bg-red-500 text-white',
              'border border-red-600',
              'hover:bg-red-600 hover:text-white',
              'active:bg-red-700',
              'disabled:bg-red-700',
              'focus-visible:ring-red-400',
            ],
            variant === 'warning' && [
              'bg-amber-500 text-white',
              'border border-amber-500',
              'hover:bg-amber-600 hover:text-white',
              'active:bg-amber-700',
              'disabled:bg-amber-700',
              'focus-visible:ring-amber-400',
            ],
            variant === 'outline' && [
              'text-typo',
              'border border-gray-300',
              'hover:bg-light focus-visible:ring-primary-400 active:bg-typo-divider disabled:bg-typo-divider',
            ],
            variant === 'ghost' && [
              'text-primary-500',
              'shadow-none',
              'hover:bg-primary-50 focus-visible:ring-primary-400 active:bg-primary-100 disabled:bg-primary-100',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className,
        )}
        disabled={disabled}
        ref={ref}
        type='button'
        {...rest}
      >
        {isLoading ? (
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': [
                  'primary',
                  'secondary',
                  'danger',
                  'warning',
                ].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              },
            )}
          >
            <Loader2 className='animate-spin' size={18} />
          </div>
        ) : null}
        {LeftIcon ? (
          <div
            className={cn([
              size === 'lg' && 'mr-3',
              size === 'base' && 'mr-2',
              size === 'sm' && 'mr-1',
            ])}
          >
            <LeftIcon
              className={cn('text-base', leftIconClassName)}
              size='1em'
            />
          </div>
        ) : null}
        {children}
        {RightIcon ? (
          <div
            className={cn([
              size === 'lg' && 'ml-3',
              size === 'base' && 'ml-2',
              size === 'sm' && 'ml-1',
            ])}
          >
            <RightIcon
              className={cn('text-base', rightIconClassName)}
              size='1em'
            />
          </div>
        ) : null}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button };
