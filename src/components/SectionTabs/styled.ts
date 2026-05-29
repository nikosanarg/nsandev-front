import styled from "styled-components";

type TabButtonProps = {
  $active: boolean;
};

export const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TabsRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  overflow-x: auto;
  padding-right: 8px;
  padding-left: 2px;
`;

export const TabButton = styled.button<TabButtonProps>`
  border: 0px solid rgba(102, 118, 150, 0.36);
  border-bottom: 0;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(180deg, #202b43 0%, #141d33 100%)"
      : "linear-gradient(180deg, #07090f 0%, #0c0f17 100%)"};
  color: ${({ $active }) => ($active ? "#b8c8e2" : "#c9d3e3")};
  min-width: 170px;
  padding: 16px 22px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
  font-family: var(--font-faculty-glyphic), serif;
  letter-spacing: -0.2px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  position: relative;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;

  ${({ $active }) =>
    $active &&
    `
      padding-top: 13px;
      z-index: 2;
    `}

  &:hover {
    color: ${({ $active }) => ($active ? "#cfdbec" : "#e3e9f4")};
  }

  &:focus-visible {
    outline: 2px solid #8ea2c7;
    outline-offset: 2px;
  }

  @media (max-width: 720px) {
    min-width: 130px;
    padding: 13px 16px;
    font-size: 14px;
    line-height: 18px;

    ${({ $active }) =>
      $active &&
      `
        padding-top: 10px;
      `}
  }
`;

export const Panel = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #020308 0%, #060b1c 100%);
  border: 0px solid rgba(102, 118, 150, 0.36);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.45);
  border-radius: 0 36px 36px 36px;
  padding: 30px 32px;
  margin-bottom: 1rem;

  --text-primary: #e4ebf7;
  --text-secondary: #98a7c1;
  --button-secondary-border: rgba(100, 115, 145, 0.45);
  --background: #000000;
  --foreground: #060b1c;

  @media (max-width: 720px) {
    padding: 20px 16px;
    border-radius: 0 18px 18px 18px;
  }
`;

export const ProductsPlaceholder = styled.p`
  color: #d8e2f3;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
`;

export const BiographyQuestions = styled.div`
  width: 100%;
  display: grid;
  gap: 12px;
`;

export const BiographyQuestion = styled.p`
  color: #d6e0f1;
  font-size: 17px;
  line-height: 28px;
  font-weight: 500;
  background: rgba(24, 34, 56, 0.62);
  border: 1px solid rgba(110, 127, 162, 0.4);
  border-radius: 16px;
  padding: 12px 14px;
`;