import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'
import handleThunk, {
  SliceErrorBase,
  SliceLoadingBase,
} from '@velialiev/redux-toolkit-handle-thunk'
import BooksService, { 
  BookDto,
  BookCreateDto,
} from './BooksService'
import { 
  logout,
} from 'features/User/UserSlice'

const thunks = {
  fetchBook: createAsyncThunk('books/fetchBook', (id: number) => {
    return BooksService.getBookById(id)
  }),
  fetchBooks: createAsyncThunk('books/fetchBooks', () => {
    return BooksService.getBooks()
  }),
  fetchUserBooks: createAsyncThunk('books/fetchUserBooks', () => {
    return BooksService.getUserBooks()
  }),
  createBook: createAsyncThunk('books/createBook', (book: BookCreateDto) => {
    return BooksService.createBook(book)
  }),
  updateBook: createAsyncThunk('books/updateBook', (book: BookDto) => {
    return BooksService.updateBook(book)
  }),
  deleteBook: createAsyncThunk('books/deleteBook', (id: number) => {
    return BooksService.deleteBook(id)
  }),
}

export const {
  fetchBook,
  fetchBooks,
  fetchUserBooks,
  createBook,
  updateBook,
  deleteBook,
} = thunks

const booksAdapter = createEntityAdapter<BookDto>()

interface State {
  books: ReturnType<typeof booksAdapter.getInitialState>
  userBooks: ReturnType<typeof booksAdapter.getInitialState>
  loading: SliceLoading
  error: SliceError
}

const initialState: State = {
  books: booksAdapter.getInitialState(),
  userBooks: booksAdapter.getInitialState(),
  loading: {},
  error: {},
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleThunk(builder, fetchBook, (state, book) => {
      booksAdapter.addOne(state.books, book)
    })
    handleThunk(builder, fetchBooks, (state, books) => {
      booksAdapter.setAll(state.books, books)
    })
    handleThunk(builder, fetchUserBooks, (state, books) => {
      booksAdapter.setAll(state.userBooks, books)
    })
    handleThunk(builder, createBook, (state, book) => {
      // booksAdapter.addOne(state.books, book)
      booksAdapter.addOne(state.userBooks, book)
    })
    handleThunk(builder, updateBook, (state, { id, ...changes }) => {
      // booksAdapter.updateOne(state.books, {
      //   id,
      //   changes,
      // })
      booksAdapter.updateOne(state.userBooks, {
        id,
        changes,
      })
    })
    handleThunk(builder, deleteBook, (state, { id }) => {
      // booksAdapter.removeOne(state.books, id)
      booksAdapter.removeOne(state.userBooks, id)
    })
    builder.addCase(logout, (state, action) => {
      state.userBooks = booksAdapter.getInitialState()
    })
  },
})

const getSliceState = (state: RootState) => state.books

export const selectLoading = (state: RootState) => getSliceState(state).loading
export const selectError = (state: RootState) => getSliceState(state).error

export const {
  selectAll: selectBooks,
} = booksAdapter.getSelectors((state: RootState) => getSliceState(state).books)

export const {
  selectAll: selectUserBooks,
  selectById,
} = booksAdapter.getSelectors((state: RootState) => getSliceState(state).userBooks)

export const selectUserBookById = (id: number) => (state: RootState) => selectById(state, id)

type ThunkNamesUnion = keyof typeof thunks
type SliceLoading = SliceLoadingBase<ThunkNamesUnion>
type SliceError = SliceErrorBase<ThunkNamesUnion>

export default booksSlice.reducer
