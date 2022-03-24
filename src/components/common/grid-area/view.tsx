import React, { ReactElement, ReactNode } from 'react';
import './styles.scss';

interface IProps {
  rows: number;
  columns: number;
  children: ReactNode;
}

function GridArea({ rows, columns, children }: IProps): ReactElement {
  return (
    <div className='grid-area' style={{ gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {children}
    </div>
  );
}

export default GridArea;
