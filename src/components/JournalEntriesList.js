import React from 'react';
import Button from 'react-bootstrap/Button';
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
              <ListGroup key={entry.id}>
                <div>&nbsp;</div>
                <ListGroupItem
                  tag='a'
                  href={'/user/' + entry.userId + '/journalEntries/' + entry.id}
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
                  <ListGroupItemText>notes: {entry.notes}</ListGroupItemText>
                </ListGroupItem>
                <Button
                  className='btn btn-danger float-right'
                  onClick={() => props.onDeleteEntry(entry.id)}
                >
                  Delete
                </Button>
                <Button className='btn btn-info float-left'>Edit</Button>
              </ListGroup>
            );
          })}
      </div>
    </>
  );
}

export default JournalEntriesList;
