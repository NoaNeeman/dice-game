import styled from "styled-components";
import { Button } from "@mui/material";

export const AnimatedButton = styled(Button)`
  && {
    margin: 10px;
    font-weight: bold;
    font-size: 1.1rem;
    text-transform: uppercase;
    border-radius: 30px;
    background: linear-gradient(135deg, #831914, black);
    color: white;
    box-shadow: 0 5px 15px rgba(255, 0, 0, 0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(255, 0, 0, 0.7);
    }
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
