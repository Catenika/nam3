import Link, { LinkProps } from 'next/link';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

export type UnstyledLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  scroll?: boolean;
  nextLinkProps?: Omit<LinkProps, 'href' | 'scroll'>;
} & React.ComponentPropsWithRef<'a'>;

const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, href, openNewTab, className, scroll, nextLinkProps, ...rest }, ref) => {
    const isNewTab = openNewTab !== undefined ? openNewTab : href && !href.startsWith('/') && !href.startsWith('#');

    if (!isNewTab) {
      return (
        <Link href={href} ref={ref} className={className} scroll={scroll} {...rest} {...nextLinkProps}>
          {children}
        </Link>
      );
    }

    return (
      <a
        className={clsxm('cursor-newtab', className)}
        ref={ref}
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        {...rest}
      >
        {children}
      </a>
    );
  },
);

export default UnstyledLink;
