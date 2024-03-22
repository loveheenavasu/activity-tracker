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
      // state.user = state.user[action.payload.clientID]["project"][
      //   action.payload.id
      // ]["time"] = action.payload.timeTracked;
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
    setScreenShot: (state, action) => {
      state.user.forEach((client: any) => {
        if (client.clientID === action.payload.clientID) {
          client.project.forEach((project: any) => {
            if (project.id === action.payload.ID) {
              project.screenshot = action.payload.screenshot;
            }
          });
        }
      });
    },
    setRemarks: (state, action) => {
      state.user.forEach((client: any) => {
        if (client.clientID === action.payload.clientID) {
          client.project.forEach((project: any) => {
            if (project.id === action.payload.ID) {
              project.remarks = action.payload.remarks;
            }
          });
        }
      });
    },
  },
});
export const { setData, setTime, setScreenShot, setRemarks } =
  trackCardSlice.actions;
export default trackCardSlice.reducer;
export const stateSelector = (state: any) => state || {};
