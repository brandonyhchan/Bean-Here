import { ApolloServer } from "apollo-server";
import { context } from "./context.js";
import {
  signUp,
  login,
  returnAllCafes,
  getCafeInfo,
} from "./resolvers/Query.js";
import { updateCafeInfo } from "./resolvers/Mutation.js";
import { loadFile } from "graphql-import-files";
import dotenv from "dotenv";

dotenv.config();

console.log("Current working directory:", process.cwd());
console.log("Database URL:", process.env.DATABASE_URL);

const resolvers = {
  Query: {
    signUp,
    login,
    returnAllCafes,
    getCafeInfo,
  },
  Mutation: {
    updateCafeInfo,
  },
};

const server = new ApolloServer({
  typeDefs: loadFile("./src/schemas/schema.graphql"),
  resolvers,
  context,
});
server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on ${url}`);
});
