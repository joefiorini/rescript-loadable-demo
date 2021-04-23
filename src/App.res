%%raw(`
  document.body.append(Object.assign(document.createElement('div'),{id:"root"}));
`)

switch ReactDOM.querySelector("#root") {
| Some(root) => ReactDOM.render(<Main />, root)
| None =>
  Js.log("No root element found")
  ()
}
