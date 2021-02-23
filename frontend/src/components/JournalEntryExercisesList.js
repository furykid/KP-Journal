import React, { useEffect, useState } from 'react';
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
import journalEntryStore from '../stores/journalEntryStore';
import { toast } from 'react-toastify';

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
  const [journalEntry, setJouralEntry] = useState(props.journalEntry);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const scrollStyle = {
    height: '70vh',
    overflow: 'scroll',
    margin: '5%',
  };

  function handleExcerciseUpdate(newExercise) {
    if (newExercise) {
      journalEntryActions
        .updateEntryWithNewExercise(props.journalEntry, newExercise)
        .then(() => {
          toast.success('Exercise saved');
          setOpen(false);
        });
    }
  }

  function handleExerciseDelete(exerciseId) {
    journalEntryActions
      .deleteExercise(props.journalEntry, exerciseId)
      .then(() => {
        toast.warn('Entry deleted');
        setOpen(false);
      });
  }

  useEffect(() => {
    function onChange() {
      setJouralEntry(journalEntryStore.getJournalEntry(props.journalEntry._id));
    }
    journalEntryStore.addChangeListener(onChange);
    setJouralEntry(journalEntryStore.getJournalEntry(props.journalEntry._id));
    return () => journalEntryStore.removeChangeListener(onChange);
  }, [props.journalEntry]);

  return (
    <>
      <div
        className='w-50 p-3 list-inline mx-auto justify-content-center'
        style={scrollStyle}
      >
        {journalEntry.exercises
          .sort(
            ({ id: previousId }, { id: currentId }) => previousId - currentId
          )
          .reverse()
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
                    style={exercise.pr === true ? prStyle : {}}
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
            <button className='float-right' onClick={closeModal}>
              &times;
            </button>
            <ExcerciseForm
              exercise={activeExercise}
              updateExercise={handleExcerciseUpdate}
              onDelete={handleExerciseDelete}
            />
          </div>
        </Popup>
      </div>
    </>
  );
}

export default JournalEntryExercisesList;
