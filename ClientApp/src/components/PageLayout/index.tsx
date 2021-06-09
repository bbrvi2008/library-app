import React from 'react'
import { Typography } from 'antd';

import classes from './style.module.scss';

interface Props {
  title?: string
  actions?: JSX.Element
  children: JSX.Element | string
}

const PageLayout: React.FC<Props> = ({ title, actions, children }) => {
  return (
    <div className={classes.pageLayout} >
      {title && <Typography.Title className={classes.pageLayout__title}>{title}</Typography.Title>}
      {actions && <div className={classes.pageLayout__actions}>{actions}</div>}
      <div className={classes.pageLayout__content}>{children}</div>
    </div>
  )
}

export default PageLayout
