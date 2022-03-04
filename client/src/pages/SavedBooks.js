import React, { useEffect, useState } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { REMOVE_BOOK } from "../utils/queries";
import * as queries from "../utils/queries";
import Auth from "../utils/auth";
import { removeBookId, saveBookIds } from "../utils/localStorage";

const SavedBooks = () => {
  const userInfo = JSON.parse(localStorage.getItem("id_token")).user;
  //Sconst [userData, setUserData] = useState();
  console.log(userInfo);
  const { refetch, loading, data } = useQuery(queries.QUERY_ME, {
    variables: { userId: userInfo._id },
  });
  //console.log(userData);
  const [allBooks, setAllBooks] = useState();
  console.log(allBooks);
  const [removeBook, { data: removedBook }] = useLazyQuery(REMOVE_BOOK);
  console.log(removedBook);
  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId: bookId },
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (data) {
      var userData = data?.me.savedBooks || [];
      setAllBooks(userData);
      const ids = userData.map((book) => book.bookId);
      console.log(ids);
      saveBookIds(ids);
    }
  }, [data]);
  useEffect(() => {
    if (removedBook) {
      let data = allBooks.filter(
        (book) => book.bookId !== removedBook["removeBook"].bookId
      );
      console.log(data);
      setAllBooks(data);
      const ids = data.map((book) => book.bookId);
      console.log(ids);
      saveBookIds(ids);
    }
  }, [removedBook]);
  useEffect(() => {
    refetch();
  }, []);
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {allBooks?.length
            ? `Viewing ${allBooks?.length} saved ${
                allBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {allBooks?.map((book) => {
            console.log(book)
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
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
