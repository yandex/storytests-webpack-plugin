const fs = require("fs");
var glob = require("glob");

const {
  checkArray,
  checkFunction,
  checkRegExp,
  checkString
} = require("./check-errors");
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

      checkRegExp(componentNamePattern, "componentNamePattern");
      checkRegExp(storyNamePattern, "storyNamePattern");
      checkString(storyFilesPath, "storyFilesPath");
      checkString(testDirectoryPath, "testDirectoryPath");
      checkArray(testFilePostfixes, "testFilePostfixes");
      checkFunction(testTemplate, "testTemplate");

      glob(storyFilesPath, (err, matches) => {
        if (err) {
          throw err;
        }

        matches.forEach(filePath => {
          if (!fs.existsSync(filePath)) {
            throw new Error(`File ${filePath} does not exist`);
          }

          const fileData = fs.readFileSync(filePath, "utf8");
          const dataWithoutSpaces = fileData.replace(/\s/g, "");
          const componentName = getComponentName(
            dataWithoutSpaces,
            componentNamePattern
          );
          const componentStories = getComponentStoriesNames(
            dataWithoutSpaces,
            storyNamePattern
          );

          if (!fs.existsSync(testDirectoryPath)) {
            fs.mkdirSync(testDirectoryPath);
          }

          componentStories.forEach(story =>
            testFilePostfixes.forEach(postfix => {
              checkString(postfix, "testFilePostfixes");

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
