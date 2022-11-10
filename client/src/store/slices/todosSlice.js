import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios("http://localhost:7000/todos");
  return await response.data;
});

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false,
          },
        };
      },
    },
    toggleTodo: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
    destroyTodo: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },
    changedActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed);
    },
  },
  extraReducers: {
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
    }
  }
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

export const {
  addTodo,
  toggleTodo,
  destroyTodo,
  changedActiveFilter,
  clearCompleted,
} = todosSlice.actions;
export default todosSlice.reducer;
