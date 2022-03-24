import React, { ReactElement } from 'react';
import { Link, LinkProps, LinkGetProps } from '@reach/router';
import classNames from 'classnames';

interface IProps extends React.PropsWithoutRef<LinkProps<Record<string, unknown>>>, React.RefAttributes<HTMLAnchorElement> {
  shouldUseActiveStyles?: boolean;
  activeClassName?: string;
}

function NavLink(props: IProps): ReactElement {
  const { shouldUseActiveStyles = true, activeClassName, ...restProps } = props;

  const getProps = (linkGetProps: LinkGetProps) => (
    !shouldUseActiveStyles || !linkGetProps.isCurrent
      ? {}
      : { className: classNames(props.className, activeClassName) }
  );

  return (
    <Link
      {...restProps}
      getProps={getProps}
    />
  );
}

export default NavLink;
