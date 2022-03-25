import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import icon from '@/assets/images/accordion-icon.svg';
import './styles.scss';

interface IProps {
  title: string;
  children: ReactNode;
}

function Accordion({ title, children }: IProps): ReactElement {

  const [isOpen, setIsOpen] = useState(false);

  const container = useRef<HTMLDivElement>(null);
  const titleContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(this: HTMLElement, e: Event): void {
      if (
        isOpen &&
        container.current &&
        titleContainer.current &&
        !titleContainer.current.contains(e.target as HTMLDivElement) &&
        !container.current.contains(e.target as HTMLDivElement)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <div className='accordion'>
      <div className='accordion_title-container' onClick={() => setIsOpen(!isOpen)} ref={titleContainer}>
        <div className='accordion_img-container'>
          <img src={icon} alt='>' className={`accordion_img ${isOpen ? 'accordion_img-open' : ''}`} />
        </div>
        <div className='accordion_title'>{title}</div>
      </div>
      <div className={`accordion_container ${isOpen ? 'accordion_open' : ''}`} ref={container}>
        {children}
      </div>
    </div>
  );
}

export default Accordion;
