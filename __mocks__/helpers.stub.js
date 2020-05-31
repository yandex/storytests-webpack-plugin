const path = require('path');

const pathToStory = path.join(__dirname, './story-content.stub.jsx');

const componentNamePattern = /[a-z]+(?=', module)/gi;

const storyNamePattern = /[a-z ]+(?=', \(\) => )/gi;

const testDirectoryPath = '../../.generated-tests';

const testFilePostfixes = ['hermione'];

module.exports = {
  pathToStory,
  componentNamePattern,
  storyNamePattern,
  testDirectoryPath,
  testFilePostfixes,
};
