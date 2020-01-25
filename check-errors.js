function isRegExp(value, valueName) {
  if (!(value instanceof RegExp)) {
    throw new Error(
      `Expected ${valueName} to be regular expression but got ${value}`
    );
  }
}

function isString(value, valueName) {
  if (typeof value !== "string") {
    throw new Error(`Expected ${valueName} to be string but got ${value}`);
  }
}

function isArray(value, valueName) {
  if (!Array.isArray(value)) {
    throw new Error(
      `Expected ${valueName} to be an array of string but got ${value}`
    );
  }
}

function isFunction(value, valueName) {
  if (typeof value !== "function") {
    throw new Error(`Expected ${valueName} to be a function but got ${value}`);
  }
}

module.exports = {
  isArray,
  isFunction,
  isRegExp,
  isString
};
