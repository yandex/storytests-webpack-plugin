const fs = require('fs');
const path = require('path');

const getComponentName = (fileContent, pattern) => {
  const matches = fileContent.match(pattern);

  if (matches === null) {
    throw new Error("Couldn't find component name, check componentNamePattern");
  }

  return matches[0];
};

const getComponentStoriesNames = (fileContent, pattern) => {
  const matches = fileContent.match(pattern);

  if (matches === null) {
    throw new Error("Couldn't find story name, check storyNamePattern");
  }

  return matches;
};

const getTestDirectoryPath = (pathToStory, relatedPathToTestDirectory) =>
  path.resolve(pathToStory, relatedPathToTestDirectory);

const generateTest = (
  testDirectoryPath,
  generateFileName,
  componentName,
  componentStoryNames,
  postfix,
  testTemplate
) => {
  const testPath = path.resolve(testDirectoryPath, generateFileName(componentName, postfix));

  if (fs.existsSync(testPath)) {
    return;
  }

  fs.createWriteStream(testPath, 'utf8');
  fs.writeFileSync(testPath, testTemplate(componentName, componentStoryNames, postfix), 'utf8');
};

module.exports = {
  generateTest,
  getComponentName,
  getComponentStoriesNames,
  getTestDirectoryPath,
};
