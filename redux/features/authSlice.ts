import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  id?: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires?: string;
};

const initialState: AuthState = {
  user: {
    name: '',
    email: '',
    image: '',
  },
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
    set: (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.user.image = action.payload.user.image;
      state.expires = action.payload.expires || state.expires;
    },
  },
});

export const { set, reset } = auth.actions;
export default auth.reducer;
