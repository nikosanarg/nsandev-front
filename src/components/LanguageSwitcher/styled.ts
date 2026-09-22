import styled from "styled-components";

export const Wrapper = styled.nav`
  display: inline-flex;
  align-items: center;
`;

/**
 * La concha del botón: border, degradé y sombra que tenía `StyledLangButton`.
 * Sobrevive como wrapper porque `IconButton` de kaizen-lib descansa
 * transparente y este sitio no tiene otra superficie contra la cual
 * recortarse (fondo `#000` puro) — sin este borde el círculo desaparece en
 * reposo. El click, el foco y el aria pasan a ser enteramente de
 * `IconButton`; acá sólo queda lo cosmético.
 */
export const ConchaBoton = styled.span`
  display: inline-flex;
  border: 1px solid rgba(100, 115, 145, 0.38);
  border-radius: 999px;
  background: linear-gradient(180deg, #07090f 0%, #0c0f17 100%);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.32);
  transition: border-color 0.2s ease, transform 0.2s ease;

  img {
    border-radius: 999px;
    object-fit: cover;
  }

  &:hover {
    border-color: rgba(140, 168, 221, 0.5);
    transform: translateY(-1px);
  }
`;