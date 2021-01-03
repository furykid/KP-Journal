import React from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

function JournalEntry(props) {
  return (
    <>
      <div className="w-50 p-3 list-inline mx-auto justify-content-center">
        {props.exercises.map((exercise) => {
          return (
            <div>
              <ListGroup key={exercise.id}>
                <div>&nbsp;</div>
                <ListGroupItem className="bg-light">
                  <ListGroupItemHeading>
                    {exercise.exercise}
                  </ListGroupItemHeading>
                  <ListGroupItemText>Set #{exercise.set}</ListGroupItemText>
                  <ListGroupItemText>
                    Weight: {exercise.weight}
                  </ListGroupItemText>
                  <ListGroupItemText>reps: {exercise.reps}</ListGroupItemText>
                  <ListGroupItemText>notes: {exercise.notes}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default JournalEntry;
