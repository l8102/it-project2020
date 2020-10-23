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
import ViewPortfolio from "./pages/ViewPortfolio";
import EnterAccessCode from "./pages/EnterAccessCode";

// Import components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// todo rewrite this in class notation
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <NavBar />
            <Landing />
          </Route>
          <Route path="/editPortfolio">
            <NavBar />
            <EditPortfolio/>
          </Route>
          <Route path="/createAccount">
            <NavBar />
            <Account />
          </Route>
          <Route path="/login">
            <NavBar />
            <Login />
          </Route>
          <Route path="/browse">
            <NavBar />
            <Browse />
          </Route>
          <Route path="/viewPortfolio">
            <NavBar />
            <ViewPortfolio/>
          </Route>
          <Route path="/enterAccessCode">
            <NavBar />
            <EnterAccessCode />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
