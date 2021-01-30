import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ExerciseForm(props) {
  const [errors, setErrors] = useState({});
  const [exercise, setExercise] = useState(props.exercise.exercise);
  const [set, setSet] = useState(props.exercise.set);
  const [pr, setPr] = useState(props.exercise.pr);
  const [weight, setWeight] = useState(props.exercise.weight);
  const [reps, setReps] = useState(props.exercise.reps);
  const [notes, setNotes] = useState(props.exercise.notes);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  function handleSubmit(event) {
    if (!formIsValid()) return;
    event.preventDefault();
    let newExercise = {
      ...props.exercise,
      exercise: exercise,
      set: set,
      weight: weight,
      reps: reps,
      pr: pr,
      notes: notes,
    };
    props.updateExercise(newExercise);
  }

  function handleDelete(event) {
    event.preventDefault();
    props.onDelete(props.exercise.id);
  }

  function formIsValid() {
    const _errors = {};

    if (!weight) _errors.weight = 'Weight is required';
    if (!reps) _errors.reps = 'Reps is required';

    setErrors(_errors);
    // Form is valid is the errors object has no properties
    return Object.keys(_errors).length === 0;
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
            onChange={(event) => {
              setExercise(event.target.value);
              setSaveButtonDisabled(false);
            }}
          />
        </Form.Group>
        <Form.Group controlId='setweightreps'>
          <Form.Label>Set</Form.Label>
          <Form.Control
            type='number'
            value={set}
            onChange={(event) => {
              setSet(~~event.target.value);
              setSaveButtonDisabled(false);
            }}
          />
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type='number'
            value={weight}
            onChange={(event) => {
              setWeight(~~event.target.value);
              setSaveButtonDisabled(false);
            }}
          />
          {errors.weight && (
            <div className='alert alert-danger'>{errors.weight}</div>
          )}
          <Form.Label>Reps</Form.Label>
          <Form.Control
            type='number'
            value={reps}
            onChange={(event) => {
              setReps(~~event.target.value);
              setSaveButtonDisabled(false);
            }}
          />
          {errors.reps && (
            <div className='alert alert-danger'>{errors.reps}</div>
          )}
        </Form.Group>
        <Form.Group controlId='pr'>
          <Form.Check
            label='PR'
            type='checkbox'
            onChange={(event) => {
              setPr(event.target.checked ? true : false);
              setSaveButtonDisabled(false);
            }}
            checked={pr === true}
          />
        </Form.Group>
        <Form.Group controlId='notes'>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as='textarea'
            value={notes}
            onChange={(event) => {
              setNotes(event.target.value);
              setSaveButtonDisabled(false);
            }}
          />
        </Form.Group>
        <Button
          type='submit'
          className='my-1 float-right'
          disabled={saveButtonDisabled}
        >
          Save
        </Button>
        <Button
          type='submit'
          className='my-1 btn btn-danger float-left'
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Form>
    </>
  );
}

export default ExerciseForm;
