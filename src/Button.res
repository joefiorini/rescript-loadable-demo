@react.component
let make = (~label, ~onClick) => {
  <button onClick={_e => onClick()}> {React.string(label)} </button>
}
