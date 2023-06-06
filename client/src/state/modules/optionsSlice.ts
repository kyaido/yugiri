import { createSlice } from '@reduxjs/toolkit';

export type State = {
  isLossy: boolean;
  isProgressive: boolean;
};

const initialState: State = {
  isLossy: true,
  isProgressive: false,
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    toggleLossy(state) {
      state.isLossy = !state.isLossy;
    },
    toggleProgressive(state) {
      state.isProgressive = !state.isProgressive;
    },
  },
});

export const { toggleLossy, toggleProgressive } = optionsSlice.actions;

export default optionsSlice.reducer;
