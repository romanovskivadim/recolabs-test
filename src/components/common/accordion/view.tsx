import React, { ReactElement, ReactNode, useState } from 'react';
import icon from '@/assets/images/accordion-icon.svg';
import './styles.scss';

interface IProps {
  title: string;
  children: ReactNode;
}

function Accordion({ title, children }: IProps): ReactElement {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='accordion'>
      <div className='accordion_title-container' onClick={() => setIsOpen(!isOpen)}>
        <div className='accordion_img-container'>
          <img src={icon} alt=">" className={`accordion_img ${isOpen ? "accordion_img-open" : ""}`} />
        </div>
        <div className='accordion_title'>{title}</div>
      </div>
      <div className={`accordion_container ${isOpen ? "accordion_open" : ""}`}>
        {children}
      </div>
    </div>
  );
}

export default Accordion;
