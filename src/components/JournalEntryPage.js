import React, { useState, useEffect } from "react";
import Footer from "../components/common/Footer";
import journalEntryStore from "../stores/journalEntryStore";
import * as journalEntryActions from "../actions/journalEntryActions";
import JournalEntry from "./JournalEntry";

function JournalEntryPage(props) {
  const [journalEntry, setJournalEntry] = useState({});

  useEffect(() => {
    journalEntryStore.addChangeListener(onChange);
    let userId = props.match.params.userId;
    if (journalEntryStore.getJournalEntries(userId).length === 0) {
      journalEntryActions.loadJournalEntries(userId);
    }
    return () => journalEntryStore.removeChangeListener(onChange);
  }, [props.match.params.userId]);

  function onChange() {
    let entry = journalEntryStore.getJournalEntry(props.match.params.entryId);
    setJournalEntry(entry);
  }

  return (
    <>
      <div>&nbsp;</div>
      <h1 className="text-center">
        Journal entry for {new Date(journalEntry.date).toDateString()}
      </h1>
      <JournalEntry exercises={journalEntry.exercises || []} />
      <Footer
        exercises={journalEntry.exercises || []}
        format={journalEntry.weightFormat || ""}
      />
    </>
  );
}

export default JournalEntryPage;
