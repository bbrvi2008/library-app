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

const thunks = {
  fetchBook: createAsyncThunk('books/fetchBook', (id: number) => {
    return BooksService.getBookById(id)
  }),
  fetchBooks: createAsyncThunk('books/fetchBooks', () => {
    return BooksService.getBooks()
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
  createBook,
  updateBook,
  deleteBook,
} = thunks

const booksAdapter = createEntityAdapter<BookDto>()

interface State {
  books: ReturnType<typeof booksAdapter.getInitialState>
  loading: SliceLoading
  error: SliceError
}

const initialState: State = {
  books: booksAdapter.getInitialState(),
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
    handleThunk(builder, createBook, (state, book) => {
      booksAdapter.addOne(state.books, book)
    })
    handleThunk(builder, updateBook, (state, { id, ...changes }) => {
      booksAdapter.updateOne(state.books, {
        id,
        changes,
      })
    })
    handleThunk(builder, deleteBook, (state, { id }) => {
      booksAdapter.removeOne(state.books, id)
    })
  },
})

const getSliceState = (state: RootState) => state.books

export const selectLoading = (state: RootState) => getSliceState(state).loading
export const selectError = (state: RootState) => getSliceState(state).error

export const {
  selectAll: selectBooks,
  selectById,
} = booksAdapter.getSelectors((state: RootState) => getSliceState(state).books)

export const selectBookById = (id: number) => (state: RootState) => selectById(state, id)

type ThunkNamesUnion = keyof typeof thunks
type SliceLoading = SliceLoadingBase<ThunkNamesUnion>
type SliceError = SliceErrorBase<ThunkNamesUnion>

export default booksSlice.reducer
