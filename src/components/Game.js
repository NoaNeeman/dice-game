import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import {
  rollDice,
  holdScore,
  resetGame,
  setWinningScore,
  toggleHighStakesMode,
} from "../redux/slices/gameSlice";
import Player from "./Player";
import Dice from "./Dice";
import Controls from "./Controls";
import { StyledTitle } from "../styles/game";

const Game = () => {
  const dispatch = useDispatch();
  const {
    players,
    currentPlayer,
    diceValues,
    winningScore,
    doubleSixMessage,
    highStakesMode,
  } = useSelector((state) => state.game);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");
  const [openDoubleSixSnackbar, setOpenDoubleSixSnackbar] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  // Action to roll the dice and dispatch the result to the store
  const handleRollDice = () => {
    setIsRolling(true);

    setTimeout(() => {
      const dice1 = Math.ceil(Math.random() * 6);
      const dice2 = Math.ceil(Math.random() * 6);
      dispatch(rollDice([dice1, dice2]));
      setIsRolling(false);

      if (dice1 === 6 && dice2 === 6) {
        setOpenDoubleSixSnackbar(true);
      }
    }, 500);
  };

  // Action to hold the score and check if the current player wins
  const handleHoldScore = () => {
    const currentPlayerScore =
      players[currentPlayer].globalScore + players[currentPlayer].roundScore;

    if (currentPlayerScore >= winningScore) {
      setWinnerMessage(`${players[currentPlayer].name} wins!`);
      setOpenSnackbar(true);
    }

    dispatch(holdScore());
  };

  // Action to reset the game and clear any winner or double six message
  const handleResetGame = () => {
    setWinnerMessage("");
    setOpenDoubleSixSnackbar(false);
    dispatch(resetGame());
  };

  // Action to update the winning score
  const handleWinningScoreChange = (event) => {
    dispatch(setWinningScore(Number(event.target.value)));
  };

  // Action to toggle High Stakes Mode
  const handleHighStakesToggle = () => {
    dispatch(toggleHighStakesMode());
  };

  // Close the winner snackbar after a delay
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Close the double six snackbar after a delay
  const handleCloseDoubleSixSnackbar = () => {
    setOpenDoubleSixSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <StyledTitle variant="h3" align="center" gutterBottom>
        Dice Game
      </StyledTitle>
      <Grid container spacing={3}>
        {players.map((player, index) => (
          <Grid item xs={6} key={index}>
            <Player
              name={player.name}
              globalScore={player.globalScore}
              roundScore={player.roundScore}
              wins={player.wins}
              isActive={index === currentPlayer}
            />
          </Grid>
        ))}
      </Grid>
      <Dice diceValues={diceValues} isRolling={isRolling} />
      <Controls
        rollDice={handleRollDice}
        holdScore={handleHoldScore}
        resetGame={handleResetGame}
        winningScore={winningScore}
        onWinningScoreChange={handleWinningScoreChange}
      />

      <Tooltip
        arrow
        title="The round score is doubled at the end of each turn and added to the global score. However, a double six will reset both the round and global score."
        placement="bottom"
      >
        <FormControlLabel
          control={
            <Switch
              checked={highStakesMode}
              onChange={handleHighStakesToggle}
              color="primary"
            />
          }
          label="High Stakes Mode"
          sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
        />
      </Tooltip>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {winnerMessage} // Display the winner message
        </Alert>
      </Snackbar>

      <Snackbar
        open={openDoubleSixSnackbar && doubleSixMessage}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseDoubleSixSnackbar}
      >
        <Alert
          onClose={handleCloseDoubleSixSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {doubleSixMessage} // Display the double six warning message
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Game;
