import * as React from 'react';
import type { UnstyledLinkProps } from '@/components/unstyled-link';
import { UnstyledLink } from '@/components/unstyled-link';
import cn from '@/lib/classnames';

const UnderlineLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          'animated-underline custom-link inline-flex items-center font-medium',
          'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'border-b border-dotted border-dark hover:border-black/0',
          className,
        )}
      >
        {children}
      </UnstyledLink>
    );
  },
);
UnderlineLink.displayName = 'UnderlineLink';

export { UnderlineLink };
