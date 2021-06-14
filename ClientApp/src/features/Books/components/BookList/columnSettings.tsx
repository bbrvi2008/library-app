import React from 'react';
import { TableColumnsType, TableColumnType } from 'antd'
import { BookDto } from 'features/Books/BooksService'
import BookActions from '../BookActions'

const titleColumn: TableColumnType<BookDto> = {
  title: 'Название',
  dataIndex: 'title',
  key: 'title',
}

const aboutColumns: TableColumnsType<BookDto> = [
  {
    title: 'Жанр',
    dataIndex: 'genre',
    key: 'genre',
  }, {
    title: 'Автор',
    dataIndex: 'author',
    key: 'author',
  },
]

const actionsColumn: TableColumnType<BookDto> = {
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
}

const getBaseColumns = (options?: IColumnSettingsOption): TableColumnsType<BookDto> => {
  const { isFully } = options || {}

  let columns = [
    titleColumn,
  ]

  if (isFully) {
    columns = [
      ...columns,
      ...aboutColumns,
    ]
  }

  return columns
}

interface IColumnSettingsOption {
  isFully?: boolean
}

export const getColumnSettings = (
  options?: IColumnSettingsOption,
): TableColumnsType<BookDto> => {
  return getBaseColumns(options)
}

export const getColumnWithActionsSettings = (
  options?: IColumnSettingsOption,
): TableColumnsType<BookDto> => {
  return [
    ...getBaseColumns(options), 
    actionsColumn,
  ]
}
