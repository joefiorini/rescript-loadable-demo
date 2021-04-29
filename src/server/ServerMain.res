@module("path") external resolve: string => string = "resolve"
@module("path") external join: (string, string) => string = "join"
let dirname: string = %raw("__dirname")

let log = o => {
  Js.log(o)
  o
}

open Express

// @module("express") external express: unit => Express.App.t = "default"

%%raw(`
// const React = require('react')
//import fetch from 'node-fetch'
const fetch = require('node-fetch')
globalThis.fetch = fetch
`)

%%raw(`
// import {use} from './WebpackDevServer.js'
const {use} = require('./WebpackDevServer')
`)
let app = express()
let port = 8080

%%raw(`
use(app)
`)

let setProperty = (req, property, value, res) => {
  let reqData = Request.asJsonObject(req)
  Js.Dict.set(reqData, property, value)
  res
}
app->App.useOnPathWithMany(
  ~path="/auto",
  [
    Middleware.from((next, req, res) => {
      Js.log2("From /auto", req->Request.originalUrl)
      next(
        Next.middleware,
        res,
        // setProperty(
        //   req,
        //   "originalUrl",
        //   req
        //   ->Request.originalUrl
        //   ->Js.String.replace("index.js", "main.js", _)
        //   ->Js.String.replace("/auto", "", _)
        //   ->Js.Json.string,
        //   res,
        // ),
      )
    }),
    Middleware.from((next, req, res) => {
      Js.log2("From inserted middleware", req->Request.originalUrl)
      next(Next.middleware, res)
    }),
    // Static.make(
    //   resolve(join(dirname, "../../dist/client"))->log,
    //   Static.defaultOptions(),
    // )->Static.asMiddleware,
  ],
)

%%raw(`
          function renderComponent(extractor, clientExtractor, films) {
            const log = o => (console.dir(o), o)
            const {default: Main} = extractor.requireEntrypoint()
            return clientExtractor.collectChunks(React.createElement(log(Main.make), {data:films}))
          }
        `)

app->App.get(
  ~path="/",
  PromiseMiddleware.from((next, req, res) => {
    Js.log2("from /", Request.originalUrl(req))
    if req->Request.originalUrl->Js.String.includes("auto", _) {
      next(Next.middleware, res)->Promise.resolve
    } else {
      Js.log("SSR YO!")
      let statsFile = resolve("./dist/server/loadable-stats.json")
      let clientStats = resolve("./dist/client/loadable-stats.json")
      let extractor = ChunkExtractor.make(
        ChunkExtractor.Options.t(~statsFile, ~entrypoints=["main"]),
      )
      // let main = extractor->ChunkExtractor.requireEntrypoint
      let clientExtractor = ChunkExtractor.make(
        ChunkExtractor.Options.t(~statsFile=clientStats, ~entrypoints=["main"]),
      )
      FetchFilms.get()->Promise.then(films => {
        Js.log2(extractor, clientExtractor)
        // let jsx: React.element = %raw(`renderComponent(extractor, clientExtractor, films)`)
        let jsx = extractor->ChunkExtractor.collectChunks(
          <Main data=?films />,
          // React.createElement(main, Main.makeProps(~data=?films, ())),
        )
        let html = ReactDOMServer.renderToString(jsx)
        let scriptTags = clientExtractor->ChunkExtractor.getScriptTags
        let styleTags = clientExtractor->ChunkExtractor.getStyleTags
        let linkTags = clientExtractor->ChunkExtractor.getLinkTags
        res
        ->Response.setHeader("Content-Type", "text/html")
        ->Response.status(Response.StatusCode.Ok)
        ->Response.sendString(
          `
  <!DOCTYPE html>
  <html>
    <head>
        ${styleTags}
        ${linkTags}
    </head>
    <body>
        <div id="root">${html}</div>
        ${scriptTags}
        <script>
          window.__APP_STATE__ = ${films->Js.Json.serializeExn}
        </script>
    </body>
  </html>
  `,
        )
        ->Promise.resolve
      })
    }
  }),
)

let _ = app->App.listen(
  ~port,
  ~onListen=_ => {
    Js.log(`App is running: 🌎 http://localhost:${Belt.Int.toString(port)}`)
  },
  (),
)
