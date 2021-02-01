import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IState {
  id: string
  text: string
  completed: boolean
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as IState[],
  reducers: {
    addTodo(state, action: PayloadAction<{ id: string; text: string }>) {
      const { id, text } = action.payload
      state.push({ id, text, completed: false })
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
})

export const { addTodo, toggleTodo } = todosSlice.actions

export const { reducer: todosReducer } = todosSlice
