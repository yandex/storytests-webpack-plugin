[![Travis][build-badge]][build]

[build-badge]: https://img.shields.io/travis/yandex/storytests-webpack-plugin/tests.png?style=flat-square
[build]: https://travis-ci.org/yandex/storytests-webpack-plugin

# Storytests Webpack Plugin

Plugin gives component and its' stories names and based on this creates test files.

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
