export const translate = async (language) => {
	let languageTranslation;

	if (language === "en-US") {
		languageTranslation = await import("$lib/translations/en_us");
		return languageTranslation.translation;
	}

	switch (language.substr(0, 2)) {
		case "de":
			languageTranslation = await import("$lib/translations/de");
			return languageTranslation.translation;
		case "en":
			languageTranslation = await import("$lib/translations/en");
			return languageTranslation.translation;
		case "es":
			languageTranslation = await import("$lib/translations/es");
			return languageTranslation.translation;
		case "fr":
			languageTranslation = await import("$lib/translations/fr");
			return languageTranslation.translation;
		case "zh":
			languageTranslation = await import("$lib/translations/zh");
			return languageTranslation.translation;
		case "ar":
			languageTranslation = await import("$lib/translations/ar");
			return languageTranslation.translation;
		case "jp":
			languageTranslation = await import("$lib/translations/jp");
			return languageTranslation.translation;
		default:
			languageTranslation = await import("$lib/translations/en");
			return languageTranslation.translation;
	}
};
