export const translate = async (language: string) => {
	let languageTranslation;

	if (language === "en-US") {
		languageTranslation = await import("$lib/translations/en_us");
		return languageTranslation.translation;
	}

	switch (language.substr(0, 2)) {
		case "de":
			languageTranslation = await import("$lib/translations/de");
			break;
		case "en":
			languageTranslation = await import("$lib/translations/en");
			break;
		case "es":
			languageTranslation = await import("$lib/translations/es");
			break;
		case "fr":
			languageTranslation = await import("$lib/translations/fr");
			break;
		case "zh":
			languageTranslation = await import("$lib/translations/zh");
			break;
		case "ar":
			languageTranslation = await import("$lib/translations/ar");
			break;
		case "jp":
			languageTranslation = await import("$lib/translations/jp");
			break;
		default:
			languageTranslation = await import("$lib/translations/en");
			break;
	}
	return languageTranslation.translation;
};
