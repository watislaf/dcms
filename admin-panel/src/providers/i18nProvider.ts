import { useTranslation } from 'react-i18next';
import { I18nProvider } from '@refinedev/core';

export const useI18nProvider = (): I18nProvider => {
    //@ts-ignore
    const { t, i18n } = useTranslation();

    return {
        // @ts-ignore
        translate: (key: string, options?: any) => t(key, options),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };
};
