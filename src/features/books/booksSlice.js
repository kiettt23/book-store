import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooksAPI } from "./booksAPI";

// Thunk: gọi API books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ page, query }, { rejectWithValue }) => {
    try {
      const data = await fetchBooksAPI(page, query);
      return data; // fulfilled payload
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
  query: "",
  pageNum: 1,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setPageNum(state, action) {
      state.pageNum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setQuery, setPageNum } = booksSlice.actions;
export default booksSlice.reducer;
