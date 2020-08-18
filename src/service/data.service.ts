import { Post } from "../data/post";
import dataJson from '../assets/data.json';

// NOT used
export class DataService {
  async getPosts(): Promise<Post[]> {
    return dataJson;
  }
}