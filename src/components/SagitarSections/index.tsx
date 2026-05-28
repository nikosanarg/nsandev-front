"use client";

import { useMemo, useState } from "react";
import IFrame from "@/components/IFrame";
import Tabs, { type TabOption } from "@/components/Tabs";
import * as S from "./styled";

type SagitarSectionId = "alpha" | "beta-v05";

type SagitarSection = {
  id: SagitarSectionId;
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
    description: "Primera version Alpha de Sagitar.io.",
  },
  {
    id: "beta-v05",
    label: "Beta v0.5",
    iframeTitle: "Sagitar.io Beta v0.5",
    src: "/bundles/sagitar-io/index.html",
    height: 544,
    responsiveAspectRatio: true,
    aspectRatio: 16 / 9,
    description: "Version beta v0.5, estatica y deploy-safe para portfolio.",
  },
];

export default function SagitarSections({
  title,
  description,
}: SagitarSectionsProps) {
  const [activeSectionId, setActiveSectionId] = useState<SagitarSectionId>(
    SECTIONS[0].id
  );

  const tabOptions = useMemo<TabOption<SagitarSectionId>[]>(
    () =>
      SECTIONS.map((section) => ({
        value: section.id,
        label: section.label,
      })),
    []
  );

  const activeSection =
    SECTIONS.find((section) => section.id === activeSectionId) ?? SECTIONS[0];

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>{title}</S.Title>
        <Tabs<SagitarSectionId>
          ariaLabel="Versiones de Sagitar.io"
          options={tabOptions}
          value={activeSectionId}
          onChange={setActiveSectionId}
        />
      </S.Header>

      <S.Panel>
        <S.Description>{description ?? activeSection.description}</S.Description>
        <IFrame
          title={activeSection.iframeTitle}
          src={activeSection.src}
          height={activeSection.height}
          responsiveAspectRatio={activeSection.responsiveAspectRatio}
          aspectRatio={activeSection.aspectRatio}
        />
      </S.Panel>
    </S.Wrapper>
  );
}