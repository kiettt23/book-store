import { configureStore } from "@reduxjs/toolkit";
import { booksReducer } from "../features/books";
import { bookDetailReducer } from "../features/bookDetail";
import { favoritesReducer } from "../features/favorites";

const store = configureStore({
  reducer: {
    books: booksReducer,
    bookDetail: bookDetailReducer,
    favorites: favoritesReducer,
  },
});

export default store;
