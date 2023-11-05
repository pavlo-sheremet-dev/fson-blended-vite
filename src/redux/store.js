import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import { commentApi } from "./commentApi";

export const store = configureStore({
  reducer: {
    [filterSlice.name]: filterSlice.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    commentApi.middleware,
  ],
});
