import React, { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

const ProtectedRoute: FC<RouteProps & Props> = ({
  condition,
  redirectTo = '/',
  children,
  ...props
}) => {
  return (
    <>
      {condition ? (
        <Route {...props}>{children}</Route>
      ) : (
        <Redirect to={redirectTo} />
      )}
    </>
  )
}

type Props = {
  condition: boolean
  redirectTo?: string
}

export default ProtectedRoute
