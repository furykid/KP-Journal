import React from 'react';
import { NavbarBrand } from 'reactstrap';

function Stats(props) {
  function getTotalWeight() {
    return props.exercises.reduce((tot, exercise) => {
      return tot + exercise.weight * exercise.reps;
    }, 0);
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
