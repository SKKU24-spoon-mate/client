import React from 'react';

import { RecoilRoot } from 'recoil';

import ReactDOM from 'react-dom/client';

import AppRenderer from '@pages';

localStorage.setItem('debug', '*');

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.Fragment>
    <RecoilRoot>
      <AppRenderer />
    </RecoilRoot>
  </React.Fragment>,
);
