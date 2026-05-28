import styled, { keyframes, css } from "styled-components";

const twinkle = keyframes`
  0% {
    opacity: var(--twinkle-min-opacity, 0.2);
    transform: scale(0.9);
    filter: brightness(0.8);
  }
  100% {
    opacity: var(--twinkle-max-opacity, 1);
    transform: scale(1.15);
    filter: brightness(1.25);
  }
`;

export const StarFieldContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  filter: blur(8px);
  opacity: 0.95;
`;

type StarProps = {
  $size: number;
  $x: number;
  $y: number;
  $duration: number;
  $delay: number;
  $shouldTwinkle: boolean;
  $twinkleMinOpacity: number;
  $twinkleMaxOpacity: number;
};

export const Star = styled.div<StarProps>`
  position: absolute;
  background: #dce6ff;
  border-radius: 50%;
  opacity: 0.35;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  left: ${(props) => props.$x}%;
  top: ${(props) => props.$y}%;
  will-change: opacity, transform, filter;
  box-shadow: 0 0 3px rgba(220, 230, 255, 0.65);
  --twinkle-min-opacity: ${(props) => props.$twinkleMinOpacity};
  --twinkle-max-opacity: ${(props) => props.$twinkleMaxOpacity};

  ${(props) =>
    props.$shouldTwinkle &&
    css`
      animation: ${twinkle} ${props.$duration}s linear infinite alternate;
      animation-delay: ${props.$delay}s;
    `}
`;