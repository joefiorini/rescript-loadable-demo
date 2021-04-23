open Js.Promise

@react.component
let make = () => {
  let (list, setList) = React.useState(() => None)

  React.useEffect0(() => {
    Fetch.fetch("https://ghibliapi.herokuapp.com/films")
    |> then_(Fetch.Response.json)
    |> then_(films => films->Js.Json.decodeArray->resolve)
    |> then_(list =>
      setList(_ =>
        Js.Option.map((. films) => Belt.Array.map(films, film => film->Js.Json.decodeObject), list)
      )->resolve
    )
    |> ignore

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
