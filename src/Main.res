@react.component
let make = () => {
  let (count, setCount) = React.useState(_ => 0)

  <div>
    <Button
      label={"Hello World" ++ string_of_int(count)} onClick={() => setCount(prev => prev + 1)}
    />
    <GhibliList />
  </div>
}