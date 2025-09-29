import { configureStore } from "@reduxjs/toolkit";
import { booksReducer } from "../features/books";

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
