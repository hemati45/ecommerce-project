
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; 
import HttpBackend from 'i18next-http-backend';

// Initialize i18next
i18n
  .use(LanguageDetector)         // Detect user language
  .use(HttpBackend)              // Load translations from files
  .use(initReactI18next)         // Bind react-i18next to i18next
  .init({
    fallbackLng: 'en',           // Default language if the detected language is not available
    debug: true,                 // Enable for debugging
    interpolation: {
      escapeValue: false,        // React already escapes XSS by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',  // Path to the translation files
    },
  });

export default i18n;
