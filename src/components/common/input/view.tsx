import React, { ReactElement } from 'react';
import { Field } from "formik";
import './styles.scss';

interface IProps {
  type: 'text' | 'number';
  name: string;
  placeholder: string;
}

function Input({ type, name, placeholder }: IProps): ReactElement {
  return (
    <Field type={type} name={name} className='input' placeholder={placeholder} />
  );
}

export default Input;
