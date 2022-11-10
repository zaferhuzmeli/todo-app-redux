import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      {
        id: 1,
        title: "Taste JavaScript",
        completed: true,
      },
      {
        id: 2,
        title: "Learn JavaScript",
        completed: false,
      },
      {
        id: 3,
        title: "Buy a unicorn",
        completed: false,
      },
    ],
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
