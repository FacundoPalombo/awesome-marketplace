// Generated using webpack-cli http://github.com/webpack-cli
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const isDevelopment = process.env.NODE_ENV === "development";
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "/public/index.html"),
  }),
  new MiniCssExtractPlugin({
    filename: isDevelopment ? "[name].css" : "[name].[hash].css",
    chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
  }),
  new WebpackManifestPlugin(),
];

isDevelopment && plugins.push(new HotModuleReplacementPlugin());

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 3000,
    compress: true,
    contentBase: path.resolve(__dirname, "public"),
  },

  plugins,
  module: {
    rules: [
      {
        test: /\\.(js|jsx)$/,
        loader: "babel-loader",
      },
      {
        test: /\.module.(sa|sc|c)ss$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: ["js", "jsx", "scss"],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
