import { combineReducers } from '@reduxjs/toolkit'
import booksReducer from 'features/Books/BooksSlice'
import userReducer from 'features/User/UserSlice'

const rootReducer = combineReducers({
  user: userReducer,
  books: booksReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
