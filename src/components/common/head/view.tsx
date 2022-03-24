import React, { ReactElement, ReactNode } from 'react';
import { Helmet } from 'react-helmet';

interface IProps {
  isInitial?: boolean;
  title?: string;
  description?: string;
  children?: ReactNode;
}

function InitialHead(): ReactElement {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>React TypeScript Template</title>
      <meta name="description" content="Template for React with TypeScript" />
    </Helmet>
  );
}

function Head(props: IProps): ReactElement {
  if (props.isInitial) {
    return <InitialHead />;
  }

  return (
    <Helmet>
      {props.title && <title>{props.title}</title>}
      {props.description && <meta name="description" content={props.description} />}
      {props.children}
    </Helmet>
  );
}

export default Head;
