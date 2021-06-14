import React from 'react'
import { Table } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import useViewport from 'hooks/useViewport';
import { Brackpoints } from 'utils/constants';

import { BookDto } from '../../BooksService'
import { getColumnSettings, getColumnWithActionsSettings } from './columnSettings';

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
  const { width = 0 } = useViewport()

  const size = width < Brackpoints.SM
    ? 'small'
    : undefined as SizeType
  const isFully = width > Brackpoints.SM

  const columns = editable
    ? getColumnWithActionsSettings({ isFully })
    : getColumnSettings({ isFully: true })

  return (
    <Table
      size={size}
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
