import { createSlice } from "@reduxjs/toolkit";

// Load saved wins from localStorage or return default value
const loadWins = () => {
  const savedWins = localStorage.getItem("playerWins");
  return savedWins ? JSON.parse(savedWins) : [0, 0];
};

// Initial state of the game
const initialState = {
  players: [
    { name: "Player 1", globalScore: 0, roundScore: 0, wins: loadWins()[0] },
    { name: "Player 2", globalScore: 0, roundScore: 0, wins: loadWins()[1] },
  ],
  currentPlayer: 0,
  winningScore: 100,
  diceValues: [0, 0],
  doubleSixMessage: "",
  highStakesMode: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    /**
     * Rolls the dice for the current player.
     * In High Stakes Mode, doubles the dice values but caps at 6.
     * If double sixes are rolled, resets the player's scores and switches the player.
     */
    rollDice: (state, action) => {
      const { currentPlayer, players, highStakesMode } = state;
      const [dice1, dice2] = action.payload;

      const modifiedDice1 = highStakesMode ? Math.min(dice1 * 2, 6) : dice1;
      const modifiedDice2 = highStakesMode ? Math.min(dice2 * 2, 6) : dice2;

      state.diceValues = [modifiedDice1, modifiedDice2];
      state.doubleSixMessage = "";

      if (modifiedDice1 === 6 && modifiedDice2 === 6) {
        players[currentPlayer].roundScore = 0;
        state.doubleSixMessage = `${players[currentPlayer].name} rolled double six and lost the round!`;

        if (highStakesMode) {
          players[currentPlayer].globalScore = 0;
          players[currentPlayer].roundScore = 0;
        }

        state.currentPlayer = currentPlayer === 0 ? 1 : 0;
      } else {
        players[currentPlayer].roundScore += modifiedDice1 + modifiedDice2;
      }
    },

    /**
     * Holds the current round score for the player.
     * Adds the round score to the global score.
     * Doubles the round score if High Stakes mode is active.
     * Resets the round score after holding.
     * Checks for a winner by comparing the global score with the winning score.
     */
    holdScore: (state) => {
      const {
        currentPlayer,
        players,
        winningScore,
        highStakesMode,
        diceValues,
      } = state;

      if (diceValues[0] === 6 && diceValues[1] === 6) {
        players[currentPlayer].roundScore = 0;
        state.doubleSixMessage = `${players[currentPlayer].name} rolled double six and lost the round!`;
      } else {
        if (highStakesMode) {
          players[currentPlayer].globalScore +=
            players[currentPlayer].roundScore * 2;
        } else {
          players[currentPlayer].globalScore +=
            players[currentPlayer].roundScore;
        }

        players[currentPlayer].roundScore = 0;
      }

      if (players[currentPlayer].globalScore >= winningScore) {
        players[currentPlayer].wins += 1;

        localStorage.setItem(
          "playerWins",
          JSON.stringify([players[0].wins, players[1].wins])
        );

        state.players = state.players.map((player) => ({
          ...player,
          globalScore: 0,
          roundScore: 0,
        }));
        state.currentPlayer = 0;
        state.diceValues = [0, 0];
      } else {
        state.currentPlayer = currentPlayer === 0 ? 1 : 0;
        state.diceValues = [0, 0];
      }
    },

    /**
     * Resets the game to its initial state.
     * Clears all player scores, resets the current player, and disables High Stakes mode.
     */
    resetGame: (state) => {
      state.players = state.players.map((player) => ({
        ...player,
        globalScore: 0,
        roundScore: 0,
      }));
      state.diceValues = [0, 0];
      state.currentPlayer = 0;
      state.doubleSixMessage = "";
      state.highStakesMode = false;
    },

    /**
     * Updates the winning score in the game.
     * Used when the user changes the target score for winning.
     */
    setWinningScore: (state, action) => {
      state.winningScore = action.payload;
    },

    /**
     * Toggles High Stakes mode.
     * When enabled, the round score is doubled and double sixes reset all scores.
     */
    toggleHighStakesMode: (state) => {
      state.highStakesMode = !state.highStakesMode;
    },
  },
});

export const {
  rollDice,
  holdScore,
  resetGame,
  setWinningScore,
  toggleHighStakesMode,
} = gameSlice.actions;

export default gameSlice.reducer;
