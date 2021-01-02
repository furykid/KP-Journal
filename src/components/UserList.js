import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function UserList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>User ID</th>
          <th>User Name</th>
          <th>Account Type</th>
          <th>Member Since</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
              <td>{user.id}</td>
              <td>
                <Link to={"/user/" + user.id || ""}>{user.userName}</Link>
              </td>
              <td>{user.accountType}</td>
              <td>{new Date(user.userSince).toDateString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

UserList.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserList;
