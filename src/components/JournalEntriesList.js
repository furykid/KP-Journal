import React from "react";

function JournalEntriesList(props) {
  return (
    <>
      <table className="table">
        <tbody>
          {props.journalEntries.map((journalEntry) => {
            return (
              <tr key={journalEntry.id}>
                <td>Type: {journalEntry.type}</td>
                <td>Date: {new Date(journalEntry.date).toDateString()}</td>
                <td>{journalEntry.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default JournalEntriesList;
