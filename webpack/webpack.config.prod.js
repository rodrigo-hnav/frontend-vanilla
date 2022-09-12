const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
