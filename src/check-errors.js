const isRegExp = (value) => value instanceof RegExp;
const isString = (value) => typeof value === 'string';
const isTestGenerationStrategy = (value) => value === 'component' || value === 'story';
const isArray = (value) => Array.isArray(value);
const isFunction = (value) => typeof value === 'function';

module.exports = {
  isArray,
  isFunction,
  isRegExp,
  isString,
  isTestGenerationStrategy,
};
