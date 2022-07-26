export const translate = async (language) => {
	let languageTranslation;

	if (language === "en-US") {
		languageTranslation = await import("$lib/translations/en_us");
		return languageTranslation.translation;
	}

	switch (language.substr(0, 2)) {
		case "de":
			languageTranslation = await import("$lib/translations/de");
		case "en":
			languageTranslation = await import("$lib/translations/en");
		case "es":
			languageTranslation = await import("$lib/translations/es");
		case "fr":
			languageTranslation = await import("$lib/translations/fr");
		case "zh":
			languageTranslation = await import("$lib/translations/zh");
		case "ar":
			languageTranslation = await import("$lib/translations/ar");
		case "jp":
			languageTranslation = await import("$lib/translations/jp");
		default:
			languageTranslation = await import("$lib/translations/en");
	}
	return languageTranslation.translation;
};
