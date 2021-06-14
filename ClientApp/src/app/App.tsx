import React from 'react'
import { useSelector } from 'react-redux'
import { 
  Switch, 
  Route, 
} from 'react-router-dom'
import { ConfigProvider, Layout } from 'antd'
import locale from 'antd/lib/locale/ru_RU';
import 'antd/dist/antd.css'

import {
  userSelectors,
} from 'features/User/UserSlice'
import { AuthContextProvider } from 'features/User/AuthContext'
import ViewportContextProvider from 'components/Context/ViewportContext';

import classes from './style.module.scss'

import Header from 'components/Layout/Header'
import ProtectedRoute from 'components/ProtectedRoute';

import BooksRoute from 'features/Books/Routes'
import PublicBookListPage from 'features/Books/pages/PublicBookListPage'
import AuthPage from 'features/User/pages/AuthPage'
import RegistrationPage from 'features/User/pages/RegistrationPage'

const { 
  Content,
} = Layout

const App = () => {
  const isAuthorized = useSelector(userSelectors.selectIsAuthorized)
  const user = useSelector(userSelectors.selectUser)

  const contextValue = {
    isAuthorized,
    user,
  }

  return (
    <ConfigProvider locale={locale}>
      <ViewportContextProvider>
        <AuthContextProvider value={contextValue} >
          <Layout>
            <Header />
            <Layout className={classes.app__main} >
              <Content className={classes.app__content}>
                <Switch>
                  <Route path="/" exact >
                    <PublicBookListPage />
                  </Route>
                  <ProtectedRoute path="/admin/books" condition={isAuthorized} redirectTo="/login" >
                    <BooksRoute path="/admin/books" />
                  </ProtectedRoute>
                  <Route path="/login">
                    <AuthPage />
                  </Route>
                  <Route path="/registration">
                    <RegistrationPage />
                  </Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </AuthContextProvider>
      </ViewportContextProvider>
    </ConfigProvider>
  )
}

export default App
