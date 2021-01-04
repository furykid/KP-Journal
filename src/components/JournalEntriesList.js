import React from "react";
import Button from "react-bootstrap/Button";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

function JournalEntriesList(props) {
  return (
    <>
      <div>
        {props.journalEntries.map((entry) => {
          return (
            <div>
              <ListGroup key={entry.id}>
                <div>&nbsp;</div>
                <ListGroupItem
                  tag="a"
                  href={"/user/" + entry.userId + "/journalEntries/" + entry.id}
                  action
                >
                  <ListGroupItemHeading>
                    {new Date(entry.date).toDateString()}
                  </ListGroupItemHeading>
                  <ListGroupItemText>
                    tags:
                    {entry.tags.map((tag) => {
                      return (
                        <>
                          {" "}
                          <Button variant="outline-info" size="sm" disabled>
                            {tag}
                          </Button>
                        </>
                      );
                    })}
                  </ListGroupItemText>
                  <ListGroupItemText>
                    calories: {entry.calories}
                  </ListGroupItemText>
                  <ListGroupItemText>
                    sleep: {entry.sleep} hours
                  </ListGroupItemText>
                  <ListGroupItemText>notes: {entry.notes}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default JournalEntriesList;
