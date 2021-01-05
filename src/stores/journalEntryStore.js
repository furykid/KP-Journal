import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _journalEntries = [];

class JournalEntryStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getJournalEntries() {
    return _journalEntries;
  }

  getJournalEntry(entryId) {
    return _journalEntries.find((entry) => entry.id === ~~entryId);
  }
}

const store = new JournalEntryStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_JOURNAL_ENTRY:
      _journalEntries.push(action.journalEntry);
      store.emitChange();
      break;
    case actionTypes.LOAD_JOURNAL_ENTRIES:
      _journalEntries = action.journalEntries;
      store.emitChange();
      break;
    case actionTypes.UPDATE_JOURNAL_ENTRY:
      _journalEntries = _journalEntries.map((entry) =>
        entry.id === action.journalEntry.id ? action.journalEntry : entry
      );
      store.emitChange();
      break;
    case actionTypes.DELETE_JOURNAL_ENTRY:
      _journalEntries = _journalEntries.filter(
        (entry) => entry.id !== ~~action.id
      );
      store.emitChange();
      break;
    default:
  }
});

export default store;
