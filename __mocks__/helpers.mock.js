const testTemplateMock = jest.fn(
  (componentName, storyName) => `${componentName}-${storyName}`
);

module.exports = {
  testTemplateMock,
};
