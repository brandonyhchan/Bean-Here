import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import { loadFile } from "graphql-import-files";
import { context } from "./context.js";
import { login, signUp } from "./resolvers/Authentication.js";
import {
  getCafeInfo,
  returnAllCafes,
  updateCafeInfo,
} from "./resolvers/Cafe.js";

dotenv.config();

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
