import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [] as any,
};

export const trackCardSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.user = action.payload;
    },
    // setTrack: (state, action) => {
    //   state.user = action.payload;
    // },
  },
});
export const { setData } = trackCardSlice.actions;
export default trackCardSlice.reducer;
