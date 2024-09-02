import { OpenInNew as OpenInNewIcon } from '@styled-icons/material/OpenInNew';
import React, { useMemo } from 'react';
import { NavLink as BaseNavLink, useLocation } from 'react-router-dom';

import classNames from '@staticcms/core/lib/util/classNames.util';
import { generateClassNames } from '@staticcms/core/lib/util/theming.util';
import { buttonClasses } from '../common/button/useButtonClassNames';

import type { FC, MouseEventHandler, ReactNode } from 'react';

import './NavLink.css';

export const classes = generateClassNames('NavLink', [
  'root',
  'link',
  'external',
  'external-content',
  'external-icon',
  'content',
  'icon',
  'label',
]);

export interface BaseNavLinkProps {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  'data-testid'?: string;
  onClick?: MouseEventHandler;
  order?: number;
}

export interface NavExternalLinkProps extends BaseNavLinkProps {
  href: string;
}

export interface NavInternalLinkProps extends BaseNavLinkProps {
  to: string;
}

export type NavLinkProps = NavExternalLinkProps | NavInternalLinkProps;

const NavLink: FC<NavLinkProps> = ({
  icon,
  children,
  className,
  'data-testid': dataTestId,
  onClick,
  order,
  ...otherProps
}) => {
  const content = useMemo(
    () => (
      <div className={classes.content}>
        <span className={classes.icon}>{icon}</span>
        <span className={classes.label}>{children}</span>
      </div>
    ),
    [children, icon],
  );

  const { pathname } = useLocation();

  if ('href' in otherProps) {
    return (
      <li className={classNames(classes.root, className)} style={{order}}>
        <a
          href={otherProps.href}
          target="_blank"
          rel="noreferrer"
          className={classNames(buttonClasses.root, buttonClasses['text-secondary'], classes.link)}
          data-testid={dataTestId}
          onClick={onClick}
        >
          <div className={classes.external}>
            <div className={classes['external-content']}>{content}</div>
            <OpenInNewIcon className={classes['external-icon']} />
          </div>
        </a>
      </li>
    );
  }

  return (
    <li className={classNames(classes.root, className)} style={{order}}>
      <BaseNavLink
        to={otherProps.to}
        className={classNames(
          buttonClasses.root,
          pathname === otherProps.to
            ? buttonClasses['contained-primary']
            : buttonClasses['text-secondary'],
          classes.link,
        )}
        data-testid={dataTestId}
        onClick={onClick}
      >
        {content}
      </BaseNavLink>
    </li>
  );
};

export default NavLink;
