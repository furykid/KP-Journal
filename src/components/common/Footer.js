import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Stats from "../../utility/Stats";

function Footer() {
  return (
    <>
      <div className="fixed-bottom">
        <Navbar color="dark" dark>
          <NavbarBrand>Footer Stuff</NavbarBrand>
          <Stats userId="0" />
        </Navbar>
      </div>
    </>
  );
}

export default Footer;
