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
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
