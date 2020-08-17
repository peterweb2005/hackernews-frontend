import { Post } from "../data/post";
import dataJson from '../assets/data.json';

export class DataService {
  async getPosts(): Promise<Post[]> {
    return dataJson;
  }
}