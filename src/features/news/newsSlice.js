import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'e54faeb44fc9462587d02b7a5e825b33';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ category, page, searchTerm }) => {
    const response = await fetch(
      `${BASE_URL}/top-headlines?category=${category}&page=${page}&q=${searchTerm}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
    category: 'general',
    page: 1,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setPage } = newsSlice.actions;

export default newsSlice.reducer;
