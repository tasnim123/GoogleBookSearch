import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
  
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(book:$bookData) {
          bookId
          userId
          authors
          description
          title
          image
    }
  }
`;



// login(username: String!, password: String!): Auth
// addUser(username: String!, password: String!, email:String!): Auth
// saveBook(authors: String, description: String, title: String!, bookId: String, image: String, link: String): User
// removeBook(bookId: String!): User
// }
// `;



// * `login`: Accepts an email and password as parameters; returns an `Auth` type.

// * `addUser`: Accepts a username, email, and password as parameters; returns an `Auth` type.

// * `saveBook`: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type. (Look into creating what's known as an `input` type to handle all of these parameters!)

// * `removeBook`: Accepts a book's `bookId` as a parameter; returns a `User` type.