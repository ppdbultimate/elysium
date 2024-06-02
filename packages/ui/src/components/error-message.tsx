import * as React from 'react';
import { get, useFormState } from 'react-hook-form';
import type { ExtractProps } from '@/types/helper';
import { Typography } from '@/components/typography';

export type ErrorMessageProps = {
  id: string;
} & Omit<ExtractProps<typeof Typography>, 'children'>;

const ErrorMessage = ({ id, className, ...rest }: ErrorMessageProps) => {
  const { errors } = useFormState();
  const error = get(errors, id);

  return (
    <Typography className={className} color='danger' variant='c1' {...rest}>
      {error?.message?.toString()}
    </Typography>
  );
};
ErrorMessage.displayName = 'ErrorMessage';

export { ErrorMessage };
