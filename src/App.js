import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Login from "./views/login";
import Profile from "./views/profile";
import Home from "./views/home";

function App() {
  const name = "John";
  const isAuthenticated = false;

  useEffect(() => {
    console.log(document.cookie);
  });

  return (
    <BrowserRouter>
      <header>My Daily Climb</header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <li>
                <Link to={`/profile/${name}`}>My Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Home} />
        {isAuthenticated ? (
          <>
            <Route path={`/profile/${name}`} component={Profile} />
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
