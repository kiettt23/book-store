import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    // books: booksReducer,
    // favorites: favoritesReducer,
    // bookDetail: bookDetailReducer,
  },
});

export default store;
