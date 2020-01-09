exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /react-native-reanimated|react-native-gesture-handler/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["babel-preset-expo"]
            }
          }
        }
      ]
    }
  });

  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /hammerjs/,
            use: loaders.null()
          }
        ]
      }
    });
  }
};
