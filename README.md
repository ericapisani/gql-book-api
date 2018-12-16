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
