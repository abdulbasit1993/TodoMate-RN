import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  archivedTodos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const idToDelete = action.payload.id;
      state.todos = state.todos.filter(todo => todo.id !== idToDelete);
    },
    toggleStatus: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        if (todo.status === 'pending') {
          todo.status = 'completed';
          todo.completedAt = new Date().toISOString();
        } else {
          todo.status = 'pending';
          delete todo.completedAt;
        }
      }
    },
    archiveOldCompleted: state => {
      console.log('archive check - todos:', state.todos);
      if (!Array.isArray(state.todos)) return;

      const now = new Date();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      const [toArchive, toKeep] = state.todos.reduce(
        ([archiveList, activeList], todo) => {
          if (
            todo.status === 'completed' &&
            todo.completedAt &&
            new Date(todo.completedAt).getTime() + twentyFourHours <
              now.getTime()
          ) {
            return [[...archiveList, todo], activeList];
          } else {
            return [archiveList, [...activeList, todo]];
          }
        },
        [[], []],
      );

      state.todos = toKeep;
      state.archivedTodos = [...(state.archivedTodos || []), ...toArchive];
    },
  },
});

export const {addTodo, deleteTodo, toggleStatus, archiveOldCompleted} =
  todoSlice.actions;
export default todoSlice.reducer;
