// Generated using webpack-cli http://github.com/webpack-cli
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const isDevelopment = process.env.NODE_ENV === "development";
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./public/index.html"),
  }),
  new MiniCssExtractPlugin({
    filename: isDevelopment ? "[name].css" : "[name].[hash].css",
    chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
  }),
  new WebpackManifestPlugin(),
];

isDevelopment && plugins.push(new HotModuleReplacementPlugin());
isDevelopment &&
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerHost: process.env.HOST || "0.0.0.0",
      analyzerPort: 5021,
    })
  );

const devServer = {
  open: true,
  host: process.env.HOST || "0.0.0.0",
  port: process.env.PORT || 3000,
  compress: true,
  hot: true,
};

process.env.DOCKER_ENVIRONMENT &&
  Object.assign(devServer, {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  });

module.exports = {
  name: "awesome-marketplace-client",
  mode: process.env.NODE_ENV || "development",
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[id]_[name].bundle.js",
    uniqueName: "awesome-marketplace-client",
  },
  devServer,
  devtool: "source-map",
  plugins,
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        loader: "babel-loader",
        options: {
          exclude: [/(node_modules|bower_components)/],
        },
      },
      {
        test: /\.[module\.]?(sa|sc|c)ss$/,
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
    modules: ["node_modules", path.resolve(__dirname, "src")],
    alias: {
      root: path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".scss"],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    usedExports: isDevelopment,
  },
};
