import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { todoApi } from "../../../api/todoApi";

const INITIAL_STATE = {
  todos: [],
  todosOutdated: true,
};

export const getTodos = createAsyncThunk(
  "GET_TODOS",
  async (data, { rejectWithValue }) => {
    try {
      const tag = data;
      const getTodosResponse = await todoApi.getTodos(tag);
      return getTodosResponse?.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const addTodo = createAsyncThunk(
  "ADD_TODO",
  async (data, { rejectWithValue }) => {
    try {
      const { user_id, title, description, thumbnail, fileLabel, file } = data;
      const addTodoResponse = await todoApi.addTodo({
        user_id,
        title,
        description,
        thumbnail,
        fileLabel,
        file,
      });
      return addTodoResponse?.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const editTodo = createAsyncThunk(
  "EDIT_TODO",
  async (data, { rejectWithValue }) => {
    try {
      const { _id, title, description, tag, thumbnail, fileLabel, file } = data;
      const editTodoResponse = await todoApi.editTodo({
        _id,
        title,
        description,
        tag,
        thumbnail,
        fileLabel,
        file,
      });
      return editTodoResponse?.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "DELETE_TODO",
  async (data, { rejectWithValue }) => {
    try {
      const { _id } = data;
      const deleteTodoResponse = await todoApi.deleteTodo({
        _id,
      });
      return deleteTodoResponse?.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const searchTodos = createAsyncThunk(
  "SEARCH_TODOS",
  async (data, { rejectWithValue }) => {
    try {
      const { searchString, tag } = data;
      const searchTodosResponse = await todoApi.searchTodos({
        searchString,
        tag,
      });
      return searchTodosResponse?.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

/* eslint-disable no-param-reassign */
const homeSlice = createSlice({
  name: "home",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.todosOutdated = false;
    });
    builder.addCase(getTodos.pending, (state) => {
      state.todos = [];
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todosOutdated = true;
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.todosOutdated = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todosOutdated = true;
    });
    builder.addCase(searchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.todosOutdated = false;
    });
    builder.addCase(searchTodos.pending, (state) => {
      state.todos = [];
    });
  },
});
/* eslint-enable no-param-reassign */
const { actions, reducer } = homeSlice;
export { actions, reducer };
