import React, { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import './TagsBlock.scss';
import { SideBlock } from './SideBlock';
import { useDispatch } from 'react-redux';
import { getPostsByTag } from '../redux/slices/posts';

export const TagsBlock = ({ items, isLoading = true }) => {
  const [active, setActive] = useState('');

  const dispatch = useDispatch();
  const onClick = (name) => {
    dispatch(getPostsByTag(name));
    setActive(name);
  };

  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <div key={i} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem key={i} disablePadding>
              <ListItemButton className={name === active ? 'activeTag' : ''}>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText onClick={() => onClick(name)} primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
    </SideBlock>
  );
};
