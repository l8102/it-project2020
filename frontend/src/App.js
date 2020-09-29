import React from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route
} from "react-router-dom";
import "./css/Portfolio.css";

// Import pages
import Landing from "./pages/Landing";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Browse from "./pages/Browse";

// Import page components
import About from "./pages/pcomponents/About";
import Files from "./pages/pcomponents/Files";
import EditGallery from "./pages/pcomponents/EditGallery";
import ViewGallery from './pages/pcomponents/ViewGallery';

import Tabs from "./pages/pcomponents/Tabs";

// Import components
import VisitorNavBar from "./components/VisitorNavBar";
import UserNavBar from "./components/UserNavBar";
import Footer from "./components/Footer";


// todo rewrite this in class notation
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <VisitorNavBar />
            <Landing />
          </Route> 
          <Route path="/portfolio">
            <UserNavBar />
            <Portfolio />
            <Tabs> 
              <div label="About Me"> 
                <About />
              </div> 
              <div label="Gallery"> 
                <EditGallery />
                <ViewGallery />
              </div> 
              <div label="Files"> 
                <Files />
              </div> 
              <div label="Additional"> 
                
              </div> 
            </Tabs> 
          </Route>
          <Route path="/account">
            <UserNavBar />
            <Account />
          </Route>
          <Route path="/login">
            <VisitorNavBar />
            <Login />
          </Route>
          <Route path="/browse">
            <VisitorNavBar />
            <Browse />
          </Route>
          <Route path="/about">
            <UserNavBar />
            <About />
          </Route>
          <Route path="/files">
            <UserNavBar />
            <Files />
          </Route>
          <Route path="/gallery">
            <UserNavBar />
            <EditGallery />
            <ViewGallery />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
