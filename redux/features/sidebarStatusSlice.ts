import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SidebarStatus = {
  status: 'open' | 'closed' | null;
};

const initialState: SidebarStatus = {
  status: null,
};

export const sidebarStatus = createSlice({
  name: 'sidebarStatus',
  initialState,
  reducers: {
    reset: () => initialState,
    set: (state, action: PayloadAction<SidebarStatus>) => {
      state.status = action.payload.status;
    },
  },
});

export const { set, reset } = sidebarStatus.actions;
export default sidebarStatus.reducer;
