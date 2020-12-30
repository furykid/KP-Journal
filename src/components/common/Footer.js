import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

function Footer() {
  return (
    <>
      <div className="fixed-bottom">
        <Navbar color="dark" dark>
          <NavbarBrand>Footer Stuff</NavbarBrand>
        </Navbar>
      </div>
    </>
  );
}

export default Footer;
