import React, { useState, useEffect } from 'react';
import journalEntryStore from '../stores/journalEntryStore';
import { loadJournalEntries } from '../actions/journalEntryActions';
import JournalEntriesList from './JournalEntriesList';
import JournalEntryForm from './JournalEntryForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';

function JournalEntriesPage(props) {
  const [_userId, setUserId] = useState(0);
  const [journalEntries, setJournalEntries] = useState(
    journalEntryStore.getJournalEntries()
  );

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    journalEntryStore.addChangeListener(onChange);
    if (_userId !== props.match.params.userId) {
      setUserId(props.match.params.userId);
      loadJournalEntries(props.match.params.userId);
    }
    return () => journalEntryStore.removeChangeListener(onChange);
  }, [props.match.params.userId, journalEntries.length, _userId]);

  function onChange() {
    setJournalEntries(journalEntryStore.getJournalEntries());
  }

  return (
    <>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <div>&nbsp;</div>
          <div className='text-center'>
            <h1>Journal Entries</h1>
            <Button
              className='btn btn-success'
              onClick={() => setOpen((o) => !o)}
            >
              Add Entry
            </Button>
          </div>

          <JournalEntriesList journalEntries={journalEntries} />

          <Popup open={open} onClose={closeModal} closeOnDocumentClick>
            <div>
              <button className='float-right' onClick={closeModal}>
                &times;
              </button>
              <JournalEntryForm />
            </div>
          </Popup>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default JournalEntriesPage;
