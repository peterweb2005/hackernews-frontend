import React from 'react';
import { useObserver } from "mobx-react-lite";
import ListItem from './ListItem';
import { store } from './index';
import { Post } from '../data/post';

export default function List() {
  console.log('List()');
  return useObserver(() => {

    const items = store.items;

    const listItems = items.map((item: Post) =>
      <ListItem key={item.id} item={item} />
    );

    return (
      <ul>
        {listItems}
      </ul>
    );
  });
}
