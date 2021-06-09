import React from 'react'
import { UserLogginedDto } from './UserService'

export interface AuthContextData {
  isAuthorized: boolean,
  user?: UserLogginedDto
}

const AuthContext = React.createContext<AuthContextData>({
  isAuthorized: false,
  user: undefined,
})

const { Provider: AuthContextProvider } = AuthContext

export default AuthContext
export { AuthContextProvider }
