import { useDispatch } from 'react-redux'
import { AppDispatch } from '../app/store'

/**
 * @description Оборачивает dispatch в кастомный хук для того, чтобы описать тип dispatch.
 *  ВАЖНО использовать именно этот хук, вместо нативного useDispatch.
 */
const useAppDispatch = () => {
  return useDispatch<AppDispatch>()
}

export default useAppDispatch
