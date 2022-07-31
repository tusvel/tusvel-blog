import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { orderBy } from 'lodash';
import { Post } from '../components';
import { TagsBlock } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [sort, setSort] = useState('createdAt');
  const sortList = [
    {
      text: 'Новые',
      value: 'createdAt',
    },
    {
      text: 'Популярные',
      value: 'viewsCount',
    },
  ];

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getTags());
  }, [dispatch]);
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        style={{ marginBottom: 15 }}
        aria-label="basic tabs example">
        {sortList.map((item, i) => (
          <Tab onClick={() => setSort(item.value)} key={i} label={item.text} />
        ))}
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : orderBy(posts.items, [sort], ['desc'])).map(
            (obj, index) =>
              isPostsLoading ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
                  key={index}
                  _id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                />
              ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
