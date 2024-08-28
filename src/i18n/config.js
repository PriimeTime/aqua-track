// src/i18n/config.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "react-native-localize";
import en from "./locales/en.json";

const resources = {
  en: {
    translation: en,
  },
  // fr: {
  //   translation: fr,
  // },
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
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes content
    },
  });

export default i18n;
