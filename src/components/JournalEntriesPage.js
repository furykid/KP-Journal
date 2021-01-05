import React, { useState, useEffect } from "react";
import journalEntryStore from "../stores/journalEntryStore";
import { loadJournalEntries } from "../actions/journalEntryActions";
import JournalEntriesList from "./JournalEntriesList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function JournalEntriesPage(props) {
  const [_userId, setUserId] = useState(0);
  const [journalEntries, setJournalEntries] = useState(
    journalEntryStore.getJournalEntries([])
  );

  useEffect(() => {
    journalEntryStore.addChangeListener(onChange);
    if (_userId === 0) setUserId(props.match.params.userId);
    if (journalEntryStore.getJournalEntries().length === 0)
      loadJournalEntries(_userId);
    return () => journalEntryStore.removeChangeListener(onChange);
  }, [_userId, props.match.params.userId]);

  function onChange() {
    setJournalEntries(journalEntryStore.getJournalEntries());
  }

  return (
    <>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <div>&nbsp;</div>
          <h1 className="text-center">Journal Entries</h1>
          <JournalEntriesList journalEntries={journalEntries || []} />
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default JournalEntriesPage;
