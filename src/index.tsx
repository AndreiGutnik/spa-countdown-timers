import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import './tailwind.css';
import { theme } from '@/Theme';
import { App } from '@/components/App';
import TimersProvider from '@/contexts/timers/Provider';

const isDev = process.env.NODE_ENV === 'development';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TimersProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </TimersProvider>
  </React.StrictMode>
);
