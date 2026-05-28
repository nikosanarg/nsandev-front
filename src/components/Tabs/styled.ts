import styled from "styled-components";

type TabButtonProps = {
  $active: boolean;
};

type TabsRootProps = {
  $fullWidth: boolean;
};

export const TabsRoot = styled.nav<TabsRootProps>`
  display: inline-flex;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  min-width: 0;
`;

export const TabList = styled.div`
  display: inline-flex;
  align-self: flex-start;
  flex-wrap: nowrap;
  gap: 6px;
  padding: 4px;
  border-radius: 999px;
  border: 1px solid var(--button-secondary-border);
  background-color: #f5f5f5;

  @media (prefers-color-scheme: dark) {
    background-color: #0f0f0f;
  }
`;

export const TabButton = styled.button<TabButtonProps>`
  border: 0;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? "var(--text-primary)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--background)" : "var(--text-secondary)"};
  padding: 8px 14px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:focus-visible {
    outline: 2px solid #0f172a;
    outline-offset: 2px;
  }

  &:hover {
    color: ${({ $active }) =>
      $active ? "var(--background)" : "var(--text-primary)"};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    padding: 8px 11px;
    font-size: 13px;
    line-height: 18px;
  }

  @media (prefers-color-scheme: dark) {
    &:focus-visible {
      outline-color: #e2e8f0;
    }
  }
`;