import { handleResponse, handleError } from './apiUtils';
const axios = require('axios').default;

export function getJournalEntries(userId) {
  return axios
    .get('journalEntries/' + userId)
    .then(handleResponse)
    .catch(handleError);
}

export function saveJournalEntry(journalEntry) {
  return axios
    .post('createEntry', journalEntry)
    .then(handleResponse)
    .catch(handleError);
}

export function deleteJournalEntry(userId, journalEntryId) {
  return axios
    .delete('journalEntry/delete/' + journalEntryId)
    .then(handleResponse)
    .catch(handleError);
}

export function getJournalEntry(entryId) {
  return axios
    .get('journalEntry/' + entryId)
    .then(handleResponse)
    .catch(handleError);
}
