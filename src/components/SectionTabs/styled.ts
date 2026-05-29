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
  border: 1px solid rgba(124, 145, 198, 0.42);
  border-bottom: 0;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(180deg, #0f1f4a 0%, #0a1535 100%)"
      : "linear-gradient(180deg, #050505 0%, #090909 100%)"};
  color: ${({ $active }) => ($active ? "#8fd3ff" : "#ecf2ff")};
  min-width: 170px;
  padding: 16px 22px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: -0.2px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  position: relative;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;

  ${({ $active }) =>
    $active &&
    `
      border-top: 4px solid #69c5ff;
      padding-top: 13px;
      z-index: 2;
      box-shadow: 0 -6px 16px rgba(64, 130, 255, 0.28);
    `}

  &:hover {
    color: ${({ $active }) => ($active ? "#c5eaff" : "#ffffff")};
  }

  &:focus-visible {
    outline: 2px solid #69c5ff;
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
  border: 1px solid rgba(124, 145, 198, 0.42);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.45);
  border-radius: 0 24px 24px 24px;
  padding: 30px 32px;

  --text-primary: #edf4ff;
  --text-secondary: #a7b6d7;
  --button-secondary-border: rgba(116, 136, 183, 0.45);
  --background: #000000;
  --foreground: #060b1c;

  @media (max-width: 720px) {
    padding: 20px 16px;
    border-radius: 0 18px 18px 18px;
  }
`;

export const ProductsPlaceholder = styled.p`
  color: #e8efff;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
`;