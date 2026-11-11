import type { ReactNode } from "react";
import { Spotlight } from "kaizen-lib/efectos";
import IFrame from "../IFrame";
import SagitarSections from "../SagitarSections";
import {
  StyledLandingSectionWrapper,
  StyledSectionDescription,
} from "./styled";

interface LandingSectionProps {
  title: string;
  src?: string;
  height?: number | string;
  description?: string;
  children?: ReactNode;
}

// Halo en el violeta de las estrellas, bajo: acompaña al puntero sin tapar el
// contenido. Quieto arriba al centro en táctil y con reduced-motion.
const HALO = "rgba(187, 127, 255, 0.10)";

const LandingSection = ({
  title,
  src,
  height,
  description,
  children,
}: LandingSectionProps) => {
  if (!src && !children) {
    return (
      <Spotlight color={HALO} style={{ borderRadius: 24 }}>
        <SagitarSections title={title} description={description} />
      </Spotlight>
    );
  }

  const content = children ??
    (src ? <IFrame title={title} src={src} height={height} /> : null);

  return (
    <Spotlight color={HALO} style={{ borderRadius: 24 }}>
      <StyledLandingSectionWrapper>
        <h2>{title}</h2>
        {description ? (
          <StyledSectionDescription>{description}</StyledSectionDescription>
        ) : null}
        {content}
      </StyledLandingSectionWrapper>
    </Spotlight>
  );
};

export default LandingSection;
