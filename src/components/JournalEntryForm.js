import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function JournalEntryForm(props) {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [tag, setTag] = useState('');
  const [weightFormat, setWeightFormat] = useState('');
  const [userId, setUserId] = useState(props.userId);
  const [calories, setCalories] = useState('');
  const [sleep, setSleep] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setWeightFormat('kg'); // Get this from a global setting
    setUserId(props.userId);
    const newEntry = {
      date: date,
      tag: tag,
      weightFormat: weightFormat,
      userId: userId,
      calories: calories,
      sleep: sleep,
      notes: notes,
      exercises: [],
    };
    props.onNewJournalEntry(newEntry);
  }

  return (
    <div>
      <div>&nbsp;</div>
      <h1 className='text-center'>New Entry</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='date'>
          <Form.Label>Date</Form.Label>
          <Form.Control
            autoFocus
            as='input'
            type='date'
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
          ></Form.Control>

          <Form.Label>tag</Form.Label>
          <Form.Control
            type='string'
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          ></Form.Control>

          <Form.Label>Calories</Form.Label>
          <Form.Control
            type='number'
            value={calories}
            onChange={(event) => setCalories(~~event.target.value)}
          ></Form.Control>

          <Form.Label>Sleep</Form.Label>
          <Form.Control
            type='number'
            value={sleep}
            onChange={(event) => setSleep(~~event.target.value)}
          ></Form.Control>

          <Form.Label>Notes</Form.Label>
          <Form.Control
            as='textarea'
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' className='my-1 float-right'>
          Save
        </Button>
      </Form>
    </div>
  );
}

export default JournalEntryForm;
