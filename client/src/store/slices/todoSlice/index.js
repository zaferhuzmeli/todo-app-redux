import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTodos,
  addTodoAsync,
  toggleTodoAsync,
  destroyTodoAsync,
} from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
  },
  reducers: {
    changedActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed);
    },
  },
  extraReducers: {
    // Get all todos
    [fetchTodos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    // Add Todo
    [addTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.isLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    // Toggle Todo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.completed = completed;
      }
    },
    // Destroy Todo
    [destroyTodoAsync.fulfilled]: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
  const items = selectTodos(state);
  const activeFilter = state.todos.activeFilter;
  return activeFilter !== "all"
    ? items.filter((item) =>
        activeFilter === "active"
          ? item.completed === false
          : item.completed === true
      )
    : items;
};

export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { changedActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
