import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ExerciseForm(props) {
  const [exercise, setExercise] = useState(props.exercise.exercise);
  const [set, setSet] = useState(props.exercise.set);
  const [pr, setPr] = useState(props.exercise.pr);
  const [weight, setWeight] = useState(props.exercise.weight);
  const [reps, setReps] = useState(props.exercise.reps);
  const [notes, setNotes] = useState(props.exercise.notes);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <div>&nbsp;</div>
      <h1 className='text-center'>Edit</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='exercise'>
          <Form.Label>Excersise</Form.Label>
          <Form.Control
            autoFocus
            type='text'
            value={exercise}
            onChange={(event) => setExercise(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='setweightreps'>
          <Form.Label>Set</Form.Label>
          <Form.Control
            type='text'
            value={set}
            onChange={(event) => setSet(event.target.value)}
          />
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type='text'
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
          <Form.Label>Reps</Form.Label>
          <Form.Control
            type='text'
            value={reps}
            onChange={(event) => setReps(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='pr'>
          <Form.Check
            label='PR'
            type='checkbox'
            value={pr}
            onChange={(event) => setPr(event.target.value)}
            checked={pr ? true : false}
          />
        </Form.Group>
        <Form.Group controlId='set'>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            type='text'
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </Form.Group>
        <Button type='submit' className='my-1'>
          Save
        </Button>
      </Form>
    </>
  );
}

export default ExerciseForm;
