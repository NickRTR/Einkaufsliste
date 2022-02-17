export const translate = async (language) => {
    let languageTranslation;

    switch (language.substr(0,2)) {
        case "de":
            languageTranslation = await import("$lib/translations/de");
            return languageTranslation.translation;
        case "en":
            languageTranslation = await import("$lib/translations/en");
            return languageTranslation.translation;
        default:
            languageTranslation = await import("$lib/translations/en");
            return languageTranslation.translation;
    }
}