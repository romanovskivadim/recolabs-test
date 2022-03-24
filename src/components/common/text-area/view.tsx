import React, { ReactElement } from 'react';
import { Field } from "formik";
import './styles.scss';

interface IProps {
  name: string;
  placeholder: string;
}

function TextArea({ name, placeholder }: IProps): ReactElement {
  return (
    <Field type='text' name={name} className='textarea' placeholder={placeholder} as='textarea' />
  );
}

export default TextArea;
