import React from 'react';

function JournalEntryBase(props) {
  return (
    <>
      <div>
        <h3 className='text-center'>
          Tag:
          <small className='text-muted'>{' ' + props.journalEntry.tag}</small>
          {' | '}
          Sleep:
          <small className='text-muted'>
            {' ' + props.journalEntry.sleep} hours
          </small>
          {' | '}
          Calories:
          <small className='text-muted'>
            {' ' + props.journalEntry.calories}
          </small>
        </h3>
        <h3 className='text-center'>
          Notes:
          <small className='text-muted'>{' ' + props.journalEntry.notes}</small>
        </h3>
      </div>
    </>
  );
}

export default JournalEntryBase;
