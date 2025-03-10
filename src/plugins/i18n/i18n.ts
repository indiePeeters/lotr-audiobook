import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const loadTranslations = async (lang: string): Promise<Record<string, any>> => {
  const featureModules = import.meta.glob<{ default: any }>('/src/features/**/*.translations.ts');
  const translations: Record<string, any> = {};

  for (const path in featureModules) {
    const featureName = path.split('/')[2];
    const featureTranslations = await featureModules[path]();

    if (!translations[lang]) {
      translations[lang] = {};
    }

    translations[lang][featureName] = featureTranslations.default;
  }

  return translations;
};

export const initializeI18n = async () => {
  const translations = await loadTranslations('en');

  i18n
    .use(initReactI18next)
    .init({
      resources: translations,
      lng: 'en', // Default language
      fallbackLng: 'en', // Fallback language
      interpolation: {
        escapeValue: false, // React already escapes values
      },
    });
};

initializeI18n();
export default i18n