import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userCheck, userLogin, userRegister } from '../../http/user';

export const fetchCheckMe = createAsyncThunk('user/check', async () => {
  return await userCheck();
});

export const fetchLogin = createAsyncThunk('user/login', async (params) => {
  return await userLogin(params);
});

export const fetchRegister = createAsyncThunk('user/register', async (params) => {
  return await userRegister(params);
});

const initialState = {
  data: null,
  status: 'loading',
};

const sliceAuth = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchLogin.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchCheckMe.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchCheckMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchCheckMe.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
  },
});
export const { logout } = sliceAuth.actions;

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = sliceAuth.reducer;
