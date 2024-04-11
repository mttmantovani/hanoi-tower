import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter.tsx';
import { NumberOfDisksProvider } from './context/NumberOfDisksContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <NumberOfDisksProvider>
        <AppRouter />
      </NumberOfDisksProvider>
    </ThemeProvider>
  </React.StrictMode>
);
