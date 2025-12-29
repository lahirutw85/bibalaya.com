
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';


// Error logging helper
const logErrorToScreen = (error: any) => {
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.width = '100%';
  errorDiv.style.backgroundColor = 'red';
  errorDiv.style.color = 'white';
  errorDiv.style.zIndex = '9999';
  errorDiv.style.padding = '20px';
  errorDiv.style.whiteSpace = 'pre-wrap';
  errorDiv.innerText = `System Error:\n${error?.toString()}\n${error?.stack || ''}`;
  document.body.appendChild(errorDiv);
  console.error(error);
};

window.addEventListener('error', (event) => {
  logErrorToScreen(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  logErrorToScreen(event.reason);
});

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  );
} catch (e) {
  logErrorToScreen(e);
}