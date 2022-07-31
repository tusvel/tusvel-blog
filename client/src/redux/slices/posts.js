import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchPostsByTag, fetchRemovePost, fetchTags } from '../../http/posts';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  return await fetchPosts();
});

export const getPostsByTag = createAsyncThunk('posts/getPostsByTag', async (tag) => {
  return await fetchPostsByTag(tag);
});

export const getTags = createAsyncThunk('posts/getTags', async () => {
  return await fetchTags();
});

export const removePost = createAsyncThunk('posts/remove', async (id) => {
  return await fetchRemovePost(id);
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const slicePosts = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    //Получение постов
    [getPosts.pending]: (state) => {
      state.posts.items = null;
      state.posts.status = 'loading';
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [getPosts.rejected]: (state) => {
      state.posts.items = null;
      state.posts.status = 'error';
    },

    //Получение тегов
    [getTags.pending]: (state) => {
      state.tags.items = null;
      state.tags.status = 'loading';
    },
    [getTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [getTags.rejected]: (state) => {
      state.tags.items = null;
      state.tags.status = 'error';
    },

    //Удаление поста
    [removePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },

    //Получение постов по тегу
    [getPostsByTag.pending]: (state) => {
      state.posts.items = null;
      state.posts.status = 'loading';
    },
    [getPostsByTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [getPostsByTag.rejected]: (state) => {
      state.posts.items = null;
      state.posts.status = 'error';
    },
  },
});

export const postsReducer = slicePosts.reducer;
