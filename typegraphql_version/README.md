# gql-book-api

GraphQL Day Toronto 2019 project.

## Set up

### Requirements
* Docker
* Prisma

### Prisma Setup
Reference: https://www.prisma.io/docs/1.22/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/

Use the set up for MongoDB.

### Making changes to Prisma client
* `npm run deploy-prisma`
* `prisma generate` (requires prisma-cli to be installed)

**Note:** There should be a way to automatically generate the prisma client as a hook in the `prisma.yml`, but I was running into 'cannot find module 'generate'' when I attempted to add the code for it. Didn't have time to look into it further, so I just didn't bother.

### Running
TypeGraphQL automatically generates the `schema.gql` file when `npm run dev` is executed. You should see a 'server ready' message once everything is installed (via `npm install`) and that command is run.
