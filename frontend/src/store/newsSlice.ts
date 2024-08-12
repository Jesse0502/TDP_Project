import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SingleNewsState {
  date: string;
  img: string;
  title: string;
  content: string;
  source_url: string;
  source_name: string;
  category: string;
  keywords: string[];
}

export interface NewsState {
  news: SingleNewsState[];
  currentNews: SingleNewsState | null;
}

const initialState: NewsState = {
  news: [],
  currentNews: null,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setAllNews: (state, payload) => {
      state.news = payload.payload;
    },
    setSingleNews: (state, payload) => {
      state.currentNews = payload.payload;
    },
  },
});

export const { setAllNews, setSingleNews } = newsSlice.actions;

export default newsSlice.reducer;
