import React from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route
} from "react-router-dom";

import Landing from "./pages/Landing";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Browse from "./pages/Browse";

import About from "./pages/pcomponents/About";
import Files from "./pages/pcomponents/Files";
import Gallery from "./pages/pcomponents/Gallery";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route> 
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/browse">
            <Browse />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/files">
            <Files />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
