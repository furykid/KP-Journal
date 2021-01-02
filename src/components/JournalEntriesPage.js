import React, { useEffect, useState } from "react";
import journalEntryStore from "../stores/journalEntryStore";
import * as journalEntryActions from "../actions/journalEntryActions";
import JournalEntriesList from "./JournalEntriesList";

function JournalEntriesPage(props) {
  const [journalEntries, setJournalEntries] = useState(
    journalEntryStore.getJournalEntries(props.match.params.userId)
  );

  useEffect(() => {
    journalEntryStore.addChangeListener(onChange);
    const userId = props.match.params.userId;
    if (journalEntryStore.getJournalEntries(userId) === 0)
      journalEntryActions.loadJournalEntries(userId);
    return () => journalEntryStore.removeChangeListener(onChange);
  });

  function onChange() {
    setJournalEntries(
      journalEntryStore.getJournalEntries(props.match.params.userId)
    );
  }

  return (
    <>
      <h1>Journal Entries</h1>
      <JournalEntriesList journalEntries={journalEntries} />
    </>
  );
}

export default JournalEntriesPage;
