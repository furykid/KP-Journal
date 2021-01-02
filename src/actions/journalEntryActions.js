import dispatcher from "../appDispatcher";
import * as journalEntryApi from "../api/journalEntryApi";
import actionTypes from "./actionTypes";

export function saveJournalEntry(journalEntry) {
  return journalEntryApi
    .saveJournalEntry(journalEntry)
    .then((savedJournalEntry) => {
      // Tell the dispatcher to update all the stores that a course was just created
      dispatcher.dispatch({
        actionType: journalEntry.id
          ? actionTypes.UPDATE_JOURNAL_ENTRY
          : actionTypes.CREATE_JOURNAL_ENTRY,
        author: savedJournalEntry,
      });
    });
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
