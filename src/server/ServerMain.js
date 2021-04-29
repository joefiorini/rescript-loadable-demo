// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Main = require("../Main.js");
var Path = require("path");
var Curry = require("rescript/lib/js/curry.js");
var React = require("react");
var Express = require("bs-express/src/Express.js");
var Js_json = require("rescript/lib/js/js_json.js");
var FetchFilms = require("../FetchFilms.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Server = require("@loadable/server");
var ServerJs = require("react-dom/server.js");

var dirname = __dirname;

function log(o) {
  console.log(o);
  return o;
}

// const React = require('react')
//import fetch from 'node-fetch'
const fetch = require('node-fetch')
globalThis.fetch = fetch
;

// import {use} from './WebpackDevServer.js'
const {use} = require('./WebpackDevServer')
;

var app = Express.express(undefined);

use(app)
;

function setProperty(req, property, value, res) {
  req[property] = value;
  return res;
}

Express.App.useOnPathWithMany(app, "/auto", [
      Express.Middleware.from(function (next, req, res) {
            console.log("From /auto", req.originalUrl);
            return Curry._2(next, Express.Next.middleware, res);
          }),
      Express.Middleware.from(function (next, req, res) {
            console.log("From inserted middleware", req.originalUrl);
            return Curry._2(next, Express.Next.middleware, res);
          })
    ]);

function renderComponent(extractor, clientExtractor, films) {
            const log = o => (console.dir(o), o)
            const {default: Main} = extractor.requireEntrypoint()
            return clientExtractor.collectChunks(React.createElement(log(Main.make), {data:films}))
          }
;

Express.App.get(app, "/", Express.PromiseMiddleware.from(function (next, req, res) {
          console.log("from /", req.originalUrl);
          if (req.originalUrl.includes("auto")) {
            return Promise.resolve(Curry._2(next, Express.Next.middleware, res));
          }
          console.log("SSR YO!");
          var statsFile = Path.resolve("./dist/server/loadable-stats.json");
          var clientStats = Path.resolve("./dist/client/loadable-stats.json");
          var extractor = new Server.ChunkExtractor({
                statsFile: statsFile,
                entrypoints: ["main"]
              });
          var clientExtractor = new Server.ChunkExtractor({
                statsFile: clientStats,
                entrypoints: ["main"]
              });
          return FetchFilms.get(undefined).then(function (films) {
                      console.log(extractor, clientExtractor);
                      var tmp = {};
                      if (films !== undefined) {
                        tmp.data = Caml_option.valFromOption(films);
                      }
                      var jsx = extractor.collectChunks(React.createElement(Main.make, tmp));
                      var html = ServerJs.renderToString(jsx);
                      var scriptTags = clientExtractor.getScriptTags();
                      var styleTags = clientExtractor.getStyleTags();
                      var linkTags = clientExtractor.getLinkTags();
                      return Promise.resolve(Express.$$Response.status(res.set("Content-Type", "text/html"), /* Ok */0).send("\n  <!DOCTYPE html>\n  <html>\n    <head>\n        " + styleTags + "\n        " + linkTags + "\n    </head>\n    <body>\n        <div id=\"root\">" + html + "</div>\n        " + scriptTags + "\n        <script>\n          window.__APP_STATE__ = " + Js_json.serializeExn(films) + "\n        </script>\n    </body>\n  </html>\n  "));
                    });
        }));

Express.App.listen(app, 8080, undefined, (function (param) {
        console.log("App is running: 🌎 http://localhost:" + String(8080));
        
      }), undefined);

var port = 8080;

exports.dirname = dirname;
exports.log = log;
exports.app = app;
exports.port = port;
exports.setProperty = setProperty;
/* dirname Not a pure module */