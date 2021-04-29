external \"import": string => Js.Promise.t<'a> = "import"

module List = {
  let makeProps = (~data)
  let make = LazyComponentMod.makeComponent(~path="./GhibliList")
}

@react.component
let make = (~data=?) => {
  let (count, setCount) = React.useState(_ => 0)

  <div>
    <Button
      label={"Hello World" ++ string_of_int(count)} onClick={() => setCount(prev => prev + 1)}
    />
    <List films=?data />
    <GhibliList films=?data />
  </div>
}
