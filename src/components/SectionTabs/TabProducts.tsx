"use client";

import "@/i18n";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  ProjectsGrid,
  ProjectCard,
  ProjectImageWrapper,
  ProjectInfo,
  ProjectTitle,
  ProjectDescription,
  ProjectLink,
} from "./styled";

export default function TabProducts() {
  const { t } = useTranslation();

  return (
    <ProjectsGrid>
      <ProjectCard href="https://mundokaizen.org" target="_blank" rel="noopener noreferrer">
        <ProjectImageWrapper>
          <Image
            src="/assets/projects/kaizen-community.png"
            alt={t("products.kaizen.title")}
            fill
            sizes="(max-width: 720px) 100vw, 320px"
            style={{ objectFit: "cover" }}
          />
        </ProjectImageWrapper>
        <ProjectInfo>
          <ProjectTitle>{t("products.kaizen.title")}</ProjectTitle>
          <ProjectDescription>{t("products.kaizen.description")}</ProjectDescription>
          <ProjectLink>{t("products.kaizen.link")}</ProjectLink>
        </ProjectInfo>
      </ProjectCard>
    </ProjectsGrid>
  );
}
