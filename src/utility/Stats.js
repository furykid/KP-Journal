import React from "react";
import { NavbarBrand } from "reactstrap";

let total = 0;

function Stats(props) {
  function getTotalWeight() {
    total = 0;
    props.exercises.forEach((exercise) => {
      total += exercise.weight * exercise.reps;
    });
    return total;
  }

  return (
    <>
      <NavbarBrand>
        Workout total : {getTotalWeight() || 0} {props.format || ""}
      </NavbarBrand>
    </>
  );
}

export default Stats;
