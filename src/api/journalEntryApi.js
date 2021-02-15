import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.REACT_APP_API_URL + '/journalEntries/';

export function getJournalEntries(userId) {
  return fetch(baseUrl + '?userId=' + userId)
    .then(handleResponse)
    .catch(handleError);
}

export function saveJournalEntry(journalEntry) {
  return fetch(baseUrl + (journalEntry.id || ''), {
    method: journalEntry.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      ...journalEntry,
      userId: journalEntry.userId,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
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
