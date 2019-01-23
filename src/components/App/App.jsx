import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Route path="/" component={Layout} />
  </BrowserRouter>
);

export default App;
