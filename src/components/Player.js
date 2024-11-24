import React from "react";
import { Typography, Box } from "@mui/material";

const Player = ({ name, globalScore, roundScore, wins, isActive }) => {
  return (
    <Box
      sx={{
        border: isActive ? "2px solid green" : "1px solid gray",
        padding: "10px",
        borderRadius: "5px",
        textAlign: "center",
      }}
    >
      <Typography variant="h5">{name}</Typography>
      <Typography>Global Score: {globalScore}</Typography>
      <Typography>Round Score: {roundScore}</Typography>
      <Typography>Wins: {wins}</Typography>
    </Box>
  );
};

export default Player;
