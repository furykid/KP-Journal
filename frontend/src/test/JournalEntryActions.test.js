import * as journalEntryActions from '../actions/journalEntryActions';
import * as journalEntryApi from '../api/journalEntryApi';
const sinon = require('sinon');

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

const exerciseToAdd = {
  id: '',
  exercise: 'snatch recoveries',
  set: 4,
  weight: 70,
  reps: 5,
  pr: false,
  notes: 'New exercise',
};

const exerciseAddedEntry = {
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
      id: 3,
      exercise: 'snatch recoveries',
      set: 2,
      weight: 85,
      reps: 3,
      pr: true,
      notes: 'Super heavy',
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
      id: 1,
      exercise: 'snatch recoveries',
      set: 1,
      weight: 40,
      reps: 5,
      pr: false,
      notes: 'Rough start',
    },
    {
      id: 4,
      exercise: 'snatch recoveries',
      set: 4,
      weight: 70,
      reps: 5,
      pr: false,
      notes: 'New exercise',
    },
  ],
};

const _exerciseDeletedJournalEntry = {
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
      id: 2,
      exercise: 'snatch recoveries',
      set: 2,
      weight: 80,
      reps: 5,
      pr: true,
      notes: 'Very sore',
    },
    {
      id: 1,
      exercise: 'snatch recoveries',
      set: 1,
      weight: 40,
      reps: 5,
      pr: false,
      notes: 'Rough start',
    },
  ],
};

describe('journal entries actions tests', () => {
  let saveEntryStub = {};
  let deleteEntryStub = {};
  let getJournalEntriesStub = {};
  let getJournalEntryStub = {};

  beforeAll(() => {
    saveEntryStub = sinon
      .stub(journalEntryApi, 'saveJournalEntry')
      .returns(Promise.resolve(JSON.stringify(_journalEntry)));
    deleteEntryStub = sinon
      .stub(journalEntryApi, 'deleteJournalEntry')
      .returns(Promise.resolve(JSON.stringify(_journalEntry)));
    getJournalEntriesStub = sinon
      .stub(journalEntryApi, 'getJournalEntries')
      .returns(Promise.resolve(JSON.stringify(_journalEntry)));
    getJournalEntryStub = sinon
      .stub(journalEntryApi, 'getJournalEntry')
      .returns(Promise.resolve(JSON.stringify(_journalEntry)));
  });

  afterAll(() => {
    journalEntryApi.saveJournalEntry.restore();
    journalEntryApi.deleteJournalEntry.restore();
  });

  it('should call external api when saveJournalEntry is called', () => {
    journalEntryActions.saveJournalEntry(_journalEntry);
    sinon.assert.calledOnceWithExactly(saveEntryStub, _journalEntry);
  });

  it('should call external api when delete is called', () => {
    journalEntryActions.deleteJournalEntry(
      _journalEntry.userId,
      _journalEntry.id
    );
    sinon.assert.calledOnceWithExactly(
      deleteEntryStub,
      _journalEntry.userId,
      _journalEntry.id
    );
  });

  it('should call external api when load entries is called', () => {
    journalEntryActions.loadJournalEntries(_journalEntry.userId);
    sinon.assert.calledOnceWithExactly(
      getJournalEntriesStub,
      _journalEntry.userId
    );
  });

  it('should call external api when get entry is called', () => {
    journalEntryActions.getJournalEntry(_journalEntry.id);
    sinon.assert.calledOnceWithExactly(getJournalEntryStub, _journalEntry.id);
  });

  it('should call save entry when a new exercise is added', () => {
    saveEntryStub.resetHistory();
    journalEntryActions.updateEntryWithNewExercise(
      _journalEntry,
      exerciseToAdd
    );
    sinon.assert.calledOnceWithExactly(saveEntryStub, exerciseAddedEntry);
  });

  it('should call save entry when a new exercise is deleted', () => {
    saveEntryStub.resetHistory();
    journalEntryActions.deleteExercise(_journalEntry, 3);
    sinon.assert.calledOnceWithExactly(
      saveEntryStub,
      _exerciseDeletedJournalEntry
    );
  });
});
