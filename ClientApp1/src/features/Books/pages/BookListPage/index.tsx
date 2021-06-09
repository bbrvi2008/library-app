import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import useAppDispatch from 'hooks/useAppDispatch';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

import PageLayout from 'components/PageLayout';
import {
  fetchBooks,
  
  selectLoading,
  selectBooks,
} from '../../BooksSlice';
import BookList from '../../components/BookList';

const BookListPage: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const loading = useSelector(selectLoading)
  const books = useSelector(selectBooks)

  useEffect(() => {
    if (!books?.length) {
      dispatch(fetchBooks())
    }
  }, [])

  const handleAddClick = () => {
    history.push(`${history.location.pathname}/create`)
  }

  return (
    <PageLayout
      title="Список книг"
      actions={(
        <Button onClick={handleAddClick}>Добавить</Button>
      )}
    >
      <BookList
        books={books} 
        loading={loading.fetchBooks}
        editable
      />
    </PageLayout>
  )
}

export default BookListPage
