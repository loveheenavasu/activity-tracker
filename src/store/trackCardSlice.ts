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
    setTime: (state, action) => {
      state.user.forEach((client: any) => {
        if (client.clientID === action.payload.clientID) {
          client.project.forEach((project: any) => {
            if (project.id === action.payload.id) {
              project.time = action.payload.timeTracked;
            }
          });
        }
      });
    },
    // setTrack: (state, action) => {
    //   state.user = action.payload;
    // },
  },
});
export const { setData, setTime } = trackCardSlice.actions;
export default trackCardSlice.reducer;
export const stateSelector = (state: any) => state || {};
