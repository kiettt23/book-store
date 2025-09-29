import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById } from "../features/bookDetail";
import { addFavorite } from "../features/favorites";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const dispatch = useDispatch();
  const { id: bookId } = useParams();

  const { book, loading, error } = useSelector((state) => state.bookDetail);

  // Fetch book detail khi load trang
  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookById(bookId));
    }
  }, [dispatch, bookId]);

  // Hiển thị lỗi bằng toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        book && (
          <Grid
            container
            spacing={2}
            p={4}
            mt={5}
            sx={{ border: "1px solid black" }}
          >
            <Grid item md={4}>
              <img
                width="100%"
                src={`${BACKEND_API}/${book.imageLink}`}
                alt={book.title}
              />
            </Grid>
            <Grid item md={8}>
              <Stack>
                <h2>{book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => {
                    dispatch(addFavorite(book));
                    toast.success(
                      "The book has been added to the reading list!"
                    );
                  }}
                >
                  Add to Reading List
                </Button>
              </Stack>
            </Grid>
          </Grid>
        )
      )}
    </Container>
  );
};

export default BookDetailPage;
