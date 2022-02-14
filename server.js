const express = require('express');
const path = require('path');
// const db = require('./config/connection');
const dbConnection = require('./config/connection');

// require('dot-env');
                                require('dotenv').config();

// why is this not being called?
const { authMiddleware } = require('./utils/auth');
// const routes = require('./routes');
// or this
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
// this
const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
        typeDefs,
        resolvers,
        // context: authMiddleware,
});

// from docs
// await server.start();
server.applyMiddleware({ app,path:"/graphql" });

app.use(express.urlencoded({ extended: false }));
// change true or false
app.use(express.json());

                        // if we're in production, serve client/build as static assets
                        if (process.env.NODE_ENV === "production") {
                                app.use(express.static("client/build"));
                                app.get("/*", function(req, res) {
                                  res.sendFile(path.join(__dirname, "client","build","index.html"));
                                });
                              } else {
                                app.use(express.static(path.join(__dirname, "client","public")));
                                app.get("/*", function(req, res) {
                                  res.sendFile(path.join(__dirname, "client","public","index.html"));
                                });
                              }

// db.once('open', () => {
// app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

// });
dbConnection()


app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    
    
    });
        
        



