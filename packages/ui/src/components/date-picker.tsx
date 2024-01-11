import clsx from 'clsx';
import idLocale from 'date-fns/locale/id';
import type { ReactDatePickerProps } from 'react-datepicker';
import ReactDatePicker from 'react-datepicker';
import type { RegisterOptions } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';
import { Typography } from '@/components/typography';
import cn from '@/lib/classnames';

export type DatePickerProps = {
  validation?: RegisterOptions;
  label: string | null;
  id: string;
  placeholder?: string;
  defaultYear?: number;
  defaultMonth?: number;
  defaultValue?: string;
  helperText?: string;
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  containerClassName?: string;
} & Omit<ReactDatePickerProps, 'onChange'>;

const DatePicker = ({
  validation,
  label,
  id,
  placeholder,
  defaultYear,
  defaultMonth,
  defaultValue,
  helperText,
  readOnly = false,
  hideError = false,
  disabled,
  containerClassName,
  ...rest
}: DatePickerProps) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = errors[id] || null;
  const withLabel = label !== null;

  // If there is a year default, then change the year to the props
  const defaultDate = new Date();
  if (defaultYear) defaultDate.setFullYear(defaultYear);
  if (defaultMonth) defaultDate.setMonth(defaultMonth);

  /**
   * @see https://github.com/prismicio/prismic-next/pull/79/files
   *
   * TODO: Remove once https://github.com/vercel/next.js/issues/52216 is resolved.
   */
  let ResolvedReactDatePicker = ReactDatePicker;
  if ('default' in ResolvedReactDatePicker) {
    ResolvedReactDatePicker = (
      ResolvedReactDatePicker as unknown as { default: typeof ReactDatePicker }
    ).default;
  }

  return (
    <div className={cn('relative', containerClassName)}>
      {withLabel ? (
        <Typography as='label' className='block' htmlFor={id} variant='s3'>
          {label}
        </Typography>
      ) : null}

      <Controller
        control={control}
        defaultValue={defaultValue}
        name={id}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div className={clsx('relative', withLabel && 'mt-1')}>
              <ResolvedReactDatePicker
                aria-describedby={id}
                className={clsx(
                  'flex w-full rounded-lg shadow-sm',
                  'min-h-[2.25rem] py-0 md:min-h-[2.5rem]',
                  'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
                  (readOnly || disabled) &&
                    'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
                  error &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
                dateFormat='dd/MM/yyyy'
                disabled={disabled}
                dropdownMode='select'
                locale={idLocale}
                name={id}
                onBlur={onBlur}
                onChange={onChange}
                openToDate={value ? new Date(value) : defaultDate}
                placeholderText={placeholder}
                portalId='datepicker-portal'
                readOnly={readOnly}
                selected={value ? new Date(value) : undefined}
                showMonthDropdown
                showYearDropdown
                // This is a workaround to fix the z-index issue
                {...rest}
              />
              <Calendar
                className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transform text-typo-icons'
                size={18}
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
          </>
        )}
        rules={validation}
      />
    </div>
  );
};
DatePicker.displayName = 'DatePicker';

export { DatePicker };
