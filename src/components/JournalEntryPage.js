import React, { useState, useEffect } from 'react';
import Footer from '../components/common/Footer';
import journalEntryStore from '../stores/journalEntryStore';
import * as journalEntryActions from '../actions/journalEntryActions';
import JournalEntryExercisesList from './JournalEntryExercisesList';
import JournalEntryBase from './JournalEntryBase';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function JournalEntryPage(props) {
  const [exercises, setExercises] = useState([]);
  const [date, setDate] = useState('');
  const [weightFormat, setWeightFormat] = useState('');
  const [journalEntries, setJournalEntries] = useState(
    journalEntryStore.getJournalEntries()
  );
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
      <Row>
        <Col></Col>
        <Col xs='10'>
          <JournalEntryExercisesList journalEntry={journalEntry} />
        </Col>
        <Col></Col>
      </Row>
      <Footer exercises={exercises || []} format={weightFormat} />
    </>
  );
}

export default JournalEntryPage;
