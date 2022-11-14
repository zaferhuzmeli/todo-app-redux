import { configureStore } from "@reduxjs/toolkit";

import todosSlice from "./slices/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todosSlice,
  },
});
