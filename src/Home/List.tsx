import React from 'react';
import ListItem from './ListItem';
import { clientService, dataService } from '../index';
import { Options } from '../data';
import { Post } from '../data/post';

export interface ListProps {
  options: Options;
}

export default function List(props: ListProps) {
  console.log('List()');
  console.log('props: ', props);

  const options: Options = props?.options;

  const [items, setItems] = React.useState<Post[]>([]);

  React.useEffect(
    () => {
      (async () => {
        // temp local
        //const items: Post[] = await dataService.getPosts();

        const items: Post[] = await clientService.getPosts(options);
        setItems(items);
      })();
    },
    [props],
  );

  const listItems = items.map((item: Post) =>
    <ListItem key={item.id} item={item} />
  );

  return (
    <ul>
      {listItems}
    </ul>
  );
}
