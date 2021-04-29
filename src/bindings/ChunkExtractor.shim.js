import { ChunkExtractor } from "@loadable/server"

export const create = (options) => new ChunkExtractor(options)

export { ChunkExtractor }
