import styled from "styled-components";

export const Wrapper = styled.nav`
  display: inline-flex;
  align-items: center;
`;

export const StyledLangButton = styled.button`
  border: 1px solid rgba(100, 115, 145, 0.38);
  border-radius: 999px;
  background: linear-gradient(180deg, #07090f 0%, #0c0f17 100%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.32);

  img {
    border-radius: 999px;
    object-fit: cover;
  }

  &:hover {
    border-color: rgba(140, 168, 221, 0.5);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid #8ea2c7;
    outline-offset: 2px;
  }
`;