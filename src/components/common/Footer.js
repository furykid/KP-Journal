import React from "react";
import { Navbar } from "reactstrap";
import Stats from "../../utility/Stats";

function Footer(props) {
  return (
    <>
      <div className="navbar fixed-bottom justify-content-end">
        <Navbar className="rounded-pill" color="dark" dark>
          <Stats exercises={props.exercises} format={props.format} />
        </Navbar>
      </div>
    </>
  );
}

export default Footer;
