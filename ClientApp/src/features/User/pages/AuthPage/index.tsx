import React from 'react'
import { useSelector } from 'react-redux';
import useAppDispatch from 'hooks/useAppDispatch';
import { Link, useHistory } from 'react-router-dom';

import PageLayout from 'components/PageLayout';
import {
  login,
  
  userSelectors,
} from '../../UserSlice';
import { UserCredentialsDto } from '../../UserService'
import UserForm from '../../components/UserForm';
import { Typography } from 'antd'

const BookListPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const loading = useSelector(userSelectors.selectLoading)

  const handleSubmit = (user: UserCredentialsDto) => {
    dispatch(login(user))
      .then(({ type }) => {
        if (type === login.fulfilled.toString()) {
          history.push('/')
        }
      })
  }

  return (
    <PageLayout
      title="Авторизация"
    >
      <>
        <UserForm
          onSubmit={handleSubmit}
          submitting={loading.login}
        />
        <footer>
          <Typography.Text type="secondary" >Нет аккаунта? <Link to="/registration" >Зарегистрироваться</Link>.</Typography.Text>
        </footer>
      </>
    </PageLayout>
  )
}

export default BookListPage
