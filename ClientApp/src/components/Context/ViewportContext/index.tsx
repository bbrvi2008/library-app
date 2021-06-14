import React from 'react'

export interface IViewportValue {
  width?: number
  height?: number
}

export const ViewportContext = React.createContext<IViewportValue>({})

interface IViewportProviderProps {
  children: JSX.Element
}

const ViewportProvider: React.FC<IViewportProviderProps> = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth)
  const [height, setHeight] = React.useState(window.innerHeight)

  const handleWindowResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  )
}

export default ViewportProvider
