const express = require("express");
const path = require("path");
const dbConnection = require("./config/connection");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: "/graphql" });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "client", "public")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
  });
}
dbConnection();

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
