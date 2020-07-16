import React from "react";
import { Router, Route, Link } from "react-router";

function App() {
  return (
    <div>
      <h1>My Daily Climb</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/climbing-session">Log a Climbing Session</Link>
          </li>
          <li>
            <Link to="/log-workout">Log a Workout</Link>
          </li>
          <li>
            <Link to="/dryland-workouts">Dryland Training</Link>
          </li>
          <li>
            <Link to="/my-profile">My Profile</Link>
          </li>
        </ul>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/climbing-sessionclimbing-session"
          component={ClimbingSession}
        />
        <Route exact path="/log-workout" component={LogWorkout} />
        <Route exact path="/dryland-workouts" component={DrylandWorkouts} />
        <Route exact path="/my-profile" component={MyProfile} />
      </nav>
      <Router>
        <h2>Log a Climbing Session</h2>
        {/*inside the collection "climbing sessions" within "climber-profiles"
        +creates a new climbing session containing indoor/outdoor, location, date, durration, type, climbing partner, notes
        +I can add individual climbs within this session
        +above information is displayed and can be changed, deleted or updated
        --these climbing sessions can be displayed and searched in the profile section*/}

        <form class="logout" action="/logout">
          <button type="submit">Logout</button>
        </form>
      </Router>
    </div>
  );
}

export default App;
