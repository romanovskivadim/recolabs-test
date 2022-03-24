import React, { ReactElement } from 'react';
import './styles.scss';

interface IProps {
  text: string;
  handleClick?: () => void;
}

function Button({ text, handleClick }: IProps): ReactElement {
  return (
    <button className='button' onClick={handleClick}>
      <span className='button_text'>{text}</span>
    </button>
  );
}

export default Button;
