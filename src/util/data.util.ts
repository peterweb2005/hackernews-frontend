import { Options, FilterType, Sort } from "../data";
import { ListProps } from "../Home/List";

export default class DataUtil {
  static propsToOptions(props: ListProps): Options {

    let opts: any = {};

    if (props.page) {
      opts.page = props.page;
    }
    if (props.filterType && props.filterAmount) {
      opts.filter = {
        type: FilterType[props.filterType as keyof typeof FilterType],
        amount: props.filterAmount as number,
      };
    }
    if (props.sort) {
      opts.sort = Sort[props.sort as keyof typeof Sort];
    }

    return opts as Options;
  }
}
