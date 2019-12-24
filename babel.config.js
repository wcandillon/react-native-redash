// babel.config.js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining"
  ]
};
