"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Panel, ProductsPlaceholder, TabButton, TabsRow, Wrapper } from "./styled";

type SectionTabId = "legacy" | "productos";

type SectionTabsProps = {
  children: ReactNode;
};

const TABS: { id: SectionTabId; label: string }[] = [
  { id: "legacy", label: "Legacy" },
  { id: "productos", label: "Productos" },
];

export default function SectionTabs({ children }: SectionTabsProps) {
  const [activeTab, setActiveTab] = useState<SectionTabId>("legacy");

  return (
    <Wrapper>
      <TabsRow role="tablist" aria-label="Secciones del portfolio">
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
              {tab.label}
            </TabButton>
          );
        })}
      </TabsRow>

      <Panel>
        {activeTab === "legacy" ? (
          children
        ) : (
          <ProductsPlaceholder>
            Cargando proyectos en producción o en proceso de desploy
            productivo
          </ProductsPlaceholder>
        )}
      </Panel>
    </Wrapper>
  );
}