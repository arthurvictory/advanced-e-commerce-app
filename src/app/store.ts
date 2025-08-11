import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {}, // Reducers will be added here later
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
