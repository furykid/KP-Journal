import React from "react";
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
            <ListGroup key={entry.id}>
              <ListGroupItem
                tag="a"
                href={"/user/" + entry.userId + "/journalEntries/" + entry.id}
                action
              >
                <ListGroupItemHeading>
                  {new Date(entry.date).toDateString()}
                </ListGroupItemHeading>
                <ListGroupItemText className="border border-warning">
                  {entry.tag}
                </ListGroupItemText>
                <ListGroupItemText>{entry.notes}</ListGroupItemText>
              </ListGroupItem>
            </ListGroup>
          );
        })}
      </div>
    </>
  );
}

export default JournalEntriesList;
