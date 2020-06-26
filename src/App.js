import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">My Daily Climb</header>
      <p>tracks the daily training and fitness for rock climbers</p>
      <form className="login">
        <div className="inputField">
          <label>Username:</label>
          <input type="text" name="username" />
        </div>
        <div className="inputField">
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <div className="inputField">
          <input type="submit" value="Log In" />
        </div>
      </form>
      <form className="logout" action="/logout">
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}

export default App;
