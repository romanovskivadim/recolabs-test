import React, { ReactElement } from 'react';
import rect from '@/assets/images/rect.svg';
import { StandartTitle } from '../standart-title';
import './styles.scss';

interface IProps {
  title: string;
  text: string;
  icon: string;
}

function Card({ title, text, icon }: IProps): ReactElement {
  return (
    <div className='card' key={`${new Date().getMilliseconds()}${Math.random()}`}>
      <img src={rect} className='card_rect' />
      <div className='card_back' />
      <div className='card_content'>
        <div className='card_header'>
          <div className='card_title'>
            <StandartTitle text={title} />
          </div>
          <div className='card_btn-container'>
            <div className='card_btn'>
              <img src={icon} alt={title} className='card_btn-img' />
            </div>
          </div>
        </div>
        <p className='card_text'>{text}</p>
      </div>
    </div>
  );
}

export default Card;
