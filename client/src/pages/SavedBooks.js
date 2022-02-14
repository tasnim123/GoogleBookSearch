// import React, { useState, useEffect } from 'react';
// import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
// import { useQuery, useMutation } from "@apollo/client";
// // import { getMe, deleteBook } from '../utils/API';
// import Auth from '../utils/auth';
// import { removeBookId } from '../utils/localStorage';
// import { QUERY_ME } from "../utils/queries";
// import { REMOVE_BOOK } from "../utils/mutations";
// const SavedBooks = () => {

//   const { loading, data } = useQuery(QUERY_ME);
//   const userData = data?.me || [];
//   const [removeBook] = useMutation(REMOVE_BOOK);

//   // use this to determine if `useEffect()` hook needs to run again
//   const userDataLength = Object.keys(userData).length;

//   // useEffect(() => {
//   //   const getUserData = async () => {
//   //     try {
//   //       const token = Auth.loggedIn() ? Auth.getToken() : null;

//   //       if (!token) {
//   //         return false;
//   //       }

//   //       const response = await getMe(token);

//   //       if (!response.ok) {
//   //         throw new Error('something went wrong!');
//   //       }

//   //       const user = await response.json();
//   //       setUserData(user);
//   //     } catch (err) {
//   //       console.error(err);
//   //     }
//   //   };

//   //   getUserData();
//   // }, [userDataLength]);

//   // create function that accepts the book's mongo _id value as param and deletes the book from the database
//   const handleDeleteBook = async (bookId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }


//     try {
//       await removeBook({
//         variables: { bookId: bookId }
//       });

//     // try {
//     //   const response = await deleteBook(bookId, token);

//     //   if (!response.ok) {
//     //     throw new Error('something went wrong!');
//     //   }

//     //   const updatedUser = await response.json();
//     //   setUserData(updatedUser);
//       // upon success, remove book's id from localStorage
//       removeBookId(bookId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // if data isn't here yet, say so
//   if (loading) {
//     return <h2>LOADING...</h2>;
//   }

//   return (
//     <>
//       <Jumbotron fluid className='text-light bg-dark'>
//         <Container>
//           <h1>Viewing saved books!</h1>
//         </Container>
//       </Jumbotron>
//       <Container>
//         <h2>
//           {userData.savedBooks.length
//             ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
//             : 'You have no saved books!'}
//         </h2>
//         <CardColumns>
//           {userData.savedBooks.map((book) => {
//             return (
//               <Card key={book.bookId} border='dark'>
//                 {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
//                 <Card.Body>
//                   <Card.Title>{book.title}</Card.Title>
//                   <p className='small'>Authors: {book.authors}</p>
//                   <Card.Text>{book.description}</Card.Text>
//                   <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
//                     Delete this Book!
//                   </Button>
//                 </Card.Body>
//               </Card>
//             );
//           })}
//         </CardColumns>
//       </Container>
//     </>
//   );
// };

// export default SavedBooks;

import React,{useEffect, useState} from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { REMOVE_BOOK } from '../utils/queries';
import * as queries from '../utils/queries';
import Auth from '../utils/auth';
import { removeBookId, saveBookIds } from '../utils/localStorage';

const SavedBooks = () => {

  const userInfo = JSON.parse(localStorage.getItem("id_token")).user;
  //Sconst [userData, setUserData] = useState();
  console.log(userInfo);
  const {refetch, loading, data } = useQuery(queries.QUERY_ME,{
    variables:{userId:userInfo._id}
  });
  //console.log(userData);
  const [allBooks, setAllBooks] = useState()
console.log(allBooks)
  const [removeBook,{data:removedBook}] = useLazyQuery(REMOVE_BOOK);
  console.log(removedBook);
  const handleDeleteBook = async (bookId) => {
   // const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(bookId);
    // if (!token) {
    //   return false;
    // }

    try {
      // Apollo will cache the response and automatically refetch and update
      await removeBook({
        variables: { bookId: bookId }
      });
     
      // upon success, remove book's id from localStorage
     // removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(()=>{
   if(data){
    var userData = data?.me.savedBooks || [];
     setAllBooks(userData)
     const ids = userData.map((book)=> book.bookId);
     console.log(ids);
     saveBookIds(ids);
   }
  },[data])
  useEffect(()=>{
    if(removedBook){
      //const books = userData;
     // console.log(books);
         let data = allBooks.filter((book)=>book.bookId !== removedBook["removeBook"].bookId);
         console.log(data);
         setAllBooks(data);
         const ids = data.map((book)=> book.bookId);
         console.log(ids);
         saveBookIds(ids);
    }
  },[removedBook])
  useEffect(() => {
    refetch();
  }, [])
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {allBooks?.length
            ? `Viewing ${allBooks?.length} saved ${allBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {allBooks?.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
