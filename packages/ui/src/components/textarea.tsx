import clsx from 'clsx';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import get from 'lodash.get';
import { Typography } from '@/components/typography';

export type TextareaProps = {
  label: string | null;
  id: string;
  placeholder?: string;
  helperText?: string;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'textarea'>;

const Textarea = ({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  hideError = false,
  validation,
  disabled,
  containerClassName,
  ...rest
}: TextareaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;

  return (
    <div className={containerClassName}>
      {withLabel ? (
        <Typography as='label' className='block' htmlFor={id} variant='s3'>
          {label}
        </Typography>
      ) : null}
      <div className={clsx('relative', withLabel && 'mt-1')}>
        <textarea
          {...register(id, validation)}
          rows={3}
          {...rest}
          aria-describedby={id}
          className={clsx(
            'block w-full rounded-lg shadow-sm',
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
        />
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
Textarea.displayName = 'Textarea';

export { Textarea };
