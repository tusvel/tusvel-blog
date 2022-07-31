import React, { useState } from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentById } from '../../redux/slices/comment';
import { useParams } from 'react-router-dom';
import { $host } from '../../http';

export const Index = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.data);
  const [text, setText] = useState('');

  const onClick = async () => {
    await $host.post(`/comment/create/${id}`, { text });
    dispatch(getCommentById({ post: id }));
    setText('');
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar src={data?.avatarUrl} classes={{ root: styles.avatar }} />
        <div className={styles.form}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline={false}
            fullWidth
          />
          <Button disabled={!data} onClick={onClick} variant="contained">
            {!data ? 'войдите, чтобы оставить комментарий.' : 'Отправить'}
          </Button>
        </div>
      </div>
    </>
  );
};
