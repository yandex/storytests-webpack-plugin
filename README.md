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
   ```ts
   storyFilesPath: string; // e.g. "components/**/__stories__/*.stories.tsx"
   ```
2. pattern for component name in your story files
   ```ts
   componentNamePattern: RegExp; // e.g. /[a-z]+(?=", module)/gi
   ```
3. pattern for story name in your story files
   ```ts
   storyNamePattern: RegExp; // e.g. /[a-z ]+(?=", \(\) => )/gi
   ```
4. path to directory with tests related to story
   ```ts
   testDirectoryPath: string; // e.g." ../../tests"
   ```
5. postfixes for test files
   ```ts
   testFilePostfixes: string[]; // e.g. ['hermione']
   ```
6. whether to generate test files for each story or each component
   ```ts
   testGenerationStrategy: 'story' | 'component';
   ```
7. function for generating test file (`storyNames` is a `string` for `"story"` test generation strategy and `string[]` for `"component`")
   ```ts
   testTemplate: (componentName: string, storyNames: string | string[], postfix: string) =>
     string | false;
   ```
8. function for generating test file names
   ```ts
   generateFileName: (componentName: string, postfix: string) => string;
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
