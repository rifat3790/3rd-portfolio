import { usePortfolioStore } from '../store/usePortfolioStore';
import { translations, type TranslationsType } from '../i18n/translations';

export const useTranslation = () => {
  const { language } = usePortfolioStore();

  const t = (key: keyof TranslationsType): string => {
    return translations[language][key] || translations['en'][key] || key as string;
  };

  return { t, language };
};
