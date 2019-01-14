# gql-recipe-api

GraphQL Day Toronto 2019 project.

## Set up

### Prisma Setup
Reference: https://www.prisma.io/docs/1.22/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/

Use the set up for the MongoDB.

### Making changes to Prisma client
* `npm run deploy-prisma`
* `prisma generate` (requires prisma-cli to be installed)

**Note:** There should be a way to automatically generate the prisma client as a hook in the `prisma.yml`, but I was running to 'cannot find module 'generate'' when I attempted to add the code for it. Didn't have time to look into it further, but something to circle back to at some point

### Downloading schema for use by apollo codegen (apollo v2+)
Use `apollo service:download`

### ### Downloading schema for use by apollo codegen (apollo <v2)
Use `apollo schema:download --endpoint "http://localhost:4000/graphql"`

### Generating types using apollo codegen (apollo v2+)
Use `apollo client:codegen --target typescript --localSchemaFile './schema.json'`

### Generating types using apollo codegen (apollo <v2)
Use `apollo codegen:generate --queries=schema.gql --target=typescript --schema='./schema.json' --outputFlat`
