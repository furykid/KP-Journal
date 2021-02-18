import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import { Link } from 'react-router-dom';
import userStore from '../../stores/userStore';
import { loadUsers, deleteUser } from '../../actions/userActions';

function AdminPage() {
  const [users, setUsers] = useState(userStore.getUsers());

  useEffect(() => {
    userStore.addChangeListener(onChange);
    if (userStore.getUsers().length === 0) loadUsers();
    return () => userStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setUsers(userStore.getUsers());
  }

  return (
    <>
      <h1>Admin Page</h1>
      <h2>Users</h2>
      <Link className='btn btn-primary' to='/user'>
        Add New User
      </Link>
      <UserList users={users} deleteUser={deleteUser} />
    </>
  );
}

export default AdminPage;
