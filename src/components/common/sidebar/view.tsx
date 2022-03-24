import React, { ReactElement, ReactNode } from 'react';
import bigRect from '@/assets/images/big-rect.svg';
import plus from '@/assets/images/plus-icon.svg';
import { StandartTitle } from '../standart-title';
import './styles.scss';

interface IProps {
  title: string;
  children: ReactNode;
  handleClose: () => void;
}

function Sidebar({ title, children, handleClose }: IProps): ReactElement {
  return (
    <div className='sidebar'>
      <div className='sidebar_inner'>
        <img src={bigRect} className='sidebar_rect' />
        <div className='sidebar_back' />
        <div className='sidebar_content'>
          <div className='sidebar_header'>
            <span className='sidebar_header-title'>
              <StandartTitle text={title} />
            </span>
            <div className='sidebar_btn-container'>
              <div className='sidebar_btn' onClick={handleClose}>
                <img src={plus} alt='+' className='sidebar_btn-img' />
              </div>
            </div>
          </div>
          <div className='sidebar_inner-content'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
