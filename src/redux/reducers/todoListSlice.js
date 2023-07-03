import { createSlice } from "@reduxjs/toolkit";

const todoListSlice = createSlice({
  name: "todolist",
  initialState: [
    { id: 1, name: "learn Yogo", priority: "Medium", completed: false },
    { id: 2, name: "learn JS", priority: "Medium", completed: false },
  ],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleStatus: (state, action) => {
      console.log(action.payload);
      const currentTodo = state.find((todo) => todo.id === action.payload);
      currentTodo.completed = !currentTodo.completed;
    },
  },
});

export default todoListSlice;
