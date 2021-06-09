import { 
  ActionReducerMapBuilder, 
  AsyncThunk, 
  Draft, 
  SerializedError,
} from '@reduxjs/toolkit'

export type SliceLoadingBase<T extends number | string | symbol> = Partial<Record<T, boolean>>
export type SliceErrorBase<T extends number | string | symbol> = Partial<
  Record<T, SerializedError | null | unknown>
  >

type LoadingAndErrors = { loading: SliceLoadingBase<any>; error: SliceErrorBase<any> }

const handleThunk = <State extends LoadingAndErrors, ThunkPayload, ThunkArg>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<ThunkPayload, ThunkArg, any>,
  afterFulfilled?: (state: Draft<State>, payload: ThunkPayload) => void,
  afterLoading?: (state: Draft<State>) => void,
  afterError?: (state: Draft<State>, error: SerializedError | unknown) => void,
) => {
  const [, thunkName = ''] = thunk.typePrefix.split('/')

  builder.addCase(thunk.pending, (state) => {
    state.loading[thunkName] = true
    state.error[thunkName] = null

    if (afterLoading) {
      afterLoading(state)
    }
  })

  builder.addCase(thunk.fulfilled, (state, { payload }) => {
    state.loading[thunkName] = false

    if (afterFulfilled) {
      afterFulfilled(state, payload)
    }
  })

  builder.addCase(thunk.rejected, (state, { payload }) => {
    state.loading[thunkName] = false
    state.error[thunkName] = payload

    if (afterError) {
      afterError(state, payload)
    }
  })
}

export default handleThunk
