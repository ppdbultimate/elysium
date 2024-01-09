import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { Typography } from '@/components/typography';

export type PasswordInputProps = {
  /** Input label */
  label: string | null;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

const PasswordInput = ({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  hideError,
  validation,
  disabled,
  containerClassName,
  ...rest
}: PasswordInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[id] || null;
  const withLabel = label !== null;

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={containerClassName}>
      {withLabel ? (
        <Typography as='label' className='block' htmlFor={id} variant='s3'>
          {label}
        </Typography>
      ) : null}
      <div className={clsx('relative', withLabel && 'mt-1')}>
        <input
          {...register(id, validation)}
          {...rest}
          aria-describedby={id}
          className={clsx(
            'flex w-full rounded-lg shadow-sm',
            'min-h-[2.25rem] py-0 md:min-h-[2.5rem]',
            'pr-10',
            'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
            (readOnly || disabled) &&
              'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          )}
          disabled={disabled}
          id={id}
          name={id}
          placeholder={placeholder}
          readOnly={readOnly}
          type={showPassword ? 'text' : 'password'}
        />

        <button
          className='absolute right-0 top-1/2 mr-3 flex -translate-y-1/2 items-center rounded-lg p-1 focus:outline-none focus:ring focus:ring-primary-500'
          onClick={togglePassword}
          type='button'
        >
          {showPassword ? (
            <EyeOff
              className='cursor-pointer text-typo-icons hover:text-typo-secondary'
              size={20}
            />
          ) : (
            <Eye
              className='cursor-pointer text-typo-icons hover:text-typo-secondary'
              size={20}
            />
          )}
        </button>
      </div>
      {helperText ? (
        <Typography className='mt-1' color='secondary' variant='c1'>
          {helperText}
        </Typography>
      ) : null}
      {!hideError && error ? (
        <Typography className='mt-1' color='danger' variant='c1'>
          {error.message?.toString()}
        </Typography>
      ) : null}
    </div>
  );
};
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
