import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// the order of style import matters!!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import './index.css';
import App from './App';
import { AuthProviderWrapper } from './context/AuthContext';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
