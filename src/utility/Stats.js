import React, { useState, useEffect } from "react";
import * as journalEntryActions from "../actions/journalEntryActions";
import journalEntryStore from "../stores/journalEntryStore";
import { NavbarBrand } from "reactstrap";

let _total = 0;

function Stats(props) {
  const [total, setTotal] = useState(0);
  const [format, setFormat] = useState("");
  const [journalEntries, setJournalEntries] = useState(
    journalEntryStore.getJournalEntries(props.userId)
  );

  function setTotalWeight() {
    const _entries = journalEntryStore.getJournalEntries(props.userId);
    _entries.forEach((entry) => {
      if (format === "") setFormat(entry.weightFormat);
      entry.exercises.forEach((exercise) => {
        _total += exercise.weight * exercise.reps;
        setTotal(_total);
      });
    });
  }

  useEffect(() => {
    journalEntryStore.addChangeListener(onChange);
    if (journalEntries.length === 0) {
      journalEntryActions.loadJournalEntries(props.userId);
    }
    return () => journalEntryStore.removeChangeListener(onChange);
  }, [props.userId, journalEntries.length]);

  function onChange() {
    setJournalEntries(journalEntryStore.getJournalEntries(props.userId));
    setTotalWeight();
  }

  return (
    <>
      <NavbarBrand>
        All time total : {total} {format || ""}
      </NavbarBrand>
    </>
  );
}

export default Stats;
