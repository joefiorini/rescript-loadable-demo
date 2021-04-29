const ESBuildMinifyPlugin = require("esbuild-loader").ESBuildMinifyPlugin
const WebpackShellPluginNext = require("webpack-shell-plugin-next")
const nodeExternals = require("webpack-node-externals")
const merge = require("webpack-merge")
const join = require("path").join
const dirname = require("path").dirname
const fileURLToPath = require("url").fileURLToPath
const LoadablePlugin = require("@loadable/webpack-plugin")
const log = (o) => (console.dir(o), o)

// const __dirname = dirname(fileURLToPath(import.meta.url))

const common = {
  optimization: {
    minimize: true,
    minimizer: [new ESBuildMinifyPlugin({ target: "es2015" })],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: require.resolve("babel-loader"),
      },
    ],
  },
  plugins: [new LoadablePlugin()],
}

const clientConfig = {
  mode: "development",
  entry: "./src/App.js",
  devServer: { contentBase: "./dist/client" },
  output: {
    path: join(__dirname, "dist/client"),
    publicPath: "/dist/client",
  },
  plugins: [
    new WebpackShellPluginNext({
      onBeforeBuild: {
        scripts: ["yarn build"],
        blocking: true,
      },
      // dev: false,
    }),
    // new WebpackShellPluginNext({
    //   onWatchRun: {
    //     scripts: [
    //       "echo 'Starting reScript watcher...'",
    //       "yarn build",
    //       "yarn build -w",
    //     ],
    //     parallel: true,
    //   },
    //   dev: true,
    // }),
  ],
}

const serverConfig = {
  mode: "production",
  entry: "./src/App-Ssr.js",
  externals: ["@loadable/component", nodeExternals()],
  output: {
    path: join(__dirname, "dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
    globalObject: "this",
    publicPath: "/dist/server",
  },
}

const config = (cfg) => merge.default(common, cfg)

module.exports = [config(clientConfig), config(serverConfig)]
