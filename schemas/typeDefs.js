const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
  }
  type UserData{
    user:User
    savedBooks:[Book]
  }
  type Book {
    bookId: String
    userId:String
    authors: [String]
    description: String
    image: String
    title: String
  }
  type Auth {
    token: ID!
    user: User
  }
  input BookInput {
    authors: [String]
    bookId:String
    userId:String
    description: String
    title: String
    image: String
  } 
  type Query {
    me(id:String!): UserData
    removeBook(bookId: String!): Book
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): Book
  }
`;

module.exports = typeDefs;

// i need to do this for book id ...(Not the `_id`, but the book's `id` value returned from Google's Book API.)
                      // * `typeDefs.js`: Define the necessary `Query` and `Mutation` types:

                      // * `Query` type:

                      //   * `me`: Which returns a `User` type.

                      // * `Mutation` type:

                      //   * `login`: Accepts an email and password as parameters; returns an `Auth` type.

                      //   * `addUser`: Accepts a username, email, and password as parameters; returns an `Auth` type.

                      //   * `saveBook`: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type. (Look into creating what's known as an `input` type to handle all of these parameters!)

                      //   * `removeBook`: Accepts a book's `bookId` as a parameter; returns a `User` type.
  


