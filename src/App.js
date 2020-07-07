import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Profile from "./views/profile";
import Home from "./views/home";

function App() {
  return (
    <BrowserRouter>
      <header>My Daily Climb</header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
