import React, { useState, useEffect } from 'react';
import Footer from '../components/common/Footer';
import * as journalEntryActions from '../actions/journalEntryActions';
import JournalEntryExercisesList from './JournalEntryExercisesList';
import JournalEntryBase from './JournalEntryBase';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ExcerciseForm from './ExerciseForm';
import { useAuth0 } from '@auth0/auth0-react';

function JournalEntryPage(props) {
  const { isAuthenticated } = useAuth0();
  const [open, setOpen] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [date, setDate] = useState('');
  const [weightFormat, setWeightFormat] = useState('');
  const closeModal = () => setOpen(false);

  debugger;
  const journalEntry = props.location.state.entry;

  const defaultExercise = {
    id: 0,
    exercise: '',
    set: '',
    weight: '',
    reps: '',
    pr: false,
    notes: '',
  };

  useEffect(() => {
    setDate(new Date(journalEntry.date).toDateString());
    setExercises(journalEntry.exercises);
    setWeightFormat(journalEntry.weightFormat);
  }, [journalEntry]);

  function handleExcerciseUpdate(newExercise) {
    if (newExercise) {
      journalEntryActions.updateEntryWithNewExercise(journalEntry, newExercise);
      setOpen(false);
    }
  }

  return (
    isAuthenticated && (
      <>
        <div>
          <div>&nbsp;</div>
          <h1 className='text-center'>Journal entry for {date}</h1>
        </div>
        <Row>
          <Col>
            <JournalEntryBase journalEntry={journalEntry} />
          </Col>
        </Row>
        <Row className='text-center'>
          <Col>
            <Button
              className='btn btn-info'
              onClick={() => {
                setOpen((o) => !o);
              }}
            >
              Add Exercise
            </Button>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs='10'>
            <JournalEntryExercisesList journalEntry={journalEntry} />
          </Col>
          <Col></Col>
        </Row>
        <Popup open={open} onClose={closeModal} closeOnDocumentClick>
          <div>
            <button className='float-right' onClick={closeModal}>
              &times;
            </button>
            <ExcerciseForm
              exercise={defaultExercise}
              updateExercise={handleExcerciseUpdate}
            />
          </div>
        </Popup>
        <Footer exercises={exercises || []} format={weightFormat} />
      </>
    )
  );
}

export default JournalEntryPage;
