import React, { ReactElement } from 'react';
import './styles.scss';

interface IProps {
  text: string;
  noRadius?: boolean;
  disabled?: boolean;
  handleClick?: () => void;
}

function Button({ text, noRadius, disabled, handleClick }: IProps): ReactElement {
  return (
    <button
      disabled={disabled}
      className={`button ${noRadius ? 'no-radius' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
    >
      <span className='button_text'>{text}</span>
    </button>
  );
}

export default Button;
