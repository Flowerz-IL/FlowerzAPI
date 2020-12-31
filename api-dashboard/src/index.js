import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Fonts from './utils/fonts.constant';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
      box-sizing: inherit;
    }

    html {
      font-size: 62.5%;
    }

    body {
        margin: 0;
        font-family: ${Fonts.sanSerif}, sans-serif;
        font-weight: 400;
        box-sizing: border-box;
    }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

