import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-date-picker';

function JournalEntryForm(props) {
  let _userId = props.userId;
  let _weightFormat = 'kg';
  let _entryId = props.journalEntry.id || '';
  let _exercises = props.journalEntry.exercises || [];
  const [date, setDate] = useState(
    props.journalEntry.date !== ''
      ? new Date(props.journalEntry.date)
      : new Date()
  );
  const [tag, setTag] = useState(props.journalEntry.tag);
  const [calories, setCalories] = useState(props.journalEntry.calories);
  const [sleep, setSleep] = useState(props.journalEntry.sleep);
  const [notes, setNotes] = useState(props.journalEntry.notes);

  function handleSubmit(event) {
    event.preventDefault();
    const newEntry = {
      id: _entryId,
      date: date,
      tag: tag,
      weightFormat: _weightFormat,
      userId: _userId,
      calories: calories,
      sleep: sleep,
      notes: notes,
      exercises: _exercises,
    };
    props.onNewJournalEntry(newEntry);
  }

  return (
    <div>
      <div>&nbsp;</div>
      <h1 className='text-center'>New Entry</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='date'>
          <div>
            <Form.Label>Date </Form.Label>
            <DatePicker
              autofocus
              calendarAriaLabel='Toggle calendar'
              clearAriaLabel='Clear value'
              dayAriaLabel='Day'
              monthAriaLabel='Month'
              nativeInputAriaLabel='Date'
              yearAriaLabel='Year'
              onChange={setDate}
              value={date}
            ></DatePicker>
          </div>

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
