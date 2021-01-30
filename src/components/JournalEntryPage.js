import React, { useState, useEffect } from 'react';
import Footer from '../components/common/Footer';
import journalEntryStore from '../stores/journalEntryStore';
import * as journalEntryActions from '../actions/journalEntryActions';
import JournalEntryExercisesList from './JournalEntryExercisesList';
import JournalEntryBase from './JournalEntryBase';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ExcerciseForm from './ExerciseForm';

function JournalEntryPage(props) {
  const [open, setOpen] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [date, setDate] = useState('');
  const [weightFormat, setWeightFormat] = useState('');
  const [journalEntries, setJournalEntries] = useState(
    journalEntryStore.getJournalEntries()
  );
  const closeModal = () => setOpen(false);

  const [journalEntry, setJournalEntry] = useState({
    id: 0,
    date: '',
    userId: 0,
    tag: '',
    weightFormat: '',
    sleep: 0,
    calories: 0,
    notes: '',
    exercises: [
      {
        id: 0,
        exercise: '',
        set: 0,
        weight: 0,
        reps: 0,
        pr: false,
        notes: '',
      },
    ],
  });

  const defaultExercise = {
    id: '',
    exercise: '',
    set: '',
    weight: '',
    reps: '',
    pr: false,
    notes: '',
  };

  useEffect(() => {
    journalEntryStore.addChangeListener(onChange);
    let userId = props.match.params.userId;
    let entryId = props.match.params.entryId;
    if (journalEntries.length === 0) {
      journalEntryActions.loadJournalEntries(userId);
    } else if (entryId) {
      let entry = journalEntryStore.getJournalEntry(entryId);
      if (entry) {
        setJournalEntry(entry);
      } else {
        return props.history.push('/NotFoundPage');
      }
    }
    return () => journalEntryStore.removeChangeListener(onChange);
  }, [
    props.match.params.userId,
    props.match.params.entryId,
    journalEntries,
    props.history,
  ]);

  useEffect(() => {
    setDate(new Date(journalEntry.date).toDateString());
    setExercises(journalEntry.exercises);
    setWeightFormat(journalEntry.weightFormat);
  }, [journalEntry]);

  function onChange() {
    setJournalEntries(journalEntryStore.getJournalEntries());
  }

  function handleExcerciseUpdate(newExercise) {
    if (newExercise) {
      journalEntryActions.updateEntryWithNewExercise(journalEntry, newExercise);
      setOpen(false);
    }
  }

  return (
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
  );
}

export default JournalEntryPage;
