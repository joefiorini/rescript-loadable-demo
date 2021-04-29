@module("./lazyComponent")
external makeComponent: (~path: string) => React.component<'props> = "default"
