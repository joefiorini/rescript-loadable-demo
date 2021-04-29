type t

module Options = {
  @deriving(abstract)
  type t = {statsFile: string, entrypoints: Js.Array.t<string>}
}

@obj
external chunkExtractorOptions: (~statsFile: string, ~entrypoints: Js.Array.t<string>=?) => _ = ""

@module("@loadable/server") @new external make: Options.t => t = "ChunkExtractor"

@send external getScriptTags: t => string = "getScriptTags"
@send external collectChunks: (t, React.element) => React.element = "collectChunks"
@send external getLinkTags: t => string = "getLinkTags"
@send external getStyleTags: t => string = "getStyleTags"
// @send external requireEntrypoint: t => React.component<{ data: Js.t}> = "requireEntrypoint"
