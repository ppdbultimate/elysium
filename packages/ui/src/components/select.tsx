import type { RegisterOptions } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import type { MultiValue, StylesConfig } from 'react-select';
import ReactSelect, { components } from 'react-select';
import { ChevronDown, X } from 'lucide-react';
import type { ExtractProps } from '@/types/helper';
import { Typography } from '@/components/typography';
import cn from '@/lib/classnames';

export type SelectProps = {
  label: string | null;
  id: string;
  placeholder?: React.ReactNode;
  helperText?: string;
  type?: string;
  isMulti?: boolean;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
  options: { value: string; label: string }[];
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'select'> &
  ExtractProps<ReactSelect>;

const Select = ({
  disabled,
  readOnly,
  label,
  helperText,
  id,
  isMulti = false,
  placeholder,
  validation,
  options,
  hideError = false,
  containerClassName,
  ...rest
}: SelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[id] || null;

  const withLabel = label !== null;

  //#region  //*=========== Styles ===========
  const customStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      // red-500 and gray-300
      border: `1px solid ${error ? '#EF4444' : '#D1D5DB'}`,
      '&:hover': {
        border: `1px solid ${error ? '#EF4444' : '#D1D5DB'}`,
      },
      boxShadow: 'none',
      transition: 'none',
      '&:focus-within': {
        border: `1px solid ${error ? '#EF4444' : 'var(--color-primary-500)'}`,
        boxShadow: `0 0 0 1px ${
          error ? '#EF4444' : 'var(--color-primary-500)'
        }`,
      },
      '*': {
        boxShadow: 'none !important',
      },
      borderRadius: '0.5rem',
      padding: '0 0.75rem',
      background: disabled || readOnly ? '#F3F4F6' : undefined,
      cursor: 'pointer',
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
      gap: '0.5rem',
    }),
    input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      caretColor: 'var(--color-primary-500)',
      color: '#1F201d',
      '::placeholder': {
        color: '#5a5d56',
      },
    }),
    singleValue: (styles) => ({
      ...styles,
      color: 'inherit',
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      '&>div': {
        padding: 0,
      },
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: '#878787',
      '&:hover': {
        color: '#878787',
      },
    }),
    option: (styles, state) => ({
      ...styles,
      color: 'black',
      background: state.isFocused
        ? 'var(--color-primary-50)'
        : state.isSelected
          ? 'var(--color-primary-100)'
          : 'white',
      ':hover': {
        background: '#E5E7EB',
      },
      cursor: 'pointer',
    }),
    multiValue: (styles) => ({
      ...styles,
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      background: 'var(--color-primary-100)',
      borderRadius: '0.375rem',
      padding: '0.25rem 0.75rem',
      margin: 0,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--color-primary-700)',
      padding: 0,
      paddingLeft: 0,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: 'var(--color-primary-700)',
      padding: 0,
      paddingLeft: '0.5rem',
      '&:hover': {
        color: 'var(--color-primary-700)',
        backgroundColor: 'transparent',
      },
    }),
    menu: (styles) => ({
      ...styles,
      borderRadius: '0.5rem',
      overflow: 'hidden',
    }),
  };

  //#endregion  //*======== Styles ===========

  return (
    <div className={containerClassName}>
      {withLabel ? (
        <Typography as='label' className='block' htmlFor={id} variant='s3'>
          {label}
        </Typography>
      ) : null}
      <div
        className={cn(
          'relative',
          withLabel && 'mt-1',
          (disabled || readOnly) && 'cursor-not-allowed',
        )}
      >
        <Controller
          control={control}
          name={id}
          render={({ field }) => {
            return (
              <ReactSelect
                {...field}
                classNames={{
                  control: () => '!min-h-[2.25rem] md:!min-h-[2.5rem]',
                }}
                closeMenuOnSelect={!isMulti}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: (props) => (
                    <components.DropdownIndicator {...props}>
                      <ChevronDown size={18} />
                    </components.DropdownIndicator>
                  ),
                  ClearIndicator: (props) => (
                    <components.ClearIndicator {...props}>
                      <X
                        className='mr-0.5 text-typo-icons hover:text-typo-secondary'
                        size={18}
                      />
                    </components.ClearIndicator>
                  ),
                  MultiValueRemove: (props) => (
                    <components.MultiValueRemove {...props}>
                      <X size={18} />
                    </components.MultiValueRemove>
                  ),
                }}
                inputId={id}
                isClearable
                isDisabled={disabled || readOnly}
                isMulti={isMulti}
                onChange={(selectedOptions) => {
                  isMulti
                    ? field.onChange(
                        (
                          selectedOptions as MultiValue<
                            (typeof options)[number]
                          >
                        )
                          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                          .map((option) => option?.value ?? ''),
                      )
                    : field.onChange(selectedOptions?.value ?? '');
                }}
                options={options}
                placeholder={placeholder}
                styles={customStyles}
                value={
                  //? null is needed so if the selected value is not found in the options, it will clear the value
                  isMulti
                    ? field.value?.map(
                        (value: unknown) =>
                          options.find((option) => option.value === value) ??
                          null,
                      )
                    : options.find((opt) => opt.value === field.value) ?? null
                }
                {...rest}
              />
            );
          }}
          rules={validation}
        />
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
    </div>
  );
};
Select.displayName = 'Select';

export { Select };
