import { observable, action, runInAction } from "mobx"
import { Options, Sort, FilterType } from '../data/index';
import { Post } from '../data/post';
import { clientService, dataService } from '../index';

export class Store {

  @observable
  options: Options = {
    page: 1,
    filter: {
      type: FilterType.ge,
      amount: 100,
    },
    sort: Sort.asc,
  };

  @observable
  items: Post[] = [];

  @action
  async updateItems() {
    const items: Post[] = await clientService.getPosts(this.options);
    //runInAction(() => {
      this.items = items;
    //});
  }
}
