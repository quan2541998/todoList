import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./reducers/filtersSlice";
import todoListSlice from "./reducers/todoListSlice";

const store = configureStore({
  reducer: {
    filters: filterSlice.reducer,
    todoList: todoListSlice.reducer,
  },
});

export default store;
