// src/store/sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  isMobile: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    setMobileView: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const { toggleSidebar, closeSidebar, openSidebar, setMobileView } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
