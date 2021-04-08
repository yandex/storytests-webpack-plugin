const fs = require('fs');
const path = require('path');

const helpers = require('../src/helpers');
const helpersMocks = require('../__mocks__/helpers.mock');
const helpersStubs = require('../__mocks__/helpers.stub');

const { generateTest, getComponentName, getComponentStoriesNames, getTestDirectoryPath } = helpers;

const { testTemplateMock, generateFileNameMock } = helpersMocks;

const {
  componentNamePattern,
  pathToStory,
  storyNamePattern,
  testDirectoryPath,
  testFilePostfixes,
} = helpersStubs;

describe('helpers', () => {
  let fileContent;
  const pathToGeneratedTestDirectory = path.resolve(__dirname, '../.generated-tests/');

  beforeEach(() => {
    fileContent = fs.readFileSync(pathToStory, 'utf8');
  });

  describe('getComponentName', () => {
    test('should return matched component name unchanged', () => {
      expect(getComponentName(fileContent, componentNamePattern)).toEqual(
        'Components/RoundedButton'
      );
    });

    test('should throw an error if no match is found', () => {
      expect(() => getComponentName(fileContent, /(?<=title: ")[a-z]+/gi)).toThrowError();
    });
  });

  describe('getComponentStoriesNames', () => {
    test('should return matched stories names unchanged', () => {
      expect(getComponentStoriesNames(fileContent, storyNamePattern)).toEqual([
        'Primary',
        'Secondary',
        'SecondaryWithLongLabel',
      ]);
    });

    test('should return an empty array if not stories are found', () => {
      expect(getComponentStoriesNames(fileContent, /[a-z ]+(?=", \(\) => )/gi)).toEqual([]);
    });
  });

  describe('getTestDirectoryPath', () => {
    test('should return path to generated test directory', () => {
      expect(getTestDirectoryPath(pathToStory, testDirectoryPath)).toEqual(
        pathToGeneratedTestDirectory
      );
    });
  });

  describe('generateTest', () => {
    const componentName = 'Components/RoundedButton';
    const componentStoryNames = ['SecondaryWithLongLabel'];
    const postfix = testFilePostfixes[0];

    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    const createWriteStreamSpy = jest.spyOn(fs, 'createWriteStream').mockImplementation(() => {});
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    afterAll(() => {
      existsSyncSpy.mockRestore();
      createWriteStreamSpy.mockRestore();
      writeFileSyncSpy.mockRestore();
    });

    test('should generate test file', () => {
      existsSyncSpy.mockImplementation(() => false);

      generateTest(
        getTestDirectoryPath(pathToStory, testDirectoryPath),
        generateFileNameMock,
        componentName,
        componentStoryNames,
        postfix,
        testTemplateMock
      );

      expect(existsSyncSpy).toHaveBeenCalled();
      expect(createWriteStreamSpy).toHaveBeenCalled();
      expect(writeFileSyncSpy).toHaveBeenCalled();
    });

    test('should not generate test file', () => {
      existsSyncSpy.mockImplementation(() => true);

      generateTest(
        getTestDirectoryPath(pathToStory, testDirectoryPath),
        generateFileNameMock,
        componentName,
        componentStoryNames,
        postfix,
        testTemplateMock
      );

      expect(existsSyncSpy).toHaveBeenCalled();
      expect(createWriteStreamSpy).not.toHaveBeenCalled();
      expect(writeFileSyncSpy).not.toHaveBeenCalled();
    });
  });
});
