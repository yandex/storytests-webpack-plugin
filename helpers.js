const fs = require("fs");
const path = require("path");

const getComponentName = (fileContent, pattern) =>
  fileContent.match(pattern)[0];

const getComponentStoriesNames = (fileContent, pattern) =>
  fileContent.match(pattern).map(storyName => storyName.replace(/\s/ig, "-"));

const getTestDirectoryPath = (pathToStory, relatedPath) =>
  path.resolve(pathToStory, relatedPath);

const generateTest = (
  testDirectoryPath,
  componentName,
  componentStoryName,
  postfix,
  testTemplate
) => {
  const testPath = path.resolve(
    testDirectoryPath,
    `${componentStoryName}.${postfix}.js`
  );

  if (fs.existsSync(testPath)) {
    return;
  }

  fs.createWriteStream(testPath, "utf8");
  fs.writeFileSync(
    testPath,
    testTemplate(componentName, componentStoryName),
    "utf8"
  );
};

module.exports = {
  generateTest,
  getComponentName,
  getComponentStoriesNames,
  getTestDirectoryPath
};
