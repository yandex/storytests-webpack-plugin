const fs = require("fs");
var glob = require("glob");

const { isArray, isFunction, isRegExp, isString } = require("./check-errors");
const {
  getComponentName,
  getComponentStoriesNames,
  generateTest
} = require("./helpers");

const pluginName = "StorytestsWebpackPlugin";

class StorytestsWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      const {
        componentNamePattern,
        storyFilesPath,
        storyNamePattern,
        testDirectoryPath,
        testFilePostfixes,
        testTemplate
      } = this.options;

      isRegExp(componentNamePattern, "componentNamePattern");
      isRegExp(storyNamePattern, "storyNamePattern");
      isString(storyFilesPath, "storyFilesPath");
      isString(testDirectoryPath, "testDirectoryPath");
      isArray(testFilePostfixes, "testFilePostfixes");
      isFunction(testTemplate, "testTemplate");

      glob(storyFilesPath, (err, matches) => {
        if (err) {
          throw err;
        }

        matches.forEach(filePath => {
          if (!fs.existsSync(filePath)) {
            throw new Error(`File ${filePath} does not exist`);
          }

          const fileData = fs.readFileSync(filePath, "utf8");
          const componentName = getComponentName(
            fileData,
            componentNamePattern
          );
          const componentStories = getComponentStoriesNames(
            fileData,
            storyNamePattern
          );

          if (!fs.existsSync(testDirectoryPath)) {
            fs.mkdirSync(testDirectoryPath);
          }

          componentStories.forEach(story =>
            testFilePostfixes.forEach(postfix => {
              isString(postfix, "testFilePostfixes");

              generateTest(
                testDirectoryPath,
                componentName,
                story,
                postfix,
                testTemplate
              );
            })
          );
        });
      });
    });
  }
}

module.exports = StorytestsWebpackPlugin;
