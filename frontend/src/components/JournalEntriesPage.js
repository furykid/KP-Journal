import React, { useState, useEffect } from 'react';
import journalEntryStore from '../stores/journalEntryStore';
import JournalEntriesList from './JournalEntriesList';
import JournalEntryForm from './JournalEntryForm';
import * as journalEntryActions from '../actions/journalEntryActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';

function JournalEntriesPage(props) {
  const { user, isAuthenticated } = useAuth0();
  const [_userId, setUserId] = useState(null);

  const _defaultEntry = {
    date: '',
    userId: '',
    tag: '',
    weightFormat: '',
    sleep: '',
    calories: '',
    notes: '',
    exercises: [],
  };

  const [selectedEntry, setSelectedEntry] = useState(_defaultEntry);
  const [_journalEntries, setJournalEntries] = useState(
    journalEntryStore.getJournalEntries()
  );

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    journalEntryStore.addChangeListener(onChange);
    if (journalEntryStore.getJournalEntries().length === 0 && _userId !== '') {
      journalEntryActions.loadJournalEntries(_userId);
    }
    return () => journalEntryStore.removeChangeListener(onChange);
  }, [_userId]);

  useEffect(() => {
    const getUserId = () => {
      if (user) {
        return user.sub.slice(user.sub.indexOf('|') + 1);
      }
    };

    setUserId(getUserId());
  }, [user]);

  function onChange() {
    setJournalEntries(journalEntryStore.getJournalEntries());
  }

  function handleNewJournalEntry(entry) {
    if (entry) {
      journalEntryActions.saveJournalEntry(entry).then(() => {
        toast.success('Entry saved');
        setOpen(false);
      });
    }
  }

  function handleDeleteEntry(entryId) {
    journalEntryActions.deleteJournalEntry(_userId, entryId).then(() => {
      toast.warn('Entry deleted');
    });
  }

  function handleEditEntry(entry) {
    setSelectedEntry(entry);
    setOpen(true);
  }

  return (
    isAuthenticated && (
      <>
        <Row>
          <Col>{JSON.stringify(user.sub)}</Col>
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

            <JournalEntriesList
              journalEntries={_journalEntries}
              onDeleteEntry={handleDeleteEntry}
              onEdit={handleEditEntry}
            />

            <Popup
              open={open}
              onClose={() => {
                closeModal();
                setSelectedEntry(_defaultEntry);
              }}
              closeOnDocumentClick
            >
              <div>
                <button className='float-right' onClick={closeModal}>
                  &times;
                </button>
                <JournalEntryForm
                  journalEntry={selectedEntry}
                  onNewJournalEntry={handleNewJournalEntry}
                  userId={_userId}
                />
              </div>
            </Popup>
          </Col>
          <Col></Col>
        </Row>
      </>
    )
  );
}

export default JournalEntriesPage;
