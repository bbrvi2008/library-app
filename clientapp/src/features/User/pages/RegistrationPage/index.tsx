import React from 'react'
import { useSelector } from 'react-redux';
import useAppDispatch from 'hooks/useAppDispatch';
import { Link, useHistory } from 'react-router-dom';
import { Typography } from 'antd'

import PageLayout from 'components/PageLayout';
import {
  registration,
  
  userSelectors,
} from '../../UserSlice';
import { UserCredentialsDto } from '../../UserService'
import UserForm from '../../components/UserForm';

const BookListPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const loading = useSelector(userSelectors.selectLoading)

  const handleSubmit = (user: UserCredentialsDto) => {
    dispatch(registration(user))
      .then(({ type }) => {
        if (type === registration.fulfilled.toString()) {
          history.push('/')
        }
      })
  }

  return (
    <PageLayout
      title="Регистрация"
    >
      <>
        <UserForm
          onSubmit={handleSubmit}
          submitting={loading.login}
        />
        <footer>
          <Typography.Text type="secondary" >Уже есть аккаунт? <Link to="/login" >Войти</Link>.</Typography.Text>
        </footer>
      </>
    </PageLayout>
  )
}

export default BookListPage
