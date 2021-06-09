import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import rootReducer, { RootState } from './rootReducer'
import { interceptors } from './Http';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

interceptors(store)

export const persistor = persistStore(store)

if (process.env.NODE_ENV === 'development' && module.children) {
  module.hot.accept('./rootReducer', () => {
    store.replaceReducer(rootReducer)
  })
}

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type AppThunk<T = void> = ThunkAction<
  T,
  RootState,
  unknown,
  Action<string>
>

export default store
