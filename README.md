[![Travis][build-badge]][build]

[build-badge]: https://img.shields.io/travis/yandex/storytests-webpack-plugin/master.png?style=flat-square
[build]: https://travis-ci.org/yandex/storytests-webpack-plugin

# Storytests Webpack Plugin

If you use Storybook and you want to cover all your stories by tests, this plugin helps you to do this.  
This plugin creates test files based on your Storybook structure.

## Installation

```bash
npm i storytests-webpack-plugin --save-dev
```

## Usage

### Define parameters

1. path to stories
   ```js
   storyFilesPath: string; // e.g. "components/**/__stories__/*.stories.tsx"
   ```
2. pattern for component name in your story files
   ```js
   componentNamePattern: RegExp; // e.g. /[a-z]+(?=", module)/gi
   ```
3. pattern for story name in your story files
   ```js
   storyNamePattern: RegExp; // e.g. /[a-z ]+(?=", \(\) => )/gi
   ```
4. path to directory with tests related to story
   ```js
   testDirectoryPath: string; // e.g." ../../tests"
   ```
5. postfixes for test files
   ```js
   testFilePostfixes: string[]; // e.g. ['hermione']
   ```
6. function for generating test file
   ```js
   testTemplate: (componentName: string, storyName: string) => string;
   ```

### Add the plugin to your webpack config

```js
import StorytestsWebpackPlugin from 'storytests-webpack-plugin';
import { componentNamePattern, storyFilesPath, storyNamePattern, testDirectoryPath, testFilePostfixes } from './constants/';
import { testTemplate } from './helpers/';
...
module.exports = {
    ...
    plugins: [
        new StorytestsWebpackPlugin({
            componentNamePattern,
            storyFilesPath,
            storyNamePattern,
            testDirectoryPath,
            testFilePostfixes,
            testTemplate
        })
    ]
}
```

## For contributors

Required Node.js version: 12.18.0  
Required npm version: 6.14.4  
How to install: https://nodejs.org/en/download/

## How to publish

1. Update package version in `package.json` and `package-lock.json`

2. Run:

```
npm run build
npm publish
```
