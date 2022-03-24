import React, { ReactElement, ReactNode } from 'react';

import { Header } from '@/components/common';
import './styles.scss';

interface IProps {
  children: ReactNode;
}

function Layout({ children }: IProps): ReactElement {
  return (
    <div className='main-layout'>
      <Header />
      <div className='main-layout_inner'>
        {children}
      </div>
    </div>
  );
}

export default Layout;
