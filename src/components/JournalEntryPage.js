import React, { useState, useEffect } from "react";
import * as journalEntryActions from "../actions/journalEntryActions";
import journalEntryStore from "../stores/journalEntryStore";

function JournalEntryPage(props) {
  const [journalEntries, setJournalEntries] = useState(
    journalEntryStore.getJournalEntries(props.match.params.userId)
  );
  const [journalEntry, setJournalEntry] = useState(
    journalEntryActions.getJournalEntry(props.match.params.entryId)
  );

  useEffect(() => {
    journalEntryStore.addChangeListener(onChange);
    debugger;
    if (!journalEntry)
      journalEntryActions.getJournalEntry(props.match.params.entryId);
    let userId = props.match.params.userId;
    if (journalEntryStore.getJournalEntries(userId).length === 0)
      journalEntryActions.loadJournalEntries(userId);
    return () => journalEntryStore.removeChangeListener(onChange);
  }, [journalEntry, props.match.params.entryId, props.match.params.userId]);

  function onChange() {
    debugger;
    setJournalEntries(
      journalEntryStore.getJournalEntries(props.match.params.userId)
    );
    setJournalEntry(
      journalEntryStore.getJournalEntry(props.match.params.entryId)
    );
  }

  return (
    <>
      <h1>Journal Entry</h1>
      <div>{journalEntry.id || ""}</div>
      <p>
        Create a Journal Entry module here. We will want to have other things on
        this page anyway.
      </p>
    </>
  );
}

export default JournalEntryPage;
