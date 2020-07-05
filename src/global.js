import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

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

`;
