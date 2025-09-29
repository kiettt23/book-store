import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import SearchForm from "../components/SearchForm";
import { FormProvider } from "../form";
import { useForm } from "react-hook-form";
import {
  Container,
  Alert,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, setQuery, setPageNum } from "../features/books";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy state từ Redux store
  const {
    items: books,
    loading,
    error,
    query,
    pageNum,
  } = useSelector((state) => state.books);

  const totalPage = 10; // vẫn giữ cứng 10 như code gốc
  const limit = 10;

  // Xử lý click vào book → chuyển route
  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  // Fetch books mỗi khi pageNum hoặc query thay đổi
  useEffect(() => {
    dispatch(fetchBooks({ page: pageNum, query }));
  }, [dispatch, pageNum, query]);

  // React-hook-form setup cho search
  const defaultValues = {
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    dispatch(setQuery(data.searchQuery));
    dispatch(setPageNum(1)); // reset về page 1 khi search mới
  };

  return (
    <Container>
      <Stack sx={{ display: "flex", alignItems: "center", m: "2rem" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Book Store
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <SearchForm />
          </Stack>
        </FormProvider>
        <PaginationBar
          pageNum={pageNum}
          setPageNum={(val) => dispatch(setPageNum(val))}
          totalPageNum={totalPage}
        />
      </Stack>
      <div>
        {loading ? (
          <Box sx={{ textAlign: "center", color: "primary.main" }}>
            <ClipLoader color="inherit" size={150} loading={true} />
          </Box>
        ) : (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-around"
            flexWrap="wrap"
          >
            {books.map((book) => (
              <Card
                key={book.id}
                onClick={() => handleClickBook(book.id)}
                sx={{
                  width: "12rem",
                  height: "27rem",
                  marginBottom: "2rem",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={`${BACKEND_API}/${book.imageLink}`}
                    alt={`${book.title}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {book.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
