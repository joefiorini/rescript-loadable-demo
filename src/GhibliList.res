open Promise

@react.component
let make = (~films=?) => {
  let (list, setList) = React.useState(() => films)

  React.useEffect0(() => {
    if Belt.Option.isNone(films) {
      FetchFilms.get()->then(list => setList(_ => list)->resolve)->ignore
    }

    None
  })

  switch list {
  | Some(films) =>
    <ul>
      {Belt.Array.map(films, film =>
        switch film {
        | Some(film) =>
          <li key={Js.Dict.unsafeGet(film, "id")->Js.Json.stringify}>
            {React.string(Js.Dict.unsafeGet(film, "title")->Js.Json.stringify)}
          </li>
        | None => React.null
        }
      )->React.array}
    </ul>
  | None => <div> {React.string("No data yet")} </div>
  }
}
