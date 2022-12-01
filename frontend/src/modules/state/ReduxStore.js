import { configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer } from "./slices/authSlice";
import { reducer as homeReducer } from "./slices/homeSlice";

const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
  },
});

export { reduxStore };
