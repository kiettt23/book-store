import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBookByIdAPI } from "./bookDetailAPI";

export const fetchBookById = createAsyncThunk(
  "bookDetail/fetchBookById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchBookByIdAPI(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  book: null,
  loading: false,
  error: null,
};

const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState,
  reducers: {
    clearBook(state) {
      state.book = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBook } = bookDetailSlice.actions;
export default bookDetailSlice.reducer;
