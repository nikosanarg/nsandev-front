"use client";

import "@/i18n";
import Image from "next/image";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyledLangButton, Wrapper } from "./styled";

type SupportedLocale = "es" | "es-AR" | "pt" | "en";

const LANGUAGE_OPTIONS: {
  code: SupportedLocale;
  flag: string;
  translationKey: string;
}[] = [
  {
    code: "es",
    flag: "/assets/flagIcons/default.png",
    translationKey: "languageSwitcher.es",
  },
  {
    code: "es-AR",
    flag: "/assets/flagIcons/ar.png",
    translationKey: "languageSwitcher.es-AR",
  },
  {
    code: "pt",
    flag: "/assets/flagIcons/br.png",
    translationKey: "languageSwitcher.pt",
  },
  {
    code: "en",
    flag: "/assets/flagIcons/us.png",
    translationKey: "languageSwitcher.en",
  },
];

const normalizeLanguage = (language: string | undefined): SupportedLocale => {
  if (!language) {
    return "es";
  }

  const normalized = language.toLowerCase();

  if (normalized.startsWith("es-ar")) {
    return "es-AR";
  }

  if (normalized.startsWith("es")) {
    return "es";
  }

  if (normalized.startsWith("pt")) {
    return "pt";
  }

  if (normalized.startsWith("en")) {
    return "en";
  }

  return "es";
};

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem("language");
    if (!storedLanguage) {
      return;
    }

    const normalizedStoredLanguage = normalizeLanguage(storedLanguage);
    const normalizedCurrentLanguage = normalizeLanguage(
      i18n.resolvedLanguage ?? i18n.language
    );

    if (normalizedStoredLanguage !== normalizedCurrentLanguage) {
      i18n.changeLanguage(normalizedStoredLanguage);
      localStorage.setItem("nsandev-lng", normalizedStoredLanguage);
    }
  }, [i18n]);

  const handleLanguageChange = () => {
    const currentIndex = LANGUAGE_OPTIONS.findIndex(
      (option) => option.code === activeLanguage
    );
    const nextIndex = (currentIndex + 1) % LANGUAGE_OPTIONS.length;
    const nextLanguage = LANGUAGE_OPTIONS[nextIndex].code;

    i18n.changeLanguage(nextLanguage);
    sessionStorage.setItem("language", nextLanguage);
    localStorage.setItem("nsandev-lng", nextLanguage);
  };

  const activeLanguage = normalizeLanguage(
    i18n.resolvedLanguage ?? i18n.language
  );

  const currentOption =
    LANGUAGE_OPTIONS.find((option) => option.code === activeLanguage) ??
    LANGUAGE_OPTIONS[0];

  return (
    <Wrapper aria-label={t("languageSwitcher.ariaLabel")}>
      <StyledLangButton
        type="button"
        onClick={handleLanguageChange}
        aria-label={t(currentOption.translationKey)}
        title={t(currentOption.translationKey)}
      >
        <Image
          src={currentOption.flag}
          alt={t(currentOption.translationKey)}
          width={28}
          height={28}
          priority
        />
      </StyledLangButton>
    </Wrapper>
  );
}