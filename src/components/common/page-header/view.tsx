import React, { ReactElement } from 'react';
import './styles.scss';

interface IProps {
  icon: string;
  title: string;
}

function PageHeader({ icon, title }: IProps): ReactElement {
  return (
    <div className='page-header'>
      <div className='page-header_left'>
        <div className='page-header_icon-container'>
          <img src={icon} alt={title} />
        </div>
        <div className='page-header_title'>
          {title}
        </div>
      </div>
      <div className='page-header_picker-container'>

      </div>
    </div>
  );
}

export default PageHeader;
