import React from 'react';
import Dice from "react-dice-roll";

type diceValue = 1 | 2 | 3 | 4 | 5 | 6 | undefined

const DiceComponent = (props: { value: diceValue }) => {

  return (
    <Dice cheatValue={props.value}
      size={window.innerWidth < 450 ? 150 : 200} />
  );

}

export default DiceComponent;
