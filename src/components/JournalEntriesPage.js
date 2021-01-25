import React, { useState, useEffect } from 'react';
import journalEntryStore from '../stores/journalEntryStore';
import { loadJournalEntries } from '../actions/journalEntryActions';
import JournalEntriesList from './JournalEntriesList';
import JournalEntryForm from './JournalEntryForm';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import * as journalEntryActions from '../actions/journalEntryActions';

function JournalEntriesPage(props) {
  const [_userId, setUserId] = useState(0);
  const [journalEntries, setJournalEntries] = useState(
    journalEntryStore.getJournalEntries()
  );

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    journalEntryStore.addChangeListener(onChange);

    // This seems temporary in case we want to switch users for some reason...
    let userId = props.match.params.userId;
    if (_userId !== userId) {
      setUserId(userId);
    }

    if (journalEntryStore.getJournalEntries().length === 0 && userId !== '') {
      journalEntryActions.loadJournalEntries(userId);
    }

    return () => journalEntryStore.removeChangeListener(onChange);
  }, [
    props.match.params.userId,
    journalEntries.length,
    _userId,
    journalEntries,
  ]);

  function onChange() {
    debugger;
    setJournalEntries(journalEntryStore.getJournalEntries());
  }

  function handleNewJournalEntry(entry) {
    if (entry) {
      journalEntryActions.saveJournalEntry(entry);
      setOpen(false);
    }
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
              <JournalEntryForm
                onNewJournalEntry={handleNewJournalEntry}
                userId={_userId}
              />
            </div>
          </Popup>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default JournalEntriesPage;
