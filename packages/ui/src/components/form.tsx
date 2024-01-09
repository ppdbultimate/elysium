import type { UseFormProps } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

export type FormProps = {
  formOptions?: UseFormProps;
  onSubmit: (
    data: unknown extends Record<string, unknown>
      ? Record<string, unknown>
      : unknown,
  ) => void;
} & Omit<React.ComponentPropsWithoutRef<'form'>, 'onSubmit'>;

const Form = ({ children, formOptions, onSubmit, ...rest }: FormProps) => {
  const methods = useForm({
    mode: 'onTouched',
    ...formOptions,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
};
Form.displayName = 'Form';

export { Form };
