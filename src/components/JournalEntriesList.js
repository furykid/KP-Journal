import React from "react";

function JournalEntriesList(props) {
  function EntryList(props) {
    debugger;
    return (
      <li>
        <div>{new Date(props.value.date).toDateString()}</div>
        <div>{props.value.type}</div>
        <div>{props.value.notes}</div>
      </li>
    );
  }

  const entryList = props.journalEntries.map((entry) => {
    debugger;
    return <EntryList key={entry.id.toString()} value={entry}></EntryList>;
  });

  return <ul>{entryList}</ul>;
}

export default JournalEntriesList;
