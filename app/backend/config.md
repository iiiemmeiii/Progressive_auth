
https://medium.com/@mernstackdevbykevin/an-ultimate-typescript-project-structure-2026-edition-4a2d02faf2e0

##########################################################################################################
#### 1 : Creating a .nvmrc file
	- node -v > .nvmrc
	- nvm install
	- nvm use


##########################################################################################################
#### 2 : Initialize a package.json file
	- npm init -y (type: module)

##########################################################################################################
Installing Express
	- npm install dotenv express compression --save   

##########################################################################################################
#### 3 : Installing TypeScript
	- npm i -D typescript @types/node @types/express @tsconfig/node22 @/typesb/compression
	- npx tsc --init
	- {
  		"extends": "@tsconfig/node22/tsconfig.json",
  		"compilerOptions": {
    		"outDir": "./dist",
    		"rootDir": "./"
  	  	},
  	"include": ["**/*.ts"],
  	"exclude": ["dist"]
	}
	- npx tsc

##########################################################################################################
#### 4 :
Running TypeScript files
	- npm i -D tsx
	- npx tsx src/server.ts



##########################################################################################################
#### 5 : Installing Prettier
	- npm i -D prettier
	- echo '{}' > .prettierrc

##########################################################################################################
#### 6 : VS Code configuration files
	- mkdir .vscode
	- cd .vscode
	- touch extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next"
  ]
}

	- touch settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}


##########################################################################################################
#### 7 : Installing ESLint
	- npm i -D eslint typescript-eslint @eslint/js eslint-plugin-perfectionist eslint-config-prettier globals
	- touch eslint.config.js
##################################################
import eslintjs from '@eslint/js';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ["src/**/*.js"],
  },
  eslintjs.configs.recommended,
  ...tseslint.configs.recommended,
  perfectionist.configs['recommended-natural'],
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
 {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn'
    },
  },
  prettierConfig, // toujours en dernier, désactive les règles de style conflictuelles
);



##########################################################################################################
#### 8 :
Running package.json scripts

"scripts": {
    "dev": "tsx --watch src/index.ts",
    "start": "node dist/index.js",
    "build": "tsc",
    "type-check": "tsc --noEmit",
    "lint": "eslint .",
    "lint:fix": "eslint --fix .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
  },

##########################################################################################################
#### 9 : Adding subpath imports
src/
├── middlewares/
│   └── middlewares.ts
└── subfolder/
   └── subsubfolder/
       └── app/
           └── index.ts

"imports": {
    "#*": "./src/*"
  }
import { middleware } from "../../../middlewares/middlewares.js" => import { middleware } from "#middlewares/middlewares.js";

Prior to TypeScript 5.4, the most common approach for absolute imports was to use the “paths” option in tsconfig.json.

{
  "extends": "@tsconfig/node-22/tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
    }
  },
  "include": ["src/**/*"]
}
##########################################################################################################
#### 10 :  Adding environment variables
Adding tests with Vitest
Updating .gitignore and licence files
Commiting with Husky and lint-staged
Continuous integration with Github Actions