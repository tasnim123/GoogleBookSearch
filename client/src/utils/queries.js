import { gql } from '@apollo/client';

// * `me`: Which returns a `User` type.
    // _id
    // username
    // email
    // bookCount
    // savedBooks {

// * `then returns book type
    // bookId
    // authors
    // description
    // title
    // link
    // image

export const QUERY_ME = gql`
   query($userId:String!){
  me(id:$userId){
    user{
      username
      _id
      email
    }
    savedBooks{
      authors
      description
      image
      title
      bookId
    }
  }
}

`;
export const REMOVE_BOOK = gql`
  
  query ($bookId: String!) {
    removeBook(bookId: $bookId) {
          bookId
    }
  }
`;