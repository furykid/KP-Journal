import React from "react";
import { NavLink } from "react-router-dom";
import AuthenticationButton from "./AuthenticationButton";

function Header() {
  const activeStyle = { color: "orange" };
  return (
    <>
      <div className="navbar navbar-expand-lg bg-secondary bg-light justify-content-between sticky-top">
        <h1>Kilo Pro - Journal</h1>
        <div>
          <ul class="navbar-nav mr-auto">
            <NavLink activeStyle={activeStyle} exact to="/">
              Home
            </NavLink>
            {" - "}
            <NavLink activeStyle={activeStyle} to="/admin">
              Admin
            </NavLink>
          </ul>
        </div>
        <span>
          <AuthenticationButton />
        </span>
      </div>
    </>
  );
}

export default Header;
