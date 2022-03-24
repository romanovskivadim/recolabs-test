import React, { ReactElement } from 'react';
import './styles.scss';

interface IProps {
  text: string;
}

function StandartTitle({ text }: IProps): ReactElement {
  return (
    <div className='standart-title'>
      {text}
    </div>
  );
}

export default StandartTitle;
