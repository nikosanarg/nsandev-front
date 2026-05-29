import styled from "styled-components";

export const StyledVideoEmbedWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.65);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.45);
`;

export const StyledVideoFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
`;