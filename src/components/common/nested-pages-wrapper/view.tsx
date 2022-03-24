import { PropsWithChildren, ReactElement } from 'react';
import { RouteComponentProps } from '@reach/router';

function NestedPagesWrapper(props: PropsWithChildren<RouteComponentProps>): ReactElement {
  return props.children as ReactElement;
}

export default NestedPagesWrapper;
