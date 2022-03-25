import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import * as Yup from 'yup';
import api from '@/services/api';

import {
  Button,
  Card,
  GridArea,
  Head,
  PageHeader,
  StandartTitle,
} from '@/components/common';
import { ProcessesSidebar } from './components';
import processesLogo from '@/assets/images/processes-black.svg';
import { API, FORM_ERROR_MESSAGES } from '@/consts';
import { IMDSProcesses } from '@/models';
import './styles.scss';

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

  const openCloseSidebar = useCallback((value: boolean) => {
    setIsOpen(value);
  }, [isOpen]);

  const getData = async () => {
    try {
      const result = await api.get<{ mds: IMDSProcesses[] }>(API.PROCESSES.GET_METADATA);
      setProcessesData(result.data.mds);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head
        title='Home Page'
        description='General content about the site'
      />
      <main>
        {isOpen && (
          <ProcessesSidebar getData={getData} handleClose={() => openCloseSidebar(!isOpen)} />
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
              <Button text='Create new' handleClick={() => openCloseSidebar(true)} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Processes;
