const fs = require('fs');
const glob = require('glob');

const { isArray, isFunction, isRegExp, isString } = require('./check-errors');
const {
  generateTest,
  getComponentName,
  getComponentStoriesNames,
  getTestDirectoryPath,
} = require('./helpers');

const pluginName = 'StorytestsWebpackPlugin';

class StorytestsWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.run.tap(pluginName, () => {
      const {
        generateFileName,
        componentNamePattern,
        storyFilesPath,
        storyNamePattern,
        testDirectoryPath,
        testFilePostfixes,
        testTemplate,
      } = this.options;

      this.checkArgs();

      glob(storyFilesPath, (err, matches) => {
        if (err) {
          throw err;
        }

        matches.forEach((filePath) => {
          if (!fs.existsSync(filePath)) {
            throw new Error(`File ${filePath} does not exist`);
          }

          const fileData = fs.readFileSync(filePath, 'utf8');
          const componentName = getComponentName(fileData, componentNamePattern);
          const componentStories = getComponentStoriesNames(fileData, storyNamePattern);

          const testDirectory = getTestDirectoryPath(filePath, testDirectoryPath);

          testFilePostfixes.forEach((postfix) => {
            if (isString(postfix)) {
              generateTest(
                testDirectory,
                generateFileName,
                componentName,
                componentStories,
                postfix,
                testTemplate
              );
            }
          });
        });
      });
    });
  }

  checkArgs() {
    const {
      generateFileName,
      componentNamePattern,
      storyFilesPath,
      storyNamePattern,
      testDirectoryPath,
      testFilePostfixes,
      testTemplate,
    } = this.options;

    if (!isRegExp(componentNamePattern)) {
      throw new Error(
        `Expected componentNamePattern to be regular expression but got ${componentNamePattern}`
      );
    }

    if (!isRegExp(storyNamePattern)) {
      throw new Error(
        `Expected storyNamePattern to be regular expression but got ${storyNamePattern}`
      );
    }

    if (!isString(storyFilesPath)) {
      throw new Error(`Expected storyFilesPath to be string but got ${storyFilesPath}`);
    }

    if (!isString(testDirectoryPath)) {
      throw new Error(`Expected testDirectoryPath to be string but got ${testDirectoryPath}`);
    }

    if (!isArray(testFilePostfixes)) {
      throw new Error(
        `Expected testFilePostfixes to be an array of string but got ${testFilePostfixes}`
      );
    }

    if (!isFunction(testTemplate)) {
      throw new Error(`Expected testTemplate to be a function but got ${testTemplate}`);
    }

    if (!isFunction(generateFileName)) {
      throw new Error(`Expected generateFileName to be a function but got ${generateFileName}`);
    }
  }
}

module.exports = StorytestsWebpackPlugin;
