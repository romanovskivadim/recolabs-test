import React, { ReactElement } from 'react';
import { Router, Redirect } from '@reach/router';

import { Head } from '@/components/common';
import { Processes } from '@/components/pages';
import { Layout } from './layouts';

function App(): ReactElement {
  return (
    <div className="theme-light">
      <Head isInitial />

      <Layout>
        <Router>
          <Redirect from="/" to="/processes" noThrow />
          <Processes path="/processes" />
        </Router>
      </Layout>
    </div>
  );
}

export default App;
