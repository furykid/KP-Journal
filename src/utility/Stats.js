import React, { useState, useEffect } from "react";
import * as journalEntryActions from "../actions/journalEntryActions";
import journalEntryStore from "../stores/journalEntryStore";
import { NavbarBrand } from "reactstrap";

function Stats(props) {
  const [total, setTotal] = useState(0);
  const [format, setFormat] = useState("");
  const [journalEntries, setJournalEntries] = useState(
    journalEntryStore.getJournalEntries(props.userId)
  );

  function setTotalWeight() {
    const _entries = journalEntryStore.getJournalEntries(props.userId);
    _entries.forEach((entry) => {
      setFormat(entry.weightFormat);
      entry.workout.forEach((workout) => {
        setTotal(total + workout.weight * workout.reps);
      });
    });
  }

  function onChange() {
    setJournalEntries(journalEntryStore.getJournalEntries(props.userId));
    setTotalWeight();
  }

  useEffect(() => {
    journalEntryStore.addChangeListener(onChange);
    if (journalEntries.length === 0) {
      journalEntryActions.loadJournalEntries(props.userId);
    }
    return () => journalEntryStore.removeChangeListener(onChange);
  }, [props.userId, journalEntries.length]);

  return (
    <>
      <NavbarBrand>
        All time total : {total} {format || ""}
      </NavbarBrand>
    </>
  );
}

export default Stats;
