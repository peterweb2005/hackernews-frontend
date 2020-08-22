import { observable, action, runInAction } from "mobx"
import { Options, Sort, FilterType } from '../data/index';
import { Post } from '../data/post';
import { clientService, dataService } from '../index';

export class Store {

  @observable
  progress: boolean = false;

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

    this.progress = true;

    const items: Post[] = await clientService.getPosts(this.options);

    this.progress = false;

    //runInAction(() => {
    this.items = items;
    //});
  }
}
