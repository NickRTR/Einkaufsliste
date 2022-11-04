module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{html,js,svelte}'
	],
	swDest: 'src/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};