import styled from "styled-components";

export const StyledLandingSectionWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-size: 28px;
    line-height: 34px;
    letter-spacing: -1px;
    color: var(--text-primary);
  }
`;


export const StyledSectionDescription = styled.p`
  max-width: 100%;
  font-size: 16px;
  line-height: 28px;
  color: var(--text-secondary);
`;
