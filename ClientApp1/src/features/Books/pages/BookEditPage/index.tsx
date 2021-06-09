import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import useAppDispatch from 'hooks/useAppDispatch';
import { useHistory, useParams } from 'react-router-dom';

import PageLayout from 'components/PageLayout';
import {
  fetchBook,
  updateBook,
  
  selectLoading,
  selectBookById,
} from '../../BooksSlice';
import BookForm from 'features/Books/components/BookForm';
import { BookCreateDto } from 'features/Books/BooksService';

interface ParamType {
  id: string
}

const BookListPage: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { id } = useParams<ParamType>()
  const bookId = parseInt(id, 10)

  const loading = useSelector(selectLoading)
  const book = useSelector(selectBookById(bookId))

  useEffect(() => {
    if (!book) {
      dispatch(fetchBook(bookId))
    }
  }, [])

  const handleSubmit = (book: BookCreateDto) => {
    dispatch(updateBook({
      id: bookId,
      ...book,
    }))
      .then(() => {
        history.goBack()
      })
  }

  const handleCancel = () => {
    history.goBack()
  }

  return (
    <PageLayout
      title="Редактирование книги"
    >
      <BookForm
        initialValues={book}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        submitting={loading.createBook}
        loading={loading.fetchBook}
      />
    </PageLayout>
  )
}

export default BookListPage
