import React, { ReactElement } from 'react';
import { Field, FormikTouched } from "formik";
import './styles.scss';

interface IProps {
  type: 'text' | 'number';
  name: string;
  placeholder: string;
  touched?: boolean | FormikTouched<unknown> | FormikTouched<unknown>[];
  helperText?: string;
}

function Input({ type, name, placeholder, touched, helperText }: IProps): ReactElement {
  return (
    <div className='input-container'>
      <Field type={type} name={name} className='input-container_input' placeholder={placeholder} />
      <div className='input-container_helper-text-container'>{helperText}</div>
    </div>
  );
}

export default Input;
