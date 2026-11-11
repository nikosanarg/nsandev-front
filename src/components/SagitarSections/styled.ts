import styled from "styled-components";
import { AnimatedTabs } from "kaizen-lib/motion";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Title = styled.h2`
  font-family: var(--font-faculty-glyphic), serif;
  font-size: 28px;
  font-weight: 400;
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
// Pastilla de la lib con los colores del sitio: la elegida en el color del
// texto y la letra en el del fondo, como era la fila de botones propia.
export const SectionTabs = styled(AnimatedTabs)`
  --kz-accent: var(--text-primary);
  --kz-accent-fg: var(--background);
  --kz-surface-sunken: #0f0f0f;
  --kz-fg: var(--text-primary);
  --kz-fg-muted: var(--text-secondary);
  gap: 14px;

  [role="tablist"] {
    border: 1px solid var(--button-secondary-border);
  }

  [role="tab"] {
    min-height: 36px;
    padding: 8px 14px;
    font-size: 14px;
    line-height: 20px;

    @media (max-width: 600px) {
      padding: 8px 11px;
      font-size: 13px;
      line-height: 18px;
    }
  }
`;
