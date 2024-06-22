import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'e54faeb44fc9462587d02b7a5e825b33';
const API_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ category, page, searchTerm }) => {
    const response = await fetch(`${API_URL}?category=${category}&page=${page}&q=${searchTerm}&apiKey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    return response.json();
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
        state.error = null;
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
