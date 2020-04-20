import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import DataSection from './datasection';

function App() {
  return (
    <div className="App">
      <div className = "mainData">
        <Router>
          <DataSection/>
        </Router>
      </div>
      
    </div>
  );
}

export default App;
