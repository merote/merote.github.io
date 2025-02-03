import React from 'react';
import Dice from "react-dice-roll";

type diceValue = 1 | 2 | 3 | 4 | 5 | 6 | undefined

const DiceComponent = (props: {value: diceValue}) => {



return ( 
  <Dice cheatValue={props.value} />
);

}

export default DiceComponent;
