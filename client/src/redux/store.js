import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/user';
import { commentReducer } from './slices/comment';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    comment: commentReducer,
  },
});

export default store;
