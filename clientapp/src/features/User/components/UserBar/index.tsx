import React, { useContext } from 'react'
import useAppDispatch from 'hooks/useAppDispatch';
import { Link, useHistory } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import UserInfo from './UserInfo';
import AuthContext from '../../AuthContext';
import { logout } from '../../UserSlice';

import classes from './style.module.scss'

const UserBar: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { isAuthorized, user } = useContext(AuthContext)
  const { username = '' } = user || {}

  const handleLogoutClick = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <div className={classes.userBar}>
      {
        isAuthorized
          ? (
            <UserInfo 
              username={username}
              onLogoutClick={handleLogoutClick}
            />
          )
          : (
            <Link to="/login">
              <Button icon={<UserOutlined />} type="link" >Войти</Button>
            </Link>
          )
      }
    </div>
  )
}

export default UserBar
