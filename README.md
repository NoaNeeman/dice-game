# Dice Game

A fun and interactive Dice Game built with React and Redux. Players take turns rolling two dice and accumulate scores. The goal is to reach a target score, with special rules for high stake and double sixes. This game includes two players, customizable winning scores, and smooth UI interactions.

## Features

- **Two Players**: Play with 2 players, each with their own score.
- **Dice Roll**: Players roll two dices on each turn and add the result to their round score.
- **Winning Score**: Set a customizable winning score, and the first player to reach it wins.
- **High Stakes Mode**: Toggle high stakes mode where the round score is doubled at the end of each turn.
- **Double Six**: Special rule: rolling double sixes resets the round score. If the high stake is active then the global score resets too.
- **Snackbar Notifications**: Display messages for winning and special events like double sixes.
- **Responsive Design**: Designed to be playable on both mobile and desktop devices.

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For managing the game state across multiple components.
- **Material-UI**: For UI components and layout.
- **JavaScript (ES6+)**: For game logic and component behavior.
- **Styled-components**: For custom styling.

## Installation

To get the project up and running locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/NoaNeeman/dice-game.git
   ```

2. Navigate to the project directory:

   ```bash
   cd dice-game
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the game:

   ```bash
   npm start
   ```

5. Open the app in your browser at http://localhost:3000.
