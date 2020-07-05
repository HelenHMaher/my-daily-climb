import React from "react";

function Login() {
  return (
    <div>
      <div className="title">Login</div>
      <form className="login" action="/login" method="POST">
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

      <div className="title">Register</div>
      <form className="register" action="/register" method="POST">
        <div class="inputField">
          <label>Username:</label>
          <input type="text" name="username" />
        </div>
        <div className="inputField">
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <div className="inputField">
          <label>Confirm Password:</label>
          <input type="password" name="ConfirmPassword" />
        </div>
        <div className="inputField">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}

export default Login;
