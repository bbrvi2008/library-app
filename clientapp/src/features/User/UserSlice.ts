import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'
import handleThunk, {
  SliceErrorBase,
  SliceLoadingBase,
} from '@velialiev/redux-toolkit-handle-thunk'
import UserService, { 
  UserCredentialsDto,
  UserLogginedDto,
} from './UserService'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

interface State {
  user?: UserLogginedDto,
  token: string,
  loading: SliceLoading
  error: SliceError
}

const getSliceState = (state: RootState) => state.user

export const userSelectors = {
  selectIsAuthorized: (state: RootState): boolean => !!getSliceState(state).token,
  selectToken: (state: RootState) => getSliceState(state).token,
  selectUser: (state: RootState) => getSliceState(state).user,
  selectLoading: (state: RootState) => getSliceState(state).loading,
  selectError: (state: RootState) => getSliceState(state).error,
}

const thunks = {
  registration: createAsyncThunk('user/registration', (user: UserCredentialsDto) => {
    return UserService.registration(user)
  }),
  login: createAsyncThunk('user/login', async (user: UserCredentialsDto) => {
    return UserService.login(user)
  }),
}

export const {
  registration,
  login,
} = thunks

const initialState: State = {
  user: undefined,
  token: '',
  loading: {},
  error: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined
      state.token = ''
    },
  },
  extraReducers: (builder) => {
    handleThunk(builder, login,
      (state, user) => {
        state.user = user
        state.token = user.token
      })
    handleThunk(builder, registration)
  },
})

type ThunkNamesUnion = keyof typeof thunks
type SliceLoading = SliceLoadingBase<ThunkNamesUnion>
type SliceError = SliceErrorBase<ThunkNamesUnion>

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['token', 'user'],
}

export const { logout } = userSlice.actions
export default persistReducer(persistConfig, userSlice.reducer)
