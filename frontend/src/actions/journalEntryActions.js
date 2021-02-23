import dispatcher from '../appDispatcher';
import * as journalEntryApi from '../api/journalEntryApi';
import actionTypes from './actionTypes';

export function saveJournalEntry(journalEntry) {
  return journalEntryApi
    .saveJournalEntry(journalEntry)
    .then((savedJournalEntry) => {
      // Tell the dispatcher to update all the stores that an entry was just created
      dispatcher.dispatch({
        actionType: actionTypes.CREATE_JOURNAL_ENTRY,
        journalEntry: savedJournalEntry,
      });
    });
}

export function deleteExercise(journalEntry, exerciseId) {
  let tempExercises = [
    ...journalEntry.exercises.filter((exercise) => exercise.id !== exerciseId),
  ];

  let tempEntry = {
    ...journalEntry,
    exercises: tempExercises,
  };

  return saveJournalEntry(tempEntry);
}

export function updateEntryWithNewExercise(journalEntry, newExercise) {
  // Grab the next ID manually if one doesn't already exist
  if (newExercise.id === 0 || newExercise.id === '') {
    if (journalEntry.exercises.length > 0) {
      journalEntry.exercises
        .sort(({ id: previousId }, { id: currentId }) => previousId - currentId)
        .reverse();
      newExercise.id = journalEntry.exercises[0].id + 1;
    } else {
      newExercise.id = 1;
    }
  }

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

  return saveJournalEntry(tempEntry);
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
