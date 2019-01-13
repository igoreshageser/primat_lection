"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");
const MOCK_USER = require("../config/mockUser");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MOCK_USER: MOCK_USER
});
