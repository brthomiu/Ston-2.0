import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { WrappedApp } from './App';
import './index.css';

const clientId = 'zrjv3UYuMCUFldUhqKEcNLSc90klWwbA';
const domain = 'dev-zwqft2uf5ljg5rdt.us.auth0.com';

// const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
// const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;
// const audience = import.meta.env.VITE_AUTH0_AUDIENCE as string;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <WrappedApp />
    </Auth0Provider>
  </React.StrictMode>
);
