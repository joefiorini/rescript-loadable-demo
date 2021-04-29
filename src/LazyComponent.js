import { loadable } from "@loadable/component"

const lazyComponent = ({ path }) => {
  return loadable(() => import(path))
}

export default lazyComponent
