import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { $host } from '../http';
import { Post, Index, CommentsBlock } from '../components';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentById } from '../redux/slices/comment';

export const FullPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const comments = useSelector((state) => state.comment.comments);

  useEffect(() => {
    $host
      .get(`/posts/getOne/${id}`)
      .then(({ data }) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(getCommentById({ post: id }));
  }, []);

  if (isLoading) {
    return <Post isLoading={true} />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl && data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments} isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
