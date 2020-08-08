import React from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route
} from "react-router-dom";

import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>  
        </Switch>
      </div>
    </Router>
  );
}

export default App;
