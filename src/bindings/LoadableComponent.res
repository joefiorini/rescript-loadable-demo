// module type LoadableComponentProps= (Props: Props) =>{
//     type t = React.component<Props>
// }

// module LoadableFunc<'props> = (props: 'props) => {
//     type loadFn = (props: 'props) => Promise<
// }

@module("@loadable/component")
external loadable: unit => Js.Promise.t<React.component<'props>> = "loadable"
