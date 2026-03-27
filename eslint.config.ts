import js from "@eslint/js";
import markdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    // Base JavaScript recommended settings
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },
        rules: {
            "no-empty": ["warn", { allowEmptyCatch: true }],
            "no-var": "warn",
            "prefer-const": "warn",
        },
    },

    // Base TypeScript recommended settings
    {
        files: ["**/*.{ts,mts,cts,tsx}"],
        plugins: { "@typescript-eslint": tseslint.plugin },
        extends: [tseslint.configs.recommendedTypeChecked],
        languageOptions: { parserOptions: { projectService: true } },
        rules: {
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/consistent-type-imports": [
                "warn",
                { prefer: "type-imports", disallowTypeAnnotations: false },
            ],
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/strict-boolean-expressions": [
                "error",
                { allowNullableString: true, allowNullableNumber: true },
            ],
        },
    },

    // Configurations for other file types
    {
        files: ["**/*.md"],
        plugins: { markdown },
        language: "markdown/gfm",
        extends: ["markdown/recommended"],
    },

    // Test files configuration
    {
        files: ["tests/**/*.{js,ts}", "**/*.test.{js,ts}", "**/*.spec.{js,ts}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                describe: "readonly",
                it: "readonly",
                test: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
                beforeAll: "readonly",
                afterAll: "readonly",
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },

    // Ignore build and dependency directories
    {
        ignores: [
            "dist",
            "node_modules",
            "samples",
            "static"
        ],
    },
]);

// const testStrictBooleanExpressionsArray = [];
// if (testStrictBooleanExpressionsArray) {
// }
// const testStrictBooleanExpressionsObject = {};
// if (testStrictBooleanExpressionsObject) {
// }
