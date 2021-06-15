import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Avatar, 
  Button, 
  Dropdown, 
  Menu,
} from 'antd'
import { DownOutlined, LogoutOutlined } from '@ant-design/icons'

import classes from './style.module.scss';

interface IUserInfoProps {
  username: string
  onLogoutClick(): void
}

const UserInfo: React.FunctionComponent<IUserInfoProps> = ({
  username,
  onLogoutClick,
}) => {
  const firstLatterUsername = username.toUpperCase().slice(0, 1)
  const menu = (
    <Menu className={classes.userInfo__menu} >
      <Menu.Item key="books" >
        <Link to="/admin/books" className={classes.userInfo__menuItem} >Мои книги</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={onLogoutClick} >
        <span className={classes.userInfo__menuItem} >
          <span>Выйти</span>
          <LogoutOutlined className={classes.userInfo__logoutIcon} />
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Avatar>{firstLatterUsername}</Avatar>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" >
        <Button type="link" >
          {username} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  )
}

export default UserInfo
