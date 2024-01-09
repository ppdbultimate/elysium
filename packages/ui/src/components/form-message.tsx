import * as React from 'react';
import { get, useFormState } from 'react-hook-form';
import { Typography } from '@/components/typography';
import type { ExtractProps } from '@/types/helper';

export type FormMessageProps = {
  id: string;
} & Omit<ExtractProps<typeof Typography>, 'children'>;

const FormMessage = ({ id, className, ...rest }: FormMessageProps) => {
  const { errors } = useFormState();
  const error = get(errors, id);

  return (
    <Typography className={className} color='danger' variant='c1' {...rest}>
      {error?.message?.toString()}
    </Typography>
  );
};
FormMessage.displayName = 'FormMessage';

export { FormMessage };
