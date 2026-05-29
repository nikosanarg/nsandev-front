"use client";

import "@/i18n";
import HorizontalSeparator from "@/components/HorizontalSeparator";
import LandingSection from "@/components/LandingSection";
import VideoEmbed from "@/components/VideoEmbed";
import { useTranslation } from "react-i18next";

export default function TabLegacy() {
  const { t } = useTranslation();

  return (
    <>
      <LandingSection
        title={t("legacy.santandev.title")}
        description={t("legacy.santandev.description")}
      >
        <VideoEmbed
          title={t("legacy.santandev.videoTitle")}
          videoId="Yxdsu-RWsPc"
        />
      </LandingSection>

      <HorizontalSeparator />

      <LandingSection
        title={t("legacy.jodalok.title")}
        description={t("legacy.jodalok.description")}
      >
        <VideoEmbed
          title={t("legacy.jodalok.videoTitle")}
          videoId="rAozYkxoGSo"
        />
      </LandingSection>

      <HorizontalSeparator />

      <LandingSection
        title={t("legacy.astrohooks.title")}
        src="/bundles/astrohooks/index.html"
        height={520}
      />

      <HorizontalSeparator />

      <LandingSection title={t("legacy.sagitar.title")} />
    </>
  );
}