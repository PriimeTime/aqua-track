// src/i18n/config.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "react-native-localize";
import en from "./locales/en.json";
import de from "./locales/de.json";
import hu from "./locales/hu.json";

const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  hu: {
    translation: hu,
  },
};

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    const locales = getLocales();
    callback(locales[0].languageTag);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes content
    },
  });

export default i18n;
