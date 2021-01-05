import React, { useState, useEffect } from "react";
import Footer from "../components/common/Footer";
import journalEntryStore from "../stores/journalEntryStore";
import * as journalEntryActions from "../actions/journalEntryActions";
import JournalEntry from "./JournalEntry";

function JournalEntryPage(props) {
  const [journalEntries, setJournalEntries] = useState(
    journalEntryStore.getJournalEntries()
  );
  const [journalEntry, setJournalEntry] = useState({});
  const [exercises, setExercises] = useState([]);
  const [date, setDate] = useState("");
  const [weightFormat, setWeightFormat] = useState("");

  useEffect(() => {
    journalEntryStore.addChangeListener(onChange);
    let userId = props.match.params.userId;
    let entryId = props.match.params.entryId;
    if (journalEntryStore.getJournalEntries().length === 0) {
      journalEntryActions.loadJournalEntries(userId);
    }
    if (entryId) {
      setJournalEntry(journalEntryStore.getJournalEntry(entryId));
    }
    return () => journalEntryStore.removeChangeListener(onChange);
  }, [props.match.params.userId, props.match.params.entryId, journalEntries]);

  useEffect(() => {
    if (journalEntry) {
      debugger;
      setDate(new Date(journalEntry.date).toDateString());
      setExercises(journalEntry.exercises);
      setWeightFormat(journalEntry.weightFormat);
    }
  }, [journalEntry]);

  function onChange() {
    setJournalEntries(journalEntryStore.getJournalEntries());
    journalEntryStore.getJournalEntries();
  }

  return (
    <>
      <div>&nbsp;</div>
      <h1 className="text-center">Journal entry for {date}</h1>
      <JournalEntry exercises={exercises || []} />
      <Footer exercises={exercises || []} format={weightFormat || ""} />
    </>
  );
}

export default JournalEntryPage;
