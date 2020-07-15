import React from "react";

function App() {
  return (
    <div>
      <h1>My Daily Climb</h1>
      <nav>
        <ul>
          <li>Log a Climbing Session</li>
          <li>Log a Workout</li>
          <li>Dryland Training</li>
          <li>My Profile</li>
        </ul>
      </nav>

      <h2>Log a Climbing Session</h2>
      {/*inside the collection "climbing sessions" within "climber-profiles"
        +creates a new climbing session containing indoor/outdoor, location, date, durration, type, climbing partner, notes
        +I can add individual climbs within this session
        +above information is displayed and can be changed, deleted or updated
        --these climbing sessions can be displayed and searched in the profile section*/}

      <form class="logout" action="/logout">
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}

export default App;
