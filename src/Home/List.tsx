import React from 'react';
import ListItem from './ListItem';
import { clientService, dataService } from '../index';
import { Options } from '../data';
import { Post } from '../data/post';
import DataUtil from '../util/data.util';

export interface ListProps {
  page?: number;
  filterType?: string;
  filterAmount?: number;
  sort?: string;
}

export default function List(props: ListProps) {
  console.log('List()');
  console.log('props: ', props);

  const options: Options = DataUtil.propsToOptions(props);

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
