import React from 'react';
import { NavbarBrand } from 'reactstrap';

let total = 0;

function Stats(props) {
  function getTotalWeight() {
    total = 0;
    total = props.exercises.reduce((tot, exercise) => {
      return tot + exercise.weight * exercise.reps;
    }, 0);

    console.log(total);
    return total;
  }

  return (
    <>
      <NavbarBrand>
        Workout volume : {getTotalWeight() || 0} {props.format || ''}
      </NavbarBrand>
    </>
  );
}

export default Stats;
