import { configureStore } from "@reduxjs/toolkit";
import { booksReducer } from "../features/books";
import { bookDetailReducer } from "../features/bookDetail";

const store = configureStore({
  reducer: {
    books: booksReducer,
    bookDetail: bookDetailReducer,
  },
});

export default store;
