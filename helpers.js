const fs = require("fs");
const path = require("path");

const getComponentName = (fileContent, pattern) => {
  const match = fileContent.match(pattern);

  if (match === null) {
    throw new Error("Couldn't find component name, check componentNamePattern");
  }

  return match[0];
};

const getComponentStoriesNames = (fileContent, pattern) => {
  const match = fileContent.match(pattern);

  if (match === null) {
    throw new Error("Couldn't find story name, check storyNamePattern");
  }

  return match.map((storyName) => storyName.replace(/\s/gi, "-"));
};

const getTestDirectoryPath = (pathToStory, relatedPathToTestDirectory) =>
  path.resolve(pathToStory, relatedPathToTestDirectory);

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
  getTestDirectoryPath,
};
