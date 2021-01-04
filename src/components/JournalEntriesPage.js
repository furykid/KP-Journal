import React, { useEffect, useState } from "react";
import journalEntryStore from "../stores/journalEntryStore";
import * as journalEntryActions from "../actions/journalEntryActions";
import JournalEntriesList from "./JournalEntriesList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function JournalEntriesPage(props) {
  const [journalEntries, setJournalEntries] = useState(
    journalEntryStore.getJournalEntries(props.match.params.userId)
  );

  useEffect(() => {
    journalEntryStore.addChangeListener(onChange);
    const userId = props.match.params.userId;
    if (journalEntryStore.getJournalEntries(userId).length === 0)
      journalEntryActions.loadJournalEntries(userId);
    return () => journalEntryStore.removeChangeListener(onChange);
  }, [props.match.params.userId]);

  function onChange() {
    setJournalEntries(
      journalEntryStore.getJournalEntries(props.match.params.userId)
    );
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
