import React from 'react';
import logo from './logo.svg';
import './App.css';
import {request} from 'request';
import Layout from './components/Layout';
import Main from './components/Main';

// const s = require('request');


// s('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bqgqrufrh5r8lcmqasig', { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
// });

function App() {
  return (
      <div>
        <Layout />
        <Main />
      </div>
  );
}

export default App;
