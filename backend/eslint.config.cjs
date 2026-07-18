module.exports = {
	extends: ['eslint:recommended'],
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		'no-console': 'off',
	},
};
