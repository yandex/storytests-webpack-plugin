const path = require("path");

module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: path.resolve(__dirname, "index.js"),
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  node: {
    fs: "empty"
  }
};
