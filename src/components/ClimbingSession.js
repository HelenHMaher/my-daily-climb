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
        <input type="date" id="date" placeholder="Date" />
        <input type="text" id="location" placeholde="Location" />

        <button type="submit" value="Submit" id="newClimb">
          Submit New Climb!
        </button>
      </form>
      <div id="display"></div>
      <div id="climbDetail">
        <p id="detailTitle">Select a climb to see it's details and comments</p>
        <ol id="detailComments"></ol>
      </div>
      <button id="deleteClimb">Delete climb...</button>
    </div>
  );
}

export default ClimbingSession;
