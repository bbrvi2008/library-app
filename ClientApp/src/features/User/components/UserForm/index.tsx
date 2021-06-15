import React from 'react';
import {
  Button,
  Form,
  Input,
} from 'antd';
import { UserCredentialsDto } from 'features/User/UserService'

import classes from './style.module.scss';

interface IUserFormProps {
  onSubmit(user: UserCredentialsDto): void
  submitting?: boolean
}

const UserForm: React.FunctionComponent<IUserFormProps> = ({
  onSubmit,
  submitting,
}) => {
  return (
    <Form
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[{ required: true, message: 'Пожалуйста введите имя пользователя!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item className={classes.UserForm__buttons} >
        <Button type="primary" htmlType="submit" loading={submitting} >
          Отправить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UserForm;
