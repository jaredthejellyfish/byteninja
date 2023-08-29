import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CurrentCourse = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  authorId: string;
};

const initialState: CurrentCourse = {
  id: '',
  name: '',
  slug: '',
  description: '',
  image: '',
  authorId: '',
};

export const currentCourse = createSlice({
  name: 'currentCourse',
  initialState,
  reducers: {
    reset: () => initialState,
    set: (state, action: PayloadAction<CurrentCourse>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.slug = action.payload.slug;
      state.description = action.payload.description;
      state.image = action.payload.image;
      state.authorId = action.payload.authorId;
    },
  },
});

export const { set, reset } = currentCourse.actions;
export default currentCourse.reducer;
