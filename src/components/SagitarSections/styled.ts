import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

export const Title = styled.h2`
  font-size: 28px;
  line-height: 34px;
  letter-spacing: -1px;
  color: var(--text-primary);
  white-space: nowrap;
`;

export const Panel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Description = styled.p`
  max-width: 100%;
  font-size: 15px;
  line-height: 24px;
  color: var(--text-secondary);

  @media (max-width: 600px) {
    font-size: 14px;
    line-height: 22px;
  }
`;