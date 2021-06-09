import React from 'react'
import { Table, TableColumnsType } from 'antd'

import { BookDto } from '../../BooksService'
import { getColumnSettings, getColumnWithActionsSettings } from './columnSettings';
import BookActions from '../../components/BookActions'

interface IBookListProps {
  books: BookDto[]
  loading?: boolean
  editable?: boolean
}

const BookList: React.FunctionComponent<IBookListProps> = ({ 
  books, 
  loading,
  editable = false,
}) => {
  const columns = editable
    ? getColumnWithActionsSettings()
    : getColumnSettings()

  return (
    <Table
      columns={columns}
      dataSource={books}
      rowKey="id"
      loading={loading}
      pagination={{
        hideOnSinglePage: true,
      }}
    />
  )
}

export default BookList
