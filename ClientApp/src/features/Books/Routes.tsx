import React from 'react'
import { Route, Switch } from 'react-router-dom'
import BookListPage from './pages/BookListPage'
import BookCreatePage from './pages/BookCreatePage'
import BookEditPage from './pages/BookEditPage';

interface Props {
  path: string
}

const Routes: React.FC<Props> = ({ path }) => (
  <Switch>
    <Route path={`${path}`} exact >
      <BookListPage />
    </Route>
    <Route path={`${path}/create`} >
      <BookCreatePage />
    </Route>
    <Route path={`${path}/edit/:id`} >
      <BookEditPage />
    </Route>
    <Route path={`${path}/:id`} >
      Книга
    </Route>
  </Switch>
)

export default Routes
