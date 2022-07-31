import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/user';
import { $host } from '../../http';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [imageUrl, setImageUrl] = useState('');
  const [value, setValue] = React.useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const inputFileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await $host.post('/posts/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      $host.get(`/posts/getOne/${id}`).then(({ data }) => {
        setTitle(data.title);
        setValue(data.text);
        setImageUrl(data.imageUrl);
        setTags(data.tags);
      });
    }
  }, []);

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const isEditing = Boolean(id);

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title,
        tags: isEditing ? tags && tags.join(',') : tags ? tags : null,
        text: value,
        imageUrl,
      };
      const { data } = isEditing
        ? await $host.patch(`/posts/update/${id}`, fields)
        : await $host.post('/posts/create', fields);
      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!localStorage.getItem('token') && !isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={imageUrl && `http://localhost:5000${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        onChange={(e) => setTags(e.target.value)}
        value={tags}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
