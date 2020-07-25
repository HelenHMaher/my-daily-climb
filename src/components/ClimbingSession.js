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

      <form id="newBookForm" class="border">
        <input
          type="text"
          id="bookTitleToAdd"
          name="title"
          placeholder="New Book Title"
        />
        <button type="submit" value="Submit" id="newBook">
          Submit New Book!
        </button>
      </form>
      <div id="display"></div>
      <div id="bookDetail" class="border">
        <p id="detailTitle">Select a book to see it's details and comments</p>
        <ol id="detailComments"></ol>
      </div>
      <button id="deleteAllBooks">Delete all books...</button>
    </div>
  );
}

export default ClimbingSession;
