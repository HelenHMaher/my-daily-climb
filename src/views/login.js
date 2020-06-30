//convert to react


<!DOCTYPE html>
<html>

<style>
    html {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
        margin: 10px;
    }

    form {
        padding: 15px;
        padding-top: 5px;

        width: 270px;
    }

    .login {
        background: lightgrey;
    }

    .logout {
        padding-top: 10px;
    }

    .inputField {
        margin-top: 10px;
        width: 250px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .button {
        width: 50px;
        height: 30px;
        border: 1px solid black;
    }
</style>

<head>
    <meta charset="utf-8">
    <title>Frontline Aid Prototype</title>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Antetype">

</head>

<body>
    <h1>My Daily Climb</h1>

    <p>Login</p>
    <form class="login" action="/login" method="POST">
        <div class="inputField">
            <label>Username:</label>
            <input type="text" name="username">
        </div>
        <div class="inputField">
            <label>Password:</label>
            <input type="password" name="password">
        </div>
        <div class="inputField">
            <input type="submit" value="Log In">
        </div>
    </form>

    <p>Register</p>
    <form class="register" action="/register" method="POST">
        <div class="inputField">
            <label>Username:</label>
            <input type="text" name="username">
        </div>
        <div class="inputField">
            <label>Password:</label>
            <input type="password" name="password">
        </div>
        <div class="inputField">
            <label>Confirm Password:</label>
            <input type="password" name="ConfirmPassword">
        </div>
        <div class="inputField">
            <input type="submit" value="Register">
        </div>
    </form>

    <form class="logout" action="/logout">
        <button type="submit">Logout
        </button>
    </form>
</body>

</html>