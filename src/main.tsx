import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BoardContextProvider } from './contexts/BoardContext.tsx';
import { ClockContextProvider } from './contexts/ClockContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClockContextProvider>
      <BoardContextProvider>
        <App />
      </BoardContextProvider>
    </ClockContextProvider>
  </StrictMode>,
);
