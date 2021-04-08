const testTemplateMock = jest.fn((componentName, storyName) => `${componentName}-${storyName}`);
const generateFileNameMock = jest.fn((component, postfix) => `${component}.${postfix}.js`);

module.exports = {
  testTemplateMock,
  generateFileNameMock,
};
