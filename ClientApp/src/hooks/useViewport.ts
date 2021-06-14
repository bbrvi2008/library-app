import { useContext } from 'react'
import { ViewportContext, IViewportValue } from 'components/Context/ViewportContext'

const useViewport = (): IViewportValue => {
  return useContext(ViewportContext)
}

export default useViewport
