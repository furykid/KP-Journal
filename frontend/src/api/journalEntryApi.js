import { handleResponse, handleError } from './apiUtils';
const axios = require('axios').default;
const baseUrl = process.env.REACT_APP_API_URL + '/journalEntries';

export function getJournalEntries(userId) {
  return axios
    .get('journalEntries/' + userId)
    .then(handleResponse)
    .catch(handleError);
  // return fetch(baseUrl + '?userId=' + userId)
  //   .then(handleResponse)
  //   .catch(handleError);
}

export function saveJournalEntry(journalEntry) {
  return axios
    .post('createEntry', journalEntry)
    .then(handleResponse)
    .catch(handleError);

  // return fetch(baseUrl + 'createEntry', {
  //   method: journalEntry.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
  //   headers: { 'content-type': 'application/json' },
  //   body: JSON.stringify(journalEntry),
  // })
  //   .then(handleResponse)
  //   .catch(handleError);
}

export function deleteJournalEntry(userId, journalEntryId) {
  return fetch(baseUrl + journalEntryId, {
    method: 'DELETE',
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getJournalEntry(entryId) {
  return fetch(baseUrl + '?id=' + entryId)
    .then(handleResponse)
    .catch(handleError);
}
