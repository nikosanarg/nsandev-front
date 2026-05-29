"use client";

import "@/i18n";
import type { ComponentType } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TabBiography from "./TabBiography";
import TabLegacy from "./TabLegacy";
import TabProducts from "./TabProducts";
import { Panel, TabButton, TabsRow, Wrapper } from "./styled";

type SectionTabId = "biografia" | "productos" | "legacy";

const TABS: { id: SectionTabId; labelKey: string }[] = [
  { id: "biografia", labelKey: "tabs.biography" },
  { id: "productos", labelKey: "tabs.products" },
  { id: "legacy", labelKey: "tabs.legacy" },
];

const TAB_COMPONENTS: Record<SectionTabId, ComponentType> = {
  biografia: TabBiography,
  productos: TabProducts,
  legacy: TabLegacy,
};

export default function SectionTabs() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<SectionTabId>("legacy");
  const ActiveTabComponent = TAB_COMPONENTS[activeTab];

  return (
    <Wrapper>
      <TabsRow role="tablist" aria-label={t("tabs.ariaLabel")}>
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <TabButton
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              $active={isActive}
              onClick={() => setActiveTab(tab.id)}
            >
              {t(tab.labelKey)}
            </TabButton>
          );
        })}
      </TabsRow>

      <Panel>
        <ActiveTabComponent />
      </Panel>
    </Wrapper>
  );
}