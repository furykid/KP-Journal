import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../api/userApi";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (users.length === 0) {
      getUsers().then((_users) => {
        setUsers(_users);
      });
    }
  }, [users.length]);

  function handleChange() {
    getUsers().then((_users) => {
      setUsers(_users);
    });
  }

  return (
    <>
      <h1>Admin Page</h1>
      <h2>Users</h2>
      <Link className="btn btn-primary" to="/user">
        Add New User
      </Link>
      <UserList users={users} deleteUser={deleteUser} onChange={handleChange} />
    </>
  );
}

export default UsersPage;
