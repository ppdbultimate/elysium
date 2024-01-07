import type { LinkProps } from 'next/link';
import Link from 'next/link';
import * as React from 'react';
import cn from '@/lib/classnames';

export type UnstyledLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  nextLinkProps?: Omit<LinkProps, 'href'>;
} & React.ComponentPropsWithRef<'a'>;

const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, href, openNewTab, className, nextLinkProps, ...rest }, ref) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith('/') && !href.startsWith('#');

    if (!isNewTab) {
      return (
        <Link
          className={className}
          href={href}
          ref={ref}
          {...rest}
          {...nextLinkProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        ref={ref}
        rel='noopener noreferrer'
        target='_blank'
        {...rest}
        className={cn('cursor-newtab', className)}
      >
        {children}
      </a>
    );
  },
);
UnstyledLink.displayName = 'UnstyledLink';

export { UnstyledLink };
