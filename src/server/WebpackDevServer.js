// import webpackConfig from "../../webpack.config.js"
// import webpackDevMiddleware from "webpack-dev-middleware"
// import webpack from "webpack"
const webpackConfig = require("../../webpack.config.js")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpack = require("webpack")

const compiler = webpack(webpackConfig)

const use = (app) => {
  if (process.env.NODE_ENV !== "production") {
    app.use(
      "/",
      webpackDevMiddleware(compiler, {
        serverSideRender: true,
        publicPath: "/dist/client",
        writeToDisk(filePath) {
          return /server/.test(filePath) || /stats\.json/.test(filePath)
        },
      }),
    )
  }
}

module.exports = { use }
