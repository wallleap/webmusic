import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/app.css'


import Top from './components/top/top'
import Content from './components/content/content'


ReactDOM.render(
  <div id="app">
    <Top/>
    <Content/>
  </div>,
  document.getElementById('root')
)