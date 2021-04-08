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

  return matches === null ? [] : matches;
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

  const content = testTemplate(componentName, componentStoryNames, postfix);

  if (content === false) {
    return;
  }

  if (!fs.existsSync(testDirectoryPath)) {
    fs.mkdirSync(testDirectoryPath, { recursive: true });
  }

  fs.writeFileSync(testPath, content, 'utf8');
};

module.exports = {
  generateTest,
  getComponentName,
  getComponentStoriesNames,
  getTestDirectoryPath,
};
