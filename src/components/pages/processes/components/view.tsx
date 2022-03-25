import React, { ReactElement, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '@/services/api';

import {
  Accordion,
  Button,
  Input,
  Sidebar,
  TextArea,
} from '@/components/common';
import { API, FORM_ERROR_MESSAGES } from '@/consts';
import './styles.scss';

interface IFormValuesType {
  name: string,
  teams: string,
  domains: string,
  users: string,
  relatedTerms: string,
  description: string,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED),
  teams: Yup.string().test(
    'oneOfRequired',
    `${FORM_ERROR_MESSAGES.ONE_OF_REQUIRED}`,
    function () {
      return (this.parent.teams || this.parent.domains || this.parent.users || this.parent.relatedTerms)
    }
  ),
  domains: Yup.string().test(
    'oneOfRequired',
    `${FORM_ERROR_MESSAGES.ONE_OF_REQUIRED}`,
    function () {
      return (this.parent.teams || this.parent.domains || this.parent.users || this.parent.relatedTerms)
    }
  ),
  users: Yup.string().test(
    'oneOfRequired',
    `${FORM_ERROR_MESSAGES.ONE_OF_REQUIRED}`,
    function () {
      return (this.parent.teams || this.parent.domains || this.parent.users || this.parent.relatedTerms)
    }
  ),
  relatedTerms: Yup.string().test(
    'oneOfRequired',
    `${FORM_ERROR_MESSAGES.ONE_OF_REQUIRED}`,
    function () {
      return (this.parent.teams || this.parent.domains || this.parent.users || this.parent.relatedTerms)
    }
  ),
  description: Yup.string(),
});

interface IProps {
  getData: () => void;
  handleClose: () => void;
}

function ProcessesSidebar({ getData, handleClose }: IProps): ReactElement {

  const [formValues, setFormValues] = useState<IFormValuesType>({
    name: '',
    teams: '',
    domains: '',
    users: '',
    relatedTerms: '',
    description: '',
  });

  const createProcess = async (values: IFormValuesType) => {
    const newProcess = {
      'md': {
        'anchors': {
          'domains': values.domains.split(','),
          'relatedTerms': values.relatedTerms.split(','),
          'teams': values.teams.split(','),
          'users': values.users.split(','),
        },
        'description': values.description,
        'iconUrl': 'https://i.imgur.com/GptSzgL.png',
        'id': new Date().getMilliseconds().toString(),
        'name': values.name,
      },
    };

    try {
      await api.post(API.PROCESSES.GET_METADATA, newProcess);
      setFormValues({
        name: '',
        teams: '',
        domains: '',
        users: '',
        relatedTerms: '',
        description: '',
      });
      handleClose();
      getData();
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Sidebar handleClose={handleClose} title='Create New Proces'>
      <Formik
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          createProcess(values);
          setSubmitting(false);
        }}
        initialValues={formValues}
      >
        {({ handleSubmit, errors, touched, values }) => (
          <>
            <form onSubmit={handleSubmit} className='process-form'>
              <Input
                type='text'
                name='name'
                placeholder='Process Name (mandatory)'
                helperText={errors.name}
                touched={touched.name}
              />
              <div className='process-form-text'>
                Select one item from thie list below and provide us with
                the information we need in order to create your new process.
              </div>
              <div className='process-form-error-container'>
                {
                  touched.domains && errors.domains ||
                  touched.users && errors.users ||
                  touched.relatedTerms && errors.relatedTerms ||
                  touched.teams && errors.teams
                }
              </div>
              <Accordion title='Relevant user groups'>
                <TextArea
                  name='teams'
                  placeholder='Add at least 2 of the user groups associated with this process, separated by commas'
                />
              </Accordion>
              <Accordion title='Relevant domains'>
                <TextArea
                  name='domains'
                  placeholder='Add at least 2 outside Domains (3rd-Paries) associated with this process, separated by commas'
                />
              </Accordion>
              <Accordion title='Relevant usernames'>
                <TextArea
                  name='users'
                  placeholder='Add at least one username associated with this process, separated by commas'
                />
              </Accordion>
              <Accordion title='Related terms'>
                <TextArea
                  name='relatedTerms'
                  placeholder='Add at least 2 related terms associated with this process, separated by commas'
                />
              </Accordion>
              <TextArea
                name='description'
                placeholder='Process Description (Optional)'
              />
              <div className='process-form-btn-container'>
                <Button
                  disabled={Boolean(Object.values(errors).length) || Boolean(!values.name)}
                  noRadius
                  handleClick={handleSubmit}
                  text='Save'
                />
              </div>
            </form>
          </>
        )}
      </Formik>
    </Sidebar>
  );
}

export default ProcessesSidebar;
