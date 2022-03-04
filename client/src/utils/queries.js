import { gql } from '@apollo/client';

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