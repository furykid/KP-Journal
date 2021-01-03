import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = { color: "orange" };
  return (
    <>
      <div className="navbar navbar-expand-sm bg-secondary navbar-dark sticky-top">
        <h1>Kilo Pro - Journal</h1>
        <ul>
          <nav>
            <NavLink activeStyle={activeStyle} exact to="/">
              Home
            </NavLink>
            {" - "}
            <NavLink activeStyle={activeStyle} to="/admin">
              Admin
            </NavLink>
          </nav>
        </ul>
      </div>
    </>
  );
}

export default Header;
