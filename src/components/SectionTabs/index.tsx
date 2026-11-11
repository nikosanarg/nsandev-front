"use client";

import "@/i18n";
import { useTranslation } from "react-i18next";
import TabBiography from "./TabBiography";
import TabLegacy from "./TabLegacy";
import TabProducts from "./TabProducts";
import { SectionTabsRoot } from "./styled";

export default function SectionTabs() {
  const { t } = useTranslation();

  return (
    <SectionTabsRoot
      label={t("tabs.ariaLabel")}
      valorInicial="legacy"
      items={[
        { id: "biografia", etiqueta: t("tabs.biography"), contenido: <TabBiography /> },
        { id: "productos", etiqueta: t("tabs.products"), contenido: <TabProducts /> },
        { id: "legacy", etiqueta: t("tabs.legacy"), contenido: <TabLegacy /> },
      ]}
    />
  );
}
