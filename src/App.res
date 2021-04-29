// %%raw(`
//   document.body.append(Object.assign(document.createElement('div'),{id:"root"}));
// `)

@module("@loadable/component") external loadableReady: (unit => unit) => unit = "loadableReady"

@scope("window") @val external globalState: Js.Undefined.t<string> = "__APP_STATE__"

let data =
  globalState
  ->Js.Undefined.toOption
  ->Belt.Option.flatMap(str => str->Js.Json.string->FetchFilms.decodeFilms)

switch ReactDOM.querySelector("#root") {
| Some(root) =>
  loadableReady(() => {
    ReactDOM.hydrate(<Main ?data />, root)
    ()
  })
| None =>
  Js.log("No root element found")
  ()
}
