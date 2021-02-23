import { handleResponse, handleError } from './apiUtils';
const axios = require('axios').default;

export function getJournalEntries(userId) {
  return axios
    .get('journalEntries/' + userId)
    .then(handleResponse)
    .catch(handleError);
}

export function saveJournalEntry(journalEntry) {
  if (journalEntry._id !== '') {
    return axios
      .put('updateEntry', journalEntry)
      .then(handleResponse)
      .catch(handleError);
  } else {
    return axios
      .post('createEntry', journalEntry)
      .then(handleResponse)
      .catch(handleError);
  }
}

export function deleteJournalEntry(userId, journalEntryId) {
  return axios
    .delete('deleteEntry/' + journalEntryId)
    .then(handleResponse)
    .catch(handleError);
}
