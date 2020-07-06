import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Login from "./views/login";
import Profile from "./views/profile";
import Home from "./views/home";

function App() {
  const isAuthenticated = false;
  const name = "John";
  return (
    <BrowserRouter>
      <header>My Daily Climb</header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/profile/${name}`}>Login</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        {isAuthenticated ? (
          <>
            <Route path="/profile/:name" component={Profile} />
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
