import { defineConfig } from 'eslint/config';
import common from 'eslint-config-neon/common';
import node from 'eslint-config-neon/node';
import prettier from 'eslint-config-neon/prettier';
import typescript from 'eslint-config-neon/typescript';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import merge from 'lodash.merge';

const commonFiles = '{js,mjs,cjs,ts,mts,cts,jsx,tsx}';

const commonRuleset = merge(...common, { files: [`**/*${commonFiles}`] });

const nodeRuleset = merge(...node, {
	files: [`**/*${commonFiles}`],
	rules: {
		'no-restricted-globals': 0,
		'n/prefer-global/buffer': [2, 'never'],
		'n/prefer-global/console': [2, 'always'],
		'n/prefer-global/process': [2, 'never'],
		'n/prefer-global/text-decoder': [2, 'always'],
		'n/prefer-global/text-encoder': [2, 'always'],
		'n/prefer-global/url-search-params': [2, 'always'],
		'n/prefer-global/url': [2, 'always'],
	},
});

const nodeBinRuleset = {
	files: [`**/bin/*{js,mjs,cjs,ts,mts,cts}`],
	rules: {
		'n/shebang': [0],
	},
};

const typeScriptRuleset = merge(...typescript, {
	files: [`**/*${commonFiles}`],
	languageOptions: {
		parserOptions: {
			warnOnUnsupportedTypeScriptVersion: false,
			allowAutomaticSingleRunInference: true,
			project: ['tsconfig.eslint.json', 'apps/*/tsconfig.eslint.json', 'packages/*/tsconfig.eslint.json'],
		},
	},
	rules: {
		'@typescript-eslint/consistent-type-definitions': [2, 'interface'],
		'@typescript-eslint/naming-convention': [
			2,
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
				custom: {
					regex: '^\\w{3,}',
					match: true,
				},
			},
		],
	},
	settings: {
		'import-x/resolver-next': [
			createTypeScriptImportResolver({
				noWarnOnMultipleProjects: true,
				project: ['tsconfig.eslint.json', 'apps/*/tsconfig.eslint.json', 'packages/*/tsconfig.eslint.json'],
			}),
		],
	},
});

const prettierRuleset = merge(...prettier, { files: [`**/*${commonFiles}`] });

// const oxlintRuleset = merge({ rules: oxlint.rules }, { files: [`**/*${commonFiles}`] });

export default defineConfig(
	{
		ignores: [
			'**/node_modules/',
			'.git/',
			'**/dist/',
			'**/template/',
			'**/coverage/',
			'**/storybook-static/',
			'**/.next/',
			'**/shiki.bundle.ts',
		],
	},
	commonRuleset,
	nodeRuleset,
	nodeBinRuleset,
	typeScriptRuleset,
	{
		files: ['**/*{ts,mts,cts,tsx}'],
		rules: { 'jsdoc/no-undefined-types': 0 },
	},
	{
		files: ['**/*{js,mjs,cjs,jsx}'],
		rules: { 'tsdoc/syntax': 0 },
	},
	prettierRuleset,
	// oxlintRuleset,
);
