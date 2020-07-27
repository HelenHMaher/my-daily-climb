import React from "react";

function ClimbingSession() {
  return (
    <div>
      <h2>Log a Climbing Session</h2>
      {/*inside the collection "climbing sessions" within "climber-profiles"
        +creates a new climbing session containing indoor/outdoor, location, date, durration, type, climbing partner, notes
        +I can add individual climbs within this session
        +above information is displayed and can be changed, deleted or updated
        --these climbing sessions can be displayed and searched in the profile section*/}

      <form id="newSessionForm">
        <input type="date" id="date" />
        <input type="text" id="location" placeholder="Location" />
        <input type="radio" id="indoor" name="indoorOutdoor" value="indoor" />
        <label for="indoor">Indoor</label>
        <input type="radio" id="outdoor" name="indoorOutdoor" value="outdoor" />
        <label for="outdoor">Outdoor</label>

        <button type="submit" value="Submit" id="newClimb" />
      </form>
    </div>
  );
}

export default ClimbingSession;
