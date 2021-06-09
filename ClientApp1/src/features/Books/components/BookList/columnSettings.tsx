import React from 'react';
import { TableColumnsType } from 'antd'
import { BookDto } from 'features/Books/BooksService'
import BookActions from '../BookActions'

export const getColumnSettings = (): TableColumnsType<BookDto> => {
  return [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: 'Жанр',
      dataIndex: 'genre',
      key: 'genre',
    }, {
      title: 'Автор',
      dataIndex: 'author',
      key: 'author',
    }, 
  ]
}

export const getColumnWithActionsSettings = (): TableColumnsType<BookDto> => {
  const baseColumns = getColumnSettings()
  
  return [
    ...baseColumns, {
      key: 'actions',
      align: 'right',
      render: (_, { id }) => {
        return (
          <BookActions
            bookId={id}
            compact
          />
        )
      },
    },
  ]
}
