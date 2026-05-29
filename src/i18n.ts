"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import esArTranslation from "./locales/es-AR/translation.json";
import esTranslation from "./locales/es/translation.json";
import ptTranslation from "./locales/pt/translation.json";

const isDevelopment = process.env.NODE_ENV === "development";

const resources = {
  es: {
    translation: esTranslation,
  },
  "es-AR": {
    translation: esArTranslation,
  },
  pt: {
    translation: ptTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: "es",
      fallbackLng: "es",
      supportedLngs: ["es", "es-AR", "pt", "en"],
      nonExplicitSupportedLngs: true,
      load: "all",
      debug: isDevelopment,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
        lookupLocalStorage: "nsandev-lng",
      },
    });
}

export default i18n;