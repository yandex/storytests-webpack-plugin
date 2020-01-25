function isRegExp(value, fieldName) {
  if (!(value instanceof RegExp)) {
    throw new Error(
      `Expected ${fieldName} to be regular expression but got ${value}`
    );
  }
}

function isString(value, fieldName) {
  if (typeof value !== "string") {
    throw new Error(`Expected ${fieldName} to be string but got ${value}`);
  }
}

function isArray(value, fieldName) {
  if (!Array.isArray(value)) {
    throw new Error(
      `Expected ${fieldName} to be an array of string but got ${value}`
    );
  }
}

function isFunction(value, fieldName) {
  if (typeof value !== "function") {
    throw new Error(`Expected ${fieldName} to be a function but got ${value}`);
  }
}

module.exports = {
  isArray,
  isFunction,
  isRegExp,
  isString
};
