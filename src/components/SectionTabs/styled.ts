import styled from "styled-components";
import { Tabs } from "kaizen-lib/ui";

// Pestañas de carpeta pegadas al panel: la lib da roles, teclado y paneles;
// acá sólo va el aspecto, con selectores de hijo directo para no pintar las
// pestañas anidadas (Sagitar.io). Sin indicador: la elegida se marca con su fondo.
export const SectionTabsRoot = styled(Tabs)`
  width: 100%;
  gap: 0;

  > [role="tablist"] {
    align-items: flex-end;
    gap: 10px;
    padding-right: 8px;
    padding-left: 2px;
    box-shadow: none;
  }

  > [role="tablist"] > [data-indicador] {
    display: none;
  }

  > [role="tablist"] > [role="tab"] {
    background: linear-gradient(180deg, #07090f 0%, #0c0f17 100%);
    color: #c9d3e3;
    min-width: 170px;
    min-height: 0;
    padding: 16px 22px;
    font-size: 20px;
    line-height: 20px;
    font-weight: 500;
    font-family: var(--font-faculty-glyphic), serif;
    letter-spacing: -0.2px;
    border-radius: 18px 18px 0 0;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover:not(:disabled) {
      color: #e3e9f4;
    }

    &[aria-selected="true"] {
      background: linear-gradient(180deg, #202b43 0%, #141d33 100%);
      color: #b8c8e2;
      padding-top: 13px;
      z-index: 2;

      &:hover {
        color: #cfdbec;
      }
    }

    &:focus-visible {
      outline-color: #8ea2c7;
    }
  }

  > [role="tabpanel"] {
    width: 100%;
    background: linear-gradient(180deg, #020308 0%, #060b1c 100%);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.45);
    border-radius: 0 36px 36px 36px;
    padding: 30px 32px;
    margin-bottom: 1rem;

    --text-primary: #e4ebf7;
    --text-secondary: #98a7c1;
    --button-secondary-border: rgba(100, 115, 145, 0.45);
    --background: #000000;
    --foreground: #060b1c;
  }

  @media (max-width: 720px) {
    > [role="tablist"] > [role="tab"] {
      min-width: 130px;
      padding: 13px 16px;
      font-size: 14px;
      line-height: 18px;

      &[aria-selected="true"] {
        padding-top: 10px;
      }
    }

    > [role="tabpanel"] {
      padding: 20px 16px;
      border-radius: 0 18px 18px 18px;
    }
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

export const ProjectsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

export const ProjectCard = styled.a`
  display: flex;
  flex-direction: column;
  background: rgba(24, 34, 56, 0.62);
  border: 1px solid rgba(110, 127, 162, 0.4);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: rgba(142, 162, 199, 0.8);
    transform: translateY(-2px);
  }
`;

export const ProjectImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #060b1c;
`;

export const ProjectInfo = styled.div`
  padding: 14px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ProjectTitle = styled.h3`
  color: #e4ebf7;
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  margin: 0;
`;

export const ProjectDescription = styled.p`
  color: #98a7c1;
  font-size: 15px;
  line-height: 22px;
  margin: 0;
`;

export const ProjectLink = styled.span`
  color: #8ea2c7;
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
`;