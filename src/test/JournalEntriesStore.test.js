import EntriesStore from '../stores/journalEntryStore';
import dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

const _journalEntry = {
  id: 1,
  date: '2020-05-23T18:25:43.511Z',
  userId: 0,
  tag: 'snatch',
  weightFormat: 'kg',
  sleep: 8,
  calories: 1500,
  notes: 'Everything felt great',
  exercises: [
    {
      id: 1,
      exercise: 'snatch recoveries',
      set: 1,
      weight: 40,
      reps: 5,
      pr: false,
      notes: 'Rough start',
    },
    {
      id: 2,
      exercise: 'snatch recoveries',
      set: 2,
      weight: 80,
      reps: 5,
      pr: true,
      notes: 'Very sore',
    },
    {
      id: 3,
      exercise: 'snatch recoveries',
      set: 2,
      weight: 85,
      reps: 3,
      pr: true,
      notes: 'Super heavy',
    },
  ],
};

const _journalEntry2 = {
  id: 2,
  date: '2020-05-23T18:25:43.511Z',
  userId: 0,
  tag: 'snatch',
  weightFormat: 'kg',
  sleep: 8,
  calories: 1500,
  notes: 'Everything felt great',
  exercises: [
    {
      id: 1,
      exercise: 'snatch recoveries',
      set: 1,
      weight: 40,
      reps: 5,
      pr: false,
      notes: 'Rough start',
    },
    {
      id: 2,
      exercise: 'snatch recoveries',
      set: 2,
      weight: 80,
      reps: 5,
      pr: true,
      notes: 'Very sore',
    },
  ],
};

describe('journal entries store tests', () => {
  beforeEach(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_JOURNAL_ENTRY,
      userId: _journalEntry.userId,
      journalEntryId: _journalEntry.id,
    });
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_JOURNAL_ENTRY,
      userId: _journalEntry2.userId,
      journalEntryId: _journalEntry2.id,
    });
    EntriesStore.removeAllListeners();
  });

  it('should add new entry to store', () => {
    dispatcher.dispatch({
      actionType: actionTypes.CREATE_JOURNAL_ENTRY,
      journalEntry: _journalEntry,
    });
    const entries = EntriesStore.getJournalEntries();
    expect(entries).toHaveLength(1);

    const newEntry = EntriesStore.getJournalEntry(_journalEntry.id);
    expect(newEntry).toEqual(_journalEntry);
  });

  it('should delete new entry from store', () => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_JOURNAL_ENTRY,
      userId: _journalEntry.userId,
      journalEntryId: _journalEntry.id,
    });
    const entries = EntriesStore.getJournalEntries();
    expect(entries).toHaveLength(0);
  });

  it('should get all entries added to store', () => {
    dispatcher.dispatch({
      actionType: actionTypes.CREATE_JOURNAL_ENTRY,
      journalEntry: _journalEntry,
    });
    dispatcher.dispatch({
      actionType: actionTypes.CREATE_JOURNAL_ENTRY,
      journalEntry: _journalEntry2,
    });

    const entries = EntriesStore.getJournalEntries();
    expect(entries).toHaveLength(2);

    const newEntry = EntriesStore.getJournalEntry(_journalEntry.id);
    expect(newEntry).toEqual(_journalEntry);

    const newEntry2 = EntriesStore.getJournalEntry(_journalEntry2.id);
    expect(newEntry2).toEqual(_journalEntry2);
  });

  it('should call the callback function', () => {
    let called = false;
    EntriesStore.addChangeListener(() => {
      called = true;
    });

    dispatcher.dispatch({
      actionType: actionTypes.CREATE_JOURNAL_ENTRY,
      journalEntry: _journalEntry,
    });

    expect(called).toBeTruthy();
  });
});
