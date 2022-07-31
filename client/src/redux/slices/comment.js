import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCommentById, fetchCreateComment } from '../../http/comment';

export const getCommentById = createAsyncThunk('comment/fetchById', async (params) => {
  return await fetchCommentById(params);
});

const initialState = {
  comments: [],
};

const sliceComment = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    //Получаем комментарии
    [getCommentById.pending]: (state) => {
      state.comments = [];
    },
    [getCommentById.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },
    [getCommentById.rejected]: (state) => {
      state.comments = [];
    },
  },
});

export const commentReducer = sliceComment.reducer;
