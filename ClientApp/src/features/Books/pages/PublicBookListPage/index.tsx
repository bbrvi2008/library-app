import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import useAppDispatch from 'hooks/useAppDispatch';

import PageLayout from 'components/PageLayout';
import {
  fetchBooks,
  
  selectLoading,
  selectBooks,
} from '../../BooksSlice';
import BookList from '../../components/BookList';

const PublicBookListPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const loading = useSelector(selectLoading)
  const books = useSelector(selectBooks)

  useEffect(() => {
    // if (!books.length) {
    dispatch(fetchBooks())
    // }
  }, [])

  return (
    <PageLayout
      title="Список книг"
    >
      <BookList 
        books={books} 
        loading={loading.fetchBooks}
      />
    </PageLayout>
  )
}

export default PublicBookListPage
