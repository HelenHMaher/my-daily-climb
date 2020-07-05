import React from "react";

function Profile() {
  return (
    <div>
      <div>Welcome User!!</div>
      <form class="logout" action="/logout">
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}

export default Profile;
