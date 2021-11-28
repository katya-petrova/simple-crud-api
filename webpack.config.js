const path = require("path");

module.exports = {
  target: "node",
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, "./app.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  devServer: {
    open: true,
    port: 8080,
  },
};
