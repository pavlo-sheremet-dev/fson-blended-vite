import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import { commentApi } from "./commentApi";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    commentApi.middleware,
  ],
});
