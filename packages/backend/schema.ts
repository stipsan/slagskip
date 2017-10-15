import * as globby from 'globby'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'

const readFileAsync = promisify(fs.readFile)

export default async function getSchema() {
  const files: string[] = await globby('typeDefs/*.graphql', { cwd: __dirname })
  const typeDefs = await Promise.all(
    files.map(async (file): Promise<string> => {
      const buffer = await readFileAsync(path.join(__dirname, file))
      return buffer.toString()
    })
  )

  return makeExecutableSchema({ typeDefs, resolvers })
}
