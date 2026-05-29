import styled from "styled-components";

export const StyledLandingSectionWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-family: var(--font-faculty-glyphic), serif;
    font-size: 28px;
    font-weight: 400;
    line-height: 34px;
    letter-spacing: -1px;
    color: var(--text-primary);
  }
`;


export const StyledSectionDescription = styled.p`
  max-width: 40rem;
  font-size: 16px;
  line-height: 16px;
  color: var(--text-secondary);
`;
