import { keyframes } from 'styled-components';

const flashing = keyframes`
  0% {
    background-color: #E0E0E0;
  }
  50% {
    background-color: #C8C8C8;
  }
  100% {
    background-color: #E0E0E0;
  }
`;

export {
  flashing,
};
