"use client";

import IFrame from "@/components/IFrame";
import * as S from "./styled";

type SagitarSection = {
  id: string;
  label: string;
  iframeTitle: string;
  src: string;
  height: number;
  responsiveAspectRatio?: boolean;
  aspectRatio?: number;
  description: string;
};

interface SagitarSectionsProps {
  title: string;
  description?: string;
}

const SECTIONS: SagitarSection[] = [
  {
    id: "alpha",
    label: "Alpha",
    iframeTitle: "Sagitar.io Alpha",
    src: "/bundles/sagitario/index.html",
    height: 600,
    responsiveAspectRatio: true,
    aspectRatio: 1200 / 600,
    description: "Alpha de Sagitar.io, para practicar con el canvas de Javascript.",
  },
  {
    id: "beta-v05",
    label: "Beta v0.5",
    iframeTitle: "Sagitar.io Beta v0.5",
    src: "/bundles/sagitar-io/index.html",
    height: 544,
    responsiveAspectRatio: true,
    aspectRatio: 16 / 9,
    description: "Beta de Sagitar.io, primer intento con sockets para hacer un multiplayer (bundle single-player).",
  },
];

export default function SagitarSections({
  title,
  description,
}: SagitarSectionsProps) {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.SectionTabs
        label="Versiones de Sagitar.io"
        variante="pastilla"
        items={SECTIONS.map((section) => ({
          id: section.id,
          etiqueta: section.label,
          contenido: (
            <S.Panel>
              <S.Description>{description ?? section.description}</S.Description>
              <IFrame
                title={section.iframeTitle}
                src={section.src}
                height={section.height}
                responsiveAspectRatio={section.responsiveAspectRatio}
                aspectRatio={section.aspectRatio}
              />
            </S.Panel>
          ),
        }))}
      />
    </S.Wrapper>
  );
}
