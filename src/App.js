import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import DataSection from './datasection';
import Header from './header'
import Footer from './footer'

function App() {
  return (
    <div className="App">
      <div className = "mainData">

        <Router basename = "/covid19/">
          <Header/>
          <Switch>
            <DataSection/>
          </Switch>
        </Router>
        <Footer/>

      </div>
      
    </div>
  );
}

export default App;
