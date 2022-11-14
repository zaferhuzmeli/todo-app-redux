import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("/todos");
  return response.data;
});

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (data) => {
    const response = await axios.post("/todos", data);
    return await response.data;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    const response = await axios.patch(`/todos/${id}`, data);
    return await response.data;
  }
);

export const destroyTodoAsync = createAsyncThunk(
  "todos/destroyTodoAsync",
  async (id) => {
    await axios.delete(`/todos/${id}`);
    return id;
  }
);
