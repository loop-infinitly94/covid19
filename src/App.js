import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import DataSection from './datasection';
import RssSection from './rsssection';

function App() {
  return (
    <div className="App">
      <Router>
        <DataSection/>
      </Router>
      <RssSection/>
    </div>
  );
}

export default App;
