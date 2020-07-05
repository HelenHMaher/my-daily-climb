import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./views/login";

function App() {
  return (
    <BrowserRouter>
      <header>My Daily Climb</header>
      <Route path="/" component={Login} />
    </BrowserRouter>
  );
}

export default App;
