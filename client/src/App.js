import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">

      <ul className='home-wrap'>
          <li className='home-link'>
            <Link className='home-a' to="/login">Login</Link>
          </li>
          <li className='home-link'>
            <Link className='home-a' to="/bubblepage">Bubble Page</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/login" component={Login} />
          {/* 
            Build a PrivateRoute component that will 
            display BubblePage when you're authenticated 
          */}
          <PrivateRoute path="/bubblepage" component={BubblePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
