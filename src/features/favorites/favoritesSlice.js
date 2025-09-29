import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchFavoritesAPI,
  addFavoriteAPI,
  removeFavoriteAPI,
} from "./favoritesAPI";

// Thunks
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchFavoritesAPI();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/add",
  async (book, { rejectWithValue }) => {
    try {
      return await addFavoriteAPI(book);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "favorites/remove",
  async (id, { rejectWithValue }) => {
    try {
      return await removeFavoriteAPI(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchFavorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addFavorite
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // removeFavorite
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter((book) => book.id !== action.payload);
      });
  },
});

export default favoritesSlice.reducer;
