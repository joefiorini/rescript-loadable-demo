open Promise

let decodeFilms = data =>
  data
  ->Js.Json.decodeArray
  ->Belt.Option.map(films => Belt.Array.map(films, film => film->Js.Json.decodeObject))

let get = () =>
  Fetch.fetch("https://ghibliapi.herokuapp.com/films")
  ->then(Fetch.Response.json)
  ->then(films => films->decodeFilms->resolve)
