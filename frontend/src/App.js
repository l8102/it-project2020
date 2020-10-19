import React from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route
} from "react-router-dom";
import "./css/Portfolio.css";

// Import pages
import Landing from "./pages/Landing";
import EditPortfolio from "./pages/EditPortfolio";
import Login from "./pages/Login";
import Account from "./pages/CreateAccount";
import Browse from "./pages/Browse";

// Import page components
import EditAbout from "./pages/pcomponents/EditAbout";
import ViewAbout from "./pages/pcomponents/ViewAbout";
import EditFiles from "./pages/pcomponents/EditFiles";
import ViewFiles from './pages/pcomponents/ViewFiles';
import EditGallery from "./pages/pcomponents/EditGallery";
import ViewGallery from './pages/pcomponents/ViewGallery';
import EditLinks from './pages/pcomponents/EditLinks';
import ViewLinks from './pages/pcomponents/ViewLinks';

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
          <Route path="/editPortfolio">
            <UserNavBar />
            <EditPortfolio />
            <Tabs> 
              <div label="About Me"> 
                <EditAbout />
                <ViewAbout />
              </div> 
              <div label="Gallery"> 
                <EditGallery />
                <ViewGallery />
              </div> 
              <div label="Files"> 
                <EditFiles />
                <ViewFiles />
              </div> 
              <div label="Links"> 
                <EditLinks />
                <ViewLinks />
              </div> 
            </Tabs> 
          </Route>
          <Route path="/createAccount">
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
            <EditAbout />
          </Route>
          <Route path="/files">
            <UserNavBar />
            <EditFiles />
            <ViewFiles />
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
