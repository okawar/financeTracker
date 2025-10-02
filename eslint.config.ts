import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: ["dist", "build", ".svelte-kit"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,svelte}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...svelte.configs["flat/recommended"],
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,svelte}"],
        plugins: { prettier },
        rules: {
            "prettier/prettier": "error",
        },
    },
]);
