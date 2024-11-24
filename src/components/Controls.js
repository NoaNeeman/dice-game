import React from "react";
import { Box, TextField } from "@mui/material";
import { ControlsContainer, AnimatedButton } from "../styles/controls";

const Controls = ({
  rollDice,
  holdScore,
  resetGame,
  winningScore,
  onWinningScoreChange,
  isRollDisabled,
}) => (
  <ControlsContainer>
    <Box textAlign="center" mt={4}>
      <AnimatedButton
        variant="contained"
        onClick={rollDice}
        disabled={isRollDisabled}
      >
        Roll Dice
      </AnimatedButton>
      <AnimatedButton variant="contained" onClick={holdScore}>
        Hold
      </AnimatedButton>
      <AnimatedButton variant="outlined" onClick={resetGame}>
        New Game
      </AnimatedButton>
    </Box>

    <TextField
      label="Winning Score"
      type="number"
      value={winningScore}
      onChange={onWinningScoreChange}
      sx={{
        mt: 2,
        input: { color: "white" },
        label: { color: "#ccc" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#fff" },
          "&:hover fieldset": { borderColor: "red" },
          "&.Mui-focused fieldset": { borderColor: "red" },
        },
      }}
    />
  </ControlsContainer>
);

export default Controls;
