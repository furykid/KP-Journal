import React from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

function JournalEntryExercisesList(props) {
  const scrollStyle = {
    height: "70vh",
    overflow: "scroll",
    margin: "5%",
  };
  return (
    <>
      <div
        className="w-50 p-3 list-inline mx-auto justify-content-center"
        style={scrollStyle}
      >
        {props.exercises.map((exercise) => {
          const prStyle = { color: "orange" };
          return (
            <ListGroup key={exercise.id}>
              <div>&nbsp;</div>
              <ListGroupItem className="bg-light">
                <ListGroupItemHeading style={exercise.pr ? prStyle : {}}>
                  {exercise.exercise}
                </ListGroupItemHeading>
                <ListGroupItemText>Set #{exercise.set}</ListGroupItemText>
                <ListGroupItemText>Weight: {exercise.weight}</ListGroupItemText>
                <ListGroupItemText>reps: {exercise.reps}</ListGroupItemText>
                <ListGroupItemText>notes: {exercise.notes}</ListGroupItemText>
              </ListGroupItem>
            </ListGroup>
          );
        })}
      </div>
    </>
  );
}

export default JournalEntryExercisesList;
