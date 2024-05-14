import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import * as React from 'react';
import cn from '@/lib/classnames';
import { UnstyledLink } from '@/components/unstyled-link';
import { Typography } from '@/components/typography';
import { IconButton } from '@/components/icon-button';

export type TNavigation = {
  name: string;
  href: string;
  icon?: LucideIcon;
  /**
   * Use this when the route is also used as a nested route
   * @example Use exactMatch for '/dashboard' to avoid both navigation links active when visiting '/dashboard/edit'
   */
  exactMatch?: boolean;
  children?: TNavigation[];
  permission?: string[];
};

export type TGroupNavigation = {
  name: string;
  navigations: TNavigation[];
};

export type NavigationProps = {
  groupNavs: TGroupNavigation[];
} & React.ComponentPropsWithoutRef<'nav'>;

const Navigation = ({ className, groupNavs, ...rest }: NavigationProps) => {
  return (
    <nav className={className} {...rest}>
      <Accordion.Root
        className='divide-y divide-typo-divider'
        defaultValue={groupNavs.map((group) => group.name)}
        type='multiple'
      >
        {groupNavs.map((group) => (
          <Accordion.Item className='py-5' key={group.name} value={group.name}>
            <Accordion.Header>
              <Accordion.Trigger asChild className='transition-all group'>
                <div className='flex items-center'>
                  <Typography
                    className='flex-grow truncate font-semibold uppercase tracking-[1px]'
                    color='secondary'
                    font='averta'
                    variant='s4'
                  >
                    {group.name}
                  </Typography>
                  <IconButton
                    className='group-data-[state=open]:hidden'
                    icon={Plus}
                    size='xs'
                    variant='outline'
                  />
                  <IconButton
                    className='group-data-[state=closed]:hidden'
                    icon={Minus}
                    size='xs'
                    variant='outline'
                  />
                </div>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content
              className={cn(
                'mt-4 space-y-1.5 overflow-hidden',
                'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
              )}
            >
              {group.navigations.map((nav) =>
                nav.children ? (
                  <NestedNavigation key={nav.name} navigation={nav} />
                ) : (
                  <NavigationLink key={nav.name} navigation={nav} />
                ),
              )}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </nav>
  );
};
Navigation.displayName = 'Navigation';

function NestedNavigation({
  navigation: navChildren,
}: {
  navigation: TNavigation;
}) {
  const router = useRouter();

  // Recursively check if any children is active
  function checkActive(nav?: TNavigation[]): boolean {
    if (!nav) return false;

    return nav.some((n) => {
      if (!n.children) {
        const isActive = n.exactMatch
          ? router.pathname === n.href
          : router.pathname.startsWith(n.href);

        return isActive;
      }

      return checkActive(n.children);
    });
  }

  const defaultValue = checkActive(navChildren.children)
    ? navChildren.name
    : '';

  return (
    <Accordion.Root collapsible defaultValue={defaultValue} type='single'>
      <Accordion.Item value={navChildren.name}>
        <Accordion.Header>
          <Accordion.Trigger
            className={clsx(
              'hover:bg-typo-divider hover:text-primary-500',
              'text-typo-primary',
              'flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500  focus-visible:ring-offset-primary-500',
              'transition duration-100',
              'font-averta',
              'group transition-all',
            )}
          >
            {navChildren.icon ? (
              <navChildren.icon
                aria-hidden='true'
                className={clsx(
                  'mr-1.5 flex-shrink-0',
                  'text-typo-secondary',
                  'group-data-[state=open]:mt-[1px] group-data-[state=open]:self-start',
                )}
                size={18}
              />
            ) : null}
            <span
              className={clsx(
                'text-left',
                'group-data-[state=closed]:truncate',
              )}
            >
              {navChildren.name}
            </span>
            <ChevronDown
              className={clsx(
                'flex-shrink-0',
                'ml-auto text-typo-secondary',
                'group-data-[state=open]:mt-[1px] group-data-[state=open]:rotate-180 group-data-[state=open]:self-start',
              )}
              size={18}
            />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content
          className={cn(
            'mt-1 space-y-0.5 ml-7 overflow-hidden',
            'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
          )}
        >
          {navChildren.children?.map((nav, i) => (
            <div
              className={cn([
                'relative',

                //* horizontal line
                "before:absolute before:bg-typo-divider before:content-['']",
                'before:-left-3',
                // hack for nested navigation
                nav.children
                  ? 'before:top-[18px]'
                  : 'before:top-1/2 before:-translate-y-1/2',
                'before:h-px before:w-3',

                //* vertical line
                "after:absolute after:bg-typo-divider after:content-['']",
                'after:-left-3 after:top-1/2 after:-translate-y-1/2',
                'after:h-[calc(100%+4px)] after:w-px',
                // last child
                i === (navChildren.children?.length ?? 0) - 1 && [
                  nav.children ? 'after:h-[22px]' : 'after:h-[calc(50%+4px)]',
                  'after:top-0 after:-translate-y-1',
                ],
              ])}
              key={nav.name}
            >
              {nav.children ? (
                <NestedNavigation navigation={nav} />
              ) : (
                <NavigationLink navigation={nav} />
              )}
            </div>
          ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

function NavigationLink({
  navigation,
  className,
}: {
  navigation: TNavigation;
  className?: string;
}) {
  const router = useRouter();

  const linkRef = React.useRef<HTMLAnchorElement | null>(null);

  const isActive = navigation.exactMatch
    ? router.pathname === navigation.href
    : router.pathname.startsWith(navigation.href);

  React.useEffect(() => {
    isActive && linkRef.current?.scrollIntoView({ block: 'center' });
  }, [isActive]);

  return (
    <UnstyledLink
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        isActive
          ? 'bg-primary-100 text-primary-500'
          : 'text-typo-primary hover:bg-typo-divider hover:text-primary-500',
        'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-primary-500',
        'transition duration-100',
        'font-averta',
        className,
      )}
      href={navigation.href}
      ref={linkRef}
    >
      {navigation.icon ? (
        <navigation.icon
          aria-hidden='true'
          className={clsx(['mr-1.5 flex-shrink-0', 'text-typo-secondary'])}
          size={18}
        />
      ) : null}
      <span className={clsx([!isActive && 'truncate'])}>{navigation.name}</span>
    </UnstyledLink>
  );
}

export { Navigation };
