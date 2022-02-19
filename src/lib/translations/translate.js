export const translate = async (language) => {
    let languageTranslation;
    
    if (language === "en-US") {
        languageTranslation = await import("$lib/translations/en_us");
        return languageTranslation.translation;
    }

    switch (language.substr(0,2)) {
        case "de":
            languageTranslation = await import("$lib/translations/de");
            return languageTranslation.translation;
        case "en":
            languageTranslation = await import("$lib/translations/en");
            return languageTranslation.translation;
        case "fr":
            languageTranslation = await import("$lib/translations/fr");
            return languageTranslation.translation;
        default:
            languageTranslation = await import("$lib/translations/en");
            return languageTranslation.translation;
    }
}