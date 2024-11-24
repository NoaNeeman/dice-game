import styled, { keyframes } from "styled-components";

const rollAnimation = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(90deg) scale(1.2); }
  50% { transform: rotate(180deg) scale(1); }
  75% { transform: rotate(270deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
`;

export const DiceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;

export const DiceImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 20px;
  animation: ${(props) => (props.isRolling ? rollAnimation : "none")} 0.4s ease
    infinite;
`;
