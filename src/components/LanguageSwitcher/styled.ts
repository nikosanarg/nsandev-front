import styled from "styled-components";

export const Wrapper = styled.nav`
  display: inline-flex;
  align-items: center;
`;

/**
 * Recorte propio de la bandera: sin esto se ve un cuadrado apoyado sobre el
 * círculo de `IconButton`/`Relieve` (kaizen-lib). El resto de lo que tenía
 * `ConchaBoton` —border, degradé, sombra, el `:hover` con `translateY`— era
 * exactamente el relieve neumórfico que ahora trae `Relieve`.
 */
export const Bandera = styled.span`
  display: inline-flex;

  img {
    border-radius: 999px;
    object-fit: cover;
  }
`;