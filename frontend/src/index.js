import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from './Auth/auth0-provider-with-history';

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory
      domain='dev-eigcmqux.us.auth0.com'
      clientId='wg3wFTY6pRM0vF2A3bMnbn4E7Jri4TAD'
      redirectUri={window.location.origin}
      audience='https://dev-eigcmqux.us.auth0.com/api/v2/'
      scope='read:current_user update:current_user_metadata'
    >
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
