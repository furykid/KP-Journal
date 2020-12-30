import React, { useState } from "react";
import TextInput from "./common/TextInput";

function LoginPage(props) {
  const [errors, setErrors] = useState({});
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function formIsValid() {
    const _errors = {};
    if (!userName) _errors.userName = "Username is required";
    if (!password) _errors.password = "Password is required";

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    // TEST CODE
    // submit login here
    console.log(`User info submitted: ${userName} ${password}`);
    props.history.push("/user/1234");
  }

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <TextInput
              id="userName"
              name="userName"
              label="User Name"
              onChange={(event) => setUserName(event.target.value)}
              value={userName}
              error={errors.userName}
            />
            <input
              name="password"
              type="password"
              label="Password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <input type="submit" value="Login" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
