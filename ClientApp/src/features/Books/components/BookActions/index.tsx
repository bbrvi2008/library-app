import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useAppDispatch from 'hooks/useAppDispatch';
import { Button, Tooltip } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import {
  deleteBook,

  selectLoading,
} from '../../BooksSlice';

import classes from './style.module.scss';

interface IBookActionsProps {
  bookId: number
  compact?: boolean,
}

const BookActions: React.FC<IBookActionsProps> = ({ 
  bookId,
  compact = false,
}) => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const [isDeleting, setIsDeleting] = useState(false)

  const loading = useSelector(selectLoading)

  const handleEditClick = () => {
    history.push(`${history.location.pathname}/edit/${bookId}`)
  }

  const handleDeleteClick = () => {
    setIsDeleting(true)
    dispatch(deleteBook(bookId))
  }

  return (
    <div className={classes.actions}>
      <Tooltip title="Изменить" >
        <Button onClick={handleEditClick} icon={<EditFilled />} >
          {!compact && 'Изменить'}
        </Button>
      </Tooltip>
      <Tooltip title="Удалить" >
        <Button 
          onClick={handleDeleteClick} 
          icon={<DeleteFilled />} 
          loading={isDeleting && loading.deleteBook}
          danger
        >
          {!compact && 'Удалить'}
        </Button>
      </Tooltip>
    </div>
  )
};

export default BookActions;
