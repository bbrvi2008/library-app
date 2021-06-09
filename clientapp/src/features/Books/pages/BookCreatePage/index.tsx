import React from 'react'
import { useSelector } from 'react-redux';
import useAppDispatch from 'hooks/useAppDispatch';
import { useHistory } from 'react-router-dom';

import PageLayout from 'components/PageLayout';
import {
  createBook,
  
  selectLoading,
} from '../../BooksSlice';
import BookForm from 'features/Books/components/BookForm';
import { BookCreateDto } from 'features/Books/BooksService';

const BookListPage: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const loading = useSelector(selectLoading)

  const handleSubmit = (book: BookCreateDto) => {
    dispatch(createBook(book))
      .then(() => {
        history.goBack()
      })
  }

  const handleCancel = () => {
    history.goBack()
  }

  return (
    <PageLayout
      title="Добавление книги"
    >
      <BookForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        submitting={loading.createBook}
      />
    </PageLayout>
  )
}

export default BookListPage
