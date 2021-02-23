import { handleResponse, handleError } from './apiUtils';
const axios = require('axios').default;

export function getJournalEntries(userId) {
  return axios
    .get('journalEntries/' + userId)
    .then(handleResponse)
    .catch(handleError);
}

export function saveJournalEntry(journalEntry) {
  debugger;
  return axios
    .post(journalEntry._id === '' ? 'createEntry' : 'updateEntry', journalEntry)
    .then(handleResponse)
    .catch(handleError);
}

export function deleteJournalEntry(userId, journalEntryId) {
  return axios
    .delete('journalEntry/delete/' + journalEntryId)
    .then(handleResponse)
    .catch(handleError);
}
