import React, { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik } from "formik";
import * as Yup from "yup";

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
import processes from '@/mock-files/processes.json';
import processesLogo from '@/assets/images/processes-black.svg';
import './styles.scss';
import api from '@/services/api';
import { API, FORM_ERROR_MESSAGES } from '@/consts';
import { IMDSProcesses } from '@/models';

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
});

function Processes(props: RouteComponentProps): ReactElement {

  const [processesData, setProcessesData] = useState<IMDSProcesses[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const formValues = {
    name: '',
    teams: '',
    domains: '',
    users: '',
    relatedTerms: '',
    description: '',
  };

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
      "md": {
        "anchors": {
          "domains": values.domains.split(','),
          "relatedTerms": values.relatedTerms.split(','),
          "teams": values.teams.split(','),
          "users": values.users.split(','),
        },
        "description": values.description,
        "iconUrl": "https://i.imgur.com/GptSzgL.png",
        "id": new Date().getMilliseconds().toString(),
        "name": values.name,
      },
      "reportStatus": [
        {
          "processId": "processId",
          "status": "REPORT_GENERATION_STATUS_UNSPECIFIED",
          "timeRemaining": "timeRemaining"
        },
        {
          "processId": "processId",
          "status": "REPORT_GENERATION_STATUS_UNSPECIFIED",
          "timeRemaining": "timeRemaining"
        }
      ]
    };

    try {
      await api.post(API.PROCESSES.GET_METADATA, newProcess);
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
        title="Home Page"
        description="General content about the site"
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
              {({ handleSubmit }) => (
                <>
                  <form onSubmit={handleSubmit} className='process-form'>
                    <Input type="text" name="name" placeholder='Process Name (mandatory)' />
                    <div className='process-form-text'>
                      Select one item from thie list below and provide us with
                      the information we need in order to create your new process.
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
                        placeholder='Domains'
                      />
                    </Accordion>
                    <Accordion title='Relevant usernames'>
                      <TextArea
                        name='users'
                        placeholder='Users'
                      />
                    </Accordion>
                    <Accordion title='Related terms'>
                      <TextArea
                        name='relatedTerms'
                        placeholder='Related terms'
                      />
                    </Accordion>
                    <TextArea
                      name='description'
                      placeholder='Process Description (Optional)'
                    />
                    <div className='process-form-btn-container'>
                      <Button handleClick={handleSubmit} text='Save' />
                    </div>
                  </form>
                </>
              )}
            </Formik>
          </Sidebar>
        )}
        <PageHeader title='Process Library' icon={processesLogo} />
        <section className="processes-page">
          <div className='processes-page_content-container'>
            <div className='processes-page_title-container'>
              <StandartTitle text='My processes' />
            </div>
            <div className='processes-page_top'>
              <GridArea rows={Math.ceil(processes.length / 3)} columns={3}>
                {processesData.map((item) => (
                  <Card title={item?.name} text={item?.description} icon={item?.iconUrl} />
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