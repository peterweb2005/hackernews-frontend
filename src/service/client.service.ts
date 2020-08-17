import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Options } from '../data';
import { Post } from '../data/post';

const client = new ApolloClient({
  typeDefs: gql`
    enum Sort {
      asc
      desc
    }
    enum FilterType {
      eq
      ge
      gt
      le
      lt
    }
    input Filter {
      type: FilterType
      amount: Int
    }
    input PostFilter {
      comments: Filter
    }
    input PostOrderBy {
      comments: Sort
    }
  `,
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});


export default class ClientService {
  async getPosts(opts: Options): Promise<Post[]> {
    console.log('getPosts()');

    //
    let pageArgs = opts.page;
    let filterArgs = { comments: opts.filter };
    let orderByArgs = { comments: opts.sort };

    //
    const query = gql`
      query posts($page: Int, $filter: PostFilter, $orderBy: PostOrderBy) {
        posts(page: $page, filter: $filter, orderBy: $orderBy) {
          id
          user
          title
          score
          age
          comments
          rank
        }
      }
    `;
    const result = await client
      .query({
        query,
        variables: {
          page: pageArgs,
          filter: filterArgs,
          orderBy: orderByArgs,
        },
      });
    console.log('result: ', result);

    return result.data.posts;
  }
}