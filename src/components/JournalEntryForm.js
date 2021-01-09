import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function JournalEntryForm(props) {
  const [tag, setTag] = useState("");

  function handleSubmit() {}

  return (
    <>
      <div>&nbsp;</div>
      <h1>Journal Entry Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="tag">
          <Form.Label>tag</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default JournalEntryForm;
