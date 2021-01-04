import React from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function JournalEntry(props) {
  return (
    <>
      <div className="w-50 p-3 list-inline mx-auto justify-content-center">
        {props.exercises.map((exercise) => {
          return (
            <Row>
              <Col></Col>
              <Col xs={10}>
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
                    <ListGroupItemText>
                      notes: {exercise.notes}
                    </ListGroupItemText>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col></Col>
            </Row>
          );
        })}
      </div>
    </>
  );
}

export default JournalEntry;
