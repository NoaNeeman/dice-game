import React from "react";
import { DiceContainer, DiceImage } from "../styles/dice";

const Dice = ({ diceValues, isRolling }) => {
  const getRandomDiceValue = () => Math.ceil(Math.random() * 6);

  return (
    <DiceContainer>
      <DiceImage
        src={`/images/dice${
          isRolling ? getRandomDiceValue() : diceValues[0]
        }.png`}
        alt={`Dice ${diceValues[0]}`}
        isRolling={isRolling}
      />
      <DiceImage
        src={`/images/dice${
          isRolling ? getRandomDiceValue() : diceValues[1]
        }.png`}
        alt={`Dice ${diceValues[1]}`}
        isRolling={isRolling}
      />
    </DiceContainer>
  );
};

export default Dice;
