
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  result: null,
  error: null,
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    addQuery: (state, action) => {
      state.history.push(action.payload);
      state.error = null;  
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    clearHistory: (state) => {
      state.history = [];
      state.result = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { addQuery, setResult, clearHistory, setError } = querySlice.actions;
export default querySlice.reducer;
