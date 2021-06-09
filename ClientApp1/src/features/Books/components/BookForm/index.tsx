import React, { useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Spin,
} from 'antd';
import { BookCreateDto, BookDto } from 'features/Books/BooksService';

import classes from './style.module.scss';

interface IBookFormProps {
  initialValues?: BookDto
  onCancel(): void
  onSubmit(book: BookCreateDto): void
  submitting?: boolean
  loading?: boolean
}

const BookForm: React.FunctionComponent<IBookFormProps> = ({
  initialValues,
  onCancel,
  onSubmit,
  submitting,
  loading = false,
}) => {
  const [form] = Form.useForm<BookCreateDto>()

  useEffect(() => {
    form.resetFields()
  }, [initialValues])

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Название"
          name="title"
          rules={[{ required: true, message: 'Пожалуйста введите название книги!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Автор"
          name="author"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Жанр"
          name="genre"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Год"
          name="year"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item className={classes.bookForm__buttons} >
          <Button onClick={onCancel} className={classes.bookForm__button} >
            Отмена
          </Button>
          <Button type="primary" htmlType="submit" loading={submitting} className={classes.bookForm__button} >
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default BookForm;
