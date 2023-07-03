import { createSelector } from "@reduxjs/toolkit";

const todoListSelector = (state) => state.todoList;
const filerSearchText = (state) => state.filters.searchText;
const filterStatusTodo = (state) => state.filters.status;
const filterPriorties = (state) => state.filters.priorities;

export const todoRemainingSelector = createSelector(
  todoListSelector,
  filerSearchText,
  filterStatusTodo,
  filterPriorties,
  (todoList, searchText, status, priorities) => {

    if (status === "All") {
      return priorities.length
        ? todoList.filter((todo) => todo.name.includes(searchText) && priorities.includes(todo.priority))
        : todoList.filter((todo) => todo.name.includes(searchText));

    }

    return todoList.filter((todo) => {
      return todo.name.includes(searchText)
        && (status === "Completed" ? todo.completed : !todo.completed)
        && (priorities.length ? priorities.includes(todo.priority) : true)
    });
  }
);
