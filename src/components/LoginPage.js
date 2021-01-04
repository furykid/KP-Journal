import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAppContext } from "../libs/contextLib";

function LoginPage(props) {
  const { userHasAuthenticated } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function formIsValid() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    userHasAuthenticated(true);

    // TEST CODE
    // submit login here
    console.log(`User info submitted: ${email} ${password}`);
    props.history.push("/user/0");
  }

  return (
    <>
      <div>&nbsp;</div>
      <h1 className="text-center">Login</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col></Col>
          <Col>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!formIsValid()}>
              Login
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </>
  );
}

export default LoginPage;
