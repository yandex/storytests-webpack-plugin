import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

export default {
  input: "./index.js",
  output: {
    name: "App",
    file: pkg.main,
    format: "cjs",
    comments: false
  },
  plugins: [external(), url(), resolve(), commonjs(), terser()]
};
