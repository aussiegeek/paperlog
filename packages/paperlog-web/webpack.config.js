const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InjectBodyPlugin = require("inject-body-webpack-plugin").default;

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new InjectBodyPlugin({
      content: "<div id='app'></div>",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
  },
};
