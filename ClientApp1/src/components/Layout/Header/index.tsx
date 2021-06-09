import React from 'react'
import { Link } from 'react-router-dom'
import UserBar from 'features/User/components/UserBar';

import classes from './style.module.scss';

const Header: React.FC = () => {
  return (
    <header className={classes.appHeader}>
      <div className={classes.appHeader__logo}><Link to="/">Библиотека</Link></div>
      <div className={classes.appHeader__userBar} >
        <UserBar />
      </div>
    </header>
  )
};

export default Header
