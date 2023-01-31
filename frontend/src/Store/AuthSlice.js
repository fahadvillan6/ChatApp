import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: false,
    userId: '',
    Name: '',
  },
  reducers: {
    setAuth: (state, action) => {
      state = action.payload;
    },
    setName: (state, action) => {
      state.Name = action.payload;
    },
    setId: (state, action) => {
      state.userId = action.payload;
    },
  },
});
export const { setAuth, setName, setId } = authSlice.actions;

export default authSlice;
