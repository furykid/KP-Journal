import React, { useState } from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ExcerciseForm from './ExerciseForm';
import * as journalEntryActions from '../actions/journalEntryActions';

function JournalEntryExercisesList(props) {
  const [activeExercise, setActiveExercise] = useState({
    id: 0,
    exercise: '',
    set: 0,
    weight: 0,
    reps: 0,
    pr: false,
    notes: '',
  });
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const scrollStyle = {
    height: '70vh',
    overflow: 'scroll',
    margin: '5%',
  };

  function handeExcerciseUpdate(newExercise) {
    if (newExercise) {
      let tempExercises = [
        ...props.journalEntry.exercises.filter(
          (exercise) => exercise.id !== newExercise.id
        ),
        newExercise,
      ];
      let tempEntry = {
        ...props.journalEntry,
        exercises: tempExercises,
      };
      journalEntryActions.saveJournalEntry(tempEntry);
      setOpen(false);
    }
  }

  return (
    <>
      <div
        className='w-50 p-3 list-inline mx-auto justify-content-center'
        style={scrollStyle}
      >
        {props.journalEntry.exercises
          .sort(
            ({ id: previousId }, { id: currentId }) => previousId - currentId
          )
          .map((exercise) => {
            const prStyle = { color: 'orange' };
            return (
              <ListGroup key={exercise.id}>
                <div>&nbsp;</div>
                <ListGroupItem
                  className='bg-light'
                  onClick={() => {
                    setOpen((o) => !o);
                    setActiveExercise(exercise);
                  }}
                >
                  <ListGroupItemHeading
                    style={exercise.pr === 'true' ? prStyle : {}}
                  >
                    {exercise.exercise}
                  </ListGroupItemHeading>
                  <ListGroupItemText>Set #{exercise.set}</ListGroupItemText>
                  <ListGroupItemText>
                    Weight: {exercise.weight}
                  </ListGroupItemText>
                  <ListGroupItemText>reps: {exercise.reps}</ListGroupItemText>
                  <ListGroupItemText>notes: {exercise.notes}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            );
          })}
        <Popup open={open} onClose={closeModal} closeOnDocumentClick>
          <div>
            <button onClick={closeModal}>&times;</button>
            <ExcerciseForm
              exercise={activeExercise}
              updateExercise={handeExcerciseUpdate}
            />
          </div>
        </Popup>
      </div>
    </>
  );
}

export default JournalEntryExercisesList;
