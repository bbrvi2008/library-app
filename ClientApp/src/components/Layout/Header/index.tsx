import React from 'react'
import { Link } from 'react-router-dom'
import { ReadOutlined } from '@ant-design/icons'
import UserBar from 'features/User/components/UserBar';

import classes from './style.module.scss';

const Header: React.FC = () => {
  return (
    <header className={classes.appHeader}>
      <Link to="/" className={classes.appHeader__logo} >
        <ReadOutlined />
        <span className={classes.appHeader__logoText} >Библиотека</span>
      </Link>
      <div className={classes.appHeader__userBar} >
        <UserBar />
      </div>
    </header>
  )
};

export default Header
