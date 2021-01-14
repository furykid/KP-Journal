import dispatcher from '../appDispatcher';
import * as journalEntryApi from '../api/journalEntryApi';
import actionTypes from './actionTypes';

export function saveJournalEntry(journalEntry) {
  return journalEntryApi
    .saveJournalEntry(journalEntry)
    .then((savedJournalEntry) => {
      // Tell the dispatcher to update all the stores that a course was just created
      dispatcher.dispatch({
        actionType: savedJournalEntry.id
          ? actionTypes.UPDATE_JOURNAL_ENTRY
          : actionTypes.CREATE_JOURNAL_ENTRY,
        journalEntry: savedJournalEntry,
      });
    });
}

export function updateEntryWithNewExercise(journalEntry, newExercise) {
  let tempExercises = [
    ...journalEntry.exercises.filter(
      (exercise) => exercise.id !== newExercise.id
    ),
    newExercise,
  ];

  let tempEntry = {
    ...journalEntry,
    exercises: tempExercises,
  };

  saveJournalEntry(tempEntry);
}

export function deleteJournalEntry(userId, journalEntryId) {
  return journalEntryApi.deleteJournalEntry(userId, journalEntryId).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_JOURNAL_ENTRY,
      userId: userId,
      journalEntryId: journalEntryId,
    });
  });
}

export function loadJournalEntries(userId) {
  return journalEntryApi.getJournalEntries(userId).then((journalEntries) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_JOURNAL_ENTRIES,
      journalEntries: journalEntries,
    });
  });
}

export function getJournalEntry(entryId) {
  return journalEntryApi.getJournalEntry(entryId).then((journalEntry) => {
    dispatcher.dispatch({
      actionType: actionTypes.GET_JOURNAL_ENTRY,
      journalEntry: journalEntry,
    });
  });
}
