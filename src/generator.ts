import {
  generateCode,
  loadSchemaFiles,
  writeGeneratedCode,
} from 'mercurius-codegen'

import { buildSchema } from 'graphql'
;(async () => {
  const { schema } = loadSchemaFiles('src/graphql/schema/**/*.gql', {
    // watchOptions: {
    //   enabled: true,
    //   onChange: writeCode,
    // },
  })

  await writeCode(schema)
  console.log('Generated types')
})()

async function writeCode(schema: string[]) {
  const code = await generateCode(buildSchema(schema.join('\n')), {
    resolverTypeWrapperSignature:
      'Promise<T> | T | (() => Promise<T>) | (() => T)',
    scalars: {
      Date: 'Date',
    },
  })

  await writeGeneratedCode({ code, targetPath: './src/graphql/generated.ts' })
}
