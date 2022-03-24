import React, { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '@/services/api';

import {
  Accordion,
  Button,
  Card,
  GridArea,
  Head,
  Input,
  PageHeader,
  Sidebar,
  StandartTitle,
  TextArea,
} from '@/components/common';
import processesLogo from '@/assets/images/processes-black.svg';
import { API, FORM_ERROR_MESSAGES } from '@/consts';
import { IMDSProcesses } from '@/models';
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

function Processes(props: RouteComponentProps): ReactElement {

  const [processesData, setProcessesData] = useState<IMDSProcesses[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const [formValues, setFormValues] = useState<IFormValuesType>({
    name: '',
    teams: '',
    domains: '',
    users: '',
    relatedTerms: '',
    description: '',
  });

  const getData = async () => {
    try {
      const result = await api.get<{ mds: IMDSProcesses[] }>(API.PROCESSES.GET_METADATA);
      setProcessesData(result.data.mds);
    } catch (e) {
      console.error(e)
    }
  }

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
      'reportStatus': [
        {
          'processId': 'processId',
          'status': 'REPORT_GENERATION_STATUS_UNSPECIFIED',
          'timeRemaining': 'timeRemaining'
        },
        {
          'processId': 'processId',
          'status': 'REPORT_GENERATION_STATUS_UNSPECIFIED',
          'timeRemaining': 'timeRemaining'
        }
      ]
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
      setIsOpen(false);
      getData();
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <Head
        title='Home Page'
        description='General content about the site'
      />
      <main>
        {isOpen && (
          <Sidebar handleClose={() => setIsOpen(false)} title='Create New Proces'>
            <Formik
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                createProcess(values);
                setSubmitting(false);
              }}
              initialValues={formValues}
            >
              {({ handleSubmit, errors, touched }) => (
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
                      {errors.domains || errors.name || errors.relatedTerms || errors.teams}
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
                        disabled={Boolean(Object.values(errors).length)}
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
        )}
        <PageHeader title='Process Library' icon={processesLogo} />
        <section className='processes-page'>
          <div className='processes-page_content-container'>
            <div className='processes-page_title-container'>
              <StandartTitle text='My processes' />
            </div>
            <div className='processes-page_top'>
              <GridArea rows={Math.ceil(processesData.length / 3)} columns={3}>
                {processesData.map((item) => (
                  <div key={`${new Date().getMilliseconds()}${Math.random()}`}>
                    <Card title={item?.name} text={item?.description} icon={item?.iconUrl} />
                  </div>
                ))}
              </GridArea>
            </div>
          </div>
          <div className='processes-page_right'>
            <div className='processes-page_right-btn'>
              <Button text='Create new' handleClick={() => setIsOpen(true)} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Processes;
