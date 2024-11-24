import React from "react";
import { createGlobalStyle } from "styled-components";
import Game from "./components/Game";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Game />
    </>
  );
};

export default App;
