/// <reference types="webpack-dev-server">
import * as webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import { ESBuildMinifyPlugin } from "esbuild-loader"
import WebpackShellPluginNext from "webpack-shell-plugin-next"
import HtmlWebpackPlugin from "html-webpack-plugin"

const config: webpack.Configuration & {
  devServer?: WebpackDevServer.Configuration
} = {
  mode: "development",
  entry: "./src/App.bs.js",
  optimization: {
    minimizer: [new ESBuildMinifyPlugin({ target: "es2015" })],
  },
  devServer: { contentBase: "./dist" },
  plugins: [
    new HtmlWebpackPlugin(),
    new WebpackShellPluginNext({
      onBeforeBuild: {
        scripts: ["yarn build"],
        blocking: true,
      },
      dev: false,
    }),
    new WebpackShellPluginNext({
      onWatchRun: {
        scripts: ["echo 'Starting reScript watcher...'", "yarn build -w"],
        parallel: true,
      },
      dev: true,
    }),
  ],
}

export default config
