import type { ReactNode } from "react";
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

const LandingSection = ({
  title,
  src,
  height,
  description,
  children,
}: LandingSectionProps) => {
  if (!src && !children) {
    return <SagitarSections title={title} description={description} />;
  }

  const content = children ??
    (src ? <IFrame title={title} src={src} height={height} /> : null);

  return (
    <StyledLandingSectionWrapper>
      <h2>{title}</h2>
      {description ? (
        <StyledSectionDescription>{description}</StyledSectionDescription>
      ) : null}
      {content}
    </StyledLandingSectionWrapper>
  );
};

export default LandingSection;