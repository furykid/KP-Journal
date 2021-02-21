import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';

function JournalEntriesList(props) {
  return (
    <>
      <div>
        {props.journalEntries
          .slice()
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .reverse()
          .map((entry) => {
            return (
              <ListGroup key={entry._id}>
                <div>&nbsp;</div>
                <Row>
                  <Button
                    className='btn btn-info float-left'
                    onClick={() => props.onEdit(entry)}
                  >
                    Edit
                  </Button>
                  <Col>
                    <ListGroupItem
                      tag='a'
                      href={'/journalEntry/' + entry._id}
                      action
                    >
                      <ListGroupItemHeading>
                        {new Date(entry.date).toDateString()}
                      </ListGroupItemHeading>
                      <ListGroupItemText>
                        <Button variant='outline-info' size='sm' disabled>
                          {entry.tag}
                        </Button>
                      </ListGroupItemText>
                      <ListGroupItemText>
                        calories: {entry.calories}
                      </ListGroupItemText>
                      <ListGroupItemText>
                        sleep: {entry.sleep} hours
                      </ListGroupItemText>
                      <ListGroupItemText>
                        notes: {entry.notes}
                      </ListGroupItemText>
                    </ListGroupItem>
                  </Col>
                  <Button
                    className='btn btn-danger float-right'
                    onClick={() => props.onDeleteEntry(entry._id)}
                  >
                    Delete
                  </Button>
                </Row>
              </ListGroup>
            );
          })}
      </div>
    </>
  );
}

export default JournalEntriesList;
