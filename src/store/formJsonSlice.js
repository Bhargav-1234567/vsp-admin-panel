// src/store/sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  home: {
    sliderItems: [{ mainTitle: "", subTitle: "", description: "", link: "" }],
    expertise: {
      subTitle: "",
      items: [
        {
          title: "",
          description: "",
        },
      ],
    },
    whyChoose: [
      {
        title: "",
        description: "",
      },
    ],
    numerics: [{ label: "", count: 0 }],
  },
  company: {
    mainTitle: "",
    subTitle: "",
    ourStory: {
      mainTitle: "",
      subTitle: "",
    },
    companyHistory: [
      {
        year: "",
        title: "",
        description: "",
      },
    ],
    coreValues: [
      {
        title: "",
        description: "",
      },
    ],
    expertTeam: [
      {
        name: "",
        position: "",
        description: "",
        labels: [{ color: "", label: "" }],
      },
    ],
    awards: [
      {
        title: "",
        description: "",
      },
    ],
  },
  services: {
    mainTitle: "",
    subTitle: "",
    services: [{ title: "", description: "", infoPoints: [], price: "0.00" }],
    process: [{ title: "", description: "" }],
  },
  testimonials: {
    numerics: [{ label: "", count: 0 }],
    clientReview: [
      {
        name: "",
        position: "",
        rating: "",
        dateTime: "",
        tag: {
          label: "",
          color: "",
        },
      },
    ],
    moreClientReview: [
      {
        name: "",
        position: "",
        rating: "",
        dateTime: "",
        tag: {
          label: "",
          color: "",
        },
      },
    ],
    videos: [
      {
        urL: "",
        title: "",
        duration: "",
        subTitle: "",
        description: "",
      },
    ],
    reviewByService: [
      {
        title: "",
        rating: "",
        review: "",
        name: "",
      },
    ],
  },
  blog: {},
  contact: {
    officeAddress: "",
    phoneNumber: "",
    emailAddress: "",
    BusinessHours: "",
  },
};

const formJsonSlice = createSlice({
  name: "formJson",
  initialState,
  reducers: {
    initializeFormData: (state, action) => {
      // Return the new state directly
      return action.payload;
    },
    homeDataUpdate: (state, action) => {
      // Update the home property and return the state
      state.home = action.payload;
      return state;
    },
    companyDataUpdate: (state, action) => {
      // Update the company property and return the state
      state.company = action.payload;
      return state;
    },
    servicesDataUpdate: (state, action) => {
      // Update the services property and return the state
      state.services = action.payload;
      return state;
    },
    testimonialsDataUpdate: (state, action) => {
      // Update the testimonials property and return the state
      state.testimonials = action.payload;
      return state;
    },
    contactDataUpdate: (state, action) => {
      // Fixed: This was updating testimonials instead of contact
      state.contact = action.payload;
      return state;
    },
  },
});

export const {
  homeDataUpdate,
  companyDataUpdate,
  contactDataUpdate,
  servicesDataUpdate,
  testimonialsDataUpdate,
  initializeFormData,
} = formJsonSlice.actions;
export default formJsonSlice.reducer;
