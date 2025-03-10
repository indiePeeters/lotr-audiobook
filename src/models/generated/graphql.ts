/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  numeric: { input: any; output: any; }
  uuid: { input: any; output: any; }
};
export type Book = {
  __typename?: 'book';
  Book_Chapter?: Maybe<Chapter>;
  author: Scalars['String']['output'];
  cover_url: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  title: Scalars['String']['output'];
};
export type BookAggregateFields = {
  __typename?: 'book_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<BookMaxFields>;
  min?: Maybe<BookMinFields>;
};
export type BookMaxFields = {
  __typename?: 'book_max_fields';
  author?: Maybe<Scalars['String']['output']>;
  cover_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};
export type BookMinFields = {
  __typename?: 'book_min_fields';
  author?: Maybe<Scalars['String']['output']>;
  cover_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};
export type BookMutationResponse = {
  __typename?: 'book_mutation_response';
  affected_rows: Scalars['Int']['output'];
  returning: Array<Book>;
};
export type BookOrderBy = {
  Book_Chapter?: InputMaybe<ChapterOrderBy>;
  author?: InputMaybe<OrderBy>;
  cover_url?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
};
export type BookUpdates = {
};
export type Chapter = {
  __typename?: 'chapter';
  Chapter_Book?: Maybe<Book>;
  audioUrl: Scalars['String']['output'];
  author: Scalars['String']['output'];
  bookId?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['uuid']['output'];
  imageUrl: Scalars['String']['output'];
  order?: Maybe<Scalars['numeric']['output']>;
  title: Scalars['String']['output'];
};
export type ChapterAggregateFields = {
  __typename?: 'chapter_aggregate_fields';
  avg?: Maybe<ChapterAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<ChapterMaxFields>;
  min?: Maybe<ChapterMinFields>;
  stddev?: Maybe<ChapterStddevFields>;
  stddev_pop?: Maybe<ChapterStddevPopFields>;
  stddev_samp?: Maybe<ChapterStddevSampFields>;
  sum?: Maybe<ChapterSumFields>;
  var_pop?: Maybe<ChapterVarPopFields>;
  var_samp?: Maybe<ChapterVarSampFields>;
  variance?: Maybe<ChapterVarianceFields>;
};
export type ChapterAvgFields = {
  __typename?: 'chapter_avg_fields';
  order?: Maybe<Scalars['Float']['output']>;
};
export type ChapterMaxFields = {
  __typename?: 'chapter_max_fields';
  audioUrl?: Maybe<Scalars['String']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  bookId?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['numeric']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};
export type ChapterMinFields = {
  __typename?: 'chapter_min_fields';
  audioUrl?: Maybe<Scalars['String']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  bookId?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['numeric']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};
export type ChapterMutationResponse = {
  __typename?: 'chapter_mutation_response';
  affected_rows: Scalars['Int']['output'];
  returning: Array<Chapter>;
};
export type ChapterOrderBy = {
  Chapter_Book?: InputMaybe<BookOrderBy>;
  audioUrl?: InputMaybe<OrderBy>;
  author?: InputMaybe<OrderBy>;
  bookId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  imageUrl?: InputMaybe<OrderBy>;
  order?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
};
export type ChapterStddevFields = {
  __typename?: 'chapter_stddev_fields';
  order?: Maybe<Scalars['Float']['output']>;
};
export type ChapterStddevPopFields = {
  __typename?: 'chapter_stddev_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};
export type ChapterStddevSampFields = {
  __typename?: 'chapter_stddev_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};
export type ChapterSumFields = {
  __typename?: 'chapter_sum_fields';
  order?: Maybe<Scalars['numeric']['output']>;
};
export type ChapterUpdates = {
};
export type ChapterVarPopFields = {
  __typename?: 'chapter_var_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};
export type ChapterVarSampFields = {
  __typename?: 'chapter_var_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};
export type ChapterVarianceFields = {
  __typename?: 'chapter_variance_fields';
  order?: Maybe<Scalars['Float']['output']>;
};
export enum CursorOrdering {
  Asc = 'ASC',
  Desc = 'DESC'
}
export type Menu = {
  __typename?: 'menu';
  title: Scalars['String']['output'];
};
export type MenuAggregateFields = {
  __typename?: 'menu_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<MenuMaxFields>;
  min?: Maybe<MenuMinFields>;
};
export type MenuMaxFields = {
  __typename?: 'menu_max_fields';
  title?: Maybe<Scalars['String']['output']>;
};
export type MenuMinFields = {
  __typename?: 'menu_min_fields';
  title?: Maybe<Scalars['String']['output']>;
};
export type MenuMutationResponse = {
  __typename?: 'menu_mutation_response';
  affected_rows: Scalars['Int']['output'];
  returning: Array<Menu>;
};
export type MenuOrderBy = {
  title?: InputMaybe<OrderBy>;
};
export type MenuUpdates = {
};
export type MutationRoot = {
  __typename?: 'mutation_root';
  delete_book?: Maybe<BookMutationResponse>;
  delete_book_by_pk?: Maybe<Book>;
  delete_chapter?: Maybe<ChapterMutationResponse>;
  delete_chapter_by_pk?: Maybe<Chapter>;
  delete_menu?: Maybe<MenuMutationResponse>;
  delete_menu_by_pk?: Maybe<Menu>;
  insert_book?: Maybe<BookMutationResponse>;
  insert_book_one?: Maybe<Book>;
  insert_chapter?: Maybe<ChapterMutationResponse>;
  insert_chapter_one?: Maybe<Chapter>;
  insert_menu?: Maybe<MenuMutationResponse>;
  insert_menu_one?: Maybe<Menu>;
  update_book?: Maybe<BookMutationResponse>;
  update_book_by_pk?: Maybe<Book>;
  update_book_many?: Maybe<Array<Maybe<BookMutationResponse>>>;
  update_chapter?: Maybe<ChapterMutationResponse>;
  update_chapter_by_pk?: Maybe<Chapter>;
  update_chapter_many?: Maybe<Array<Maybe<ChapterMutationResponse>>>;
  update_menu?: Maybe<MenuMutationResponse>;
  update_menu_by_pk?: Maybe<Menu>;
  update_menu_many?: Maybe<Array<Maybe<MenuMutationResponse>>>;
};
export enum OrderBy {
  Asc = 'asc',
  AscNullsFirst = 'asc_nulls_first',
  AscNullsLast = 'asc_nulls_last',
  Desc = 'desc',
  DescNullsFirst = 'desc_nulls_first',
  DescNullsLast = 'desc_nulls_last'
}
export type QueryRoot = {
  __typename?: 'query_root';
  book: Array<Book>;
  book_by_pk?: Maybe<Book>;
  chapter: Array<Chapter>;
  chapter_by_pk?: Maybe<Chapter>;
  menu: Array<Menu>;
  menu_by_pk?: Maybe<Menu>;
};
export type GetAllChaptersOfBookByChapterIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']['input']>;
}>;
export type GetAllChaptersOfBookByChapterIdQuery = { __typename?: 'query_root', chapter: Array<{ __typename?: 'chapter', id: any, author: string, imageUrl: string, title: string, audioUrl: string, order?: any | null | undefined }> };
export type GetBooksByIdDQueryVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']['input']>;
}>;
export type GetBooksByIdDQuery = { __typename?: 'query_root', book: Array<{ __typename?: 'book', id: any, title: string, author: string }> };
export type GetChaptersBybookIdQueryVariables = Exact<{
  bookId?: InputMaybe<Scalars['uuid']['input']>;
}>;
export type GetChaptersBybookIdQuery = { __typename?: 'query_root', chapter: Array<{ __typename?: 'chapter', id: any, title: string, author: string, audioUrl: string, imageUrl: string }> };
export type GetChaptersByNameQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;
export type GetChaptersByNameQuery = { __typename?: 'query_root', chapter_aggregate: { __typename?: 'chapter_aggregate', aggregate?: { __typename?: 'chapter_aggregate_fields', count: number } | null | undefined }, chapter: Array<{ __typename?: 'chapter', id: any, title: string, author: string, order?: any | null | undefined, imageUrl: string, bookId?: any | null | undefined, Chapter_Book?: { __typename?: 'book', title: string } | null | undefined }> };
export type GetBooksQueryVariables = Exact<{ [key: string]: never; }>;
export type GetBooksQuery = { __typename?: 'query_root', book: Array<{ __typename?: 'book', id: any, title: string, author: string, cover_url: string }> };
export const GetAllChaptersOfBookByChapterIdDocument = gql`
    query GetAllChaptersOfBookByChapterId($id: uuid) {
  chapter(
    where: {Chapter_Book: {Book_Chapter: {id: {_eq: $id}}}}
    order_by: {order: asc}
  ) {
    id
    author
    imageUrl
    title
    audioUrl
    order
  }
}
    `;
export function useGetAllChaptersOfBookByChapterIdQuery(baseOptions?: Apollo.QueryHookOptions<GetAllChaptersOfBookByChapterIdQuery, GetAllChaptersOfBookByChapterIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllChaptersOfBookByChapterIdQuery, GetAllChaptersOfBookByChapterIdQueryVariables>(GetAllChaptersOfBookByChapterIdDocument, options);
      }
export function useGetAllChaptersOfBookByChapterIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllChaptersOfBookByChapterIdQuery, GetAllChaptersOfBookByChapterIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllChaptersOfBookByChapterIdQuery, GetAllChaptersOfBookByChapterIdQueryVariables>(GetAllChaptersOfBookByChapterIdDocument, options);
        }
export function useGetAllChaptersOfBookByChapterIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllChaptersOfBookByChapterIdQuery, GetAllChaptersOfBookByChapterIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllChaptersOfBookByChapterIdQuery, GetAllChaptersOfBookByChapterIdQueryVariables>(GetAllChaptersOfBookByChapterIdDocument, options);
        }
export type GetAllChaptersOfBookByChapterIdQueryHookResult = ReturnType<typeof useGetAllChaptersOfBookByChapterIdQuery>;
export type GetAllChaptersOfBookByChapterIdLazyQueryHookResult = ReturnType<typeof useGetAllChaptersOfBookByChapterIdLazyQuery>;
export type GetAllChaptersOfBookByChapterIdSuspenseQueryHookResult = ReturnType<typeof useGetAllChaptersOfBookByChapterIdSuspenseQuery>;
export type GetAllChaptersOfBookByChapterIdQueryResult = Apollo.QueryResult<GetAllChaptersOfBookByChapterIdQuery, GetAllChaptersOfBookByChapterIdQueryVariables>;
export const GetBooksByIdDDocument = gql`
    query GetBooksByIdD($id: uuid) {
  book(where: {id: {_eq: $id}}) {
    id
    title
    author
  }
}
    `;
export function useGetBooksByIdDQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksByIdDQuery, GetBooksByIdDQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksByIdDQuery, GetBooksByIdDQueryVariables>(GetBooksByIdDDocument, options);
      }
export function useGetBooksByIdDLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksByIdDQuery, GetBooksByIdDQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksByIdDQuery, GetBooksByIdDQueryVariables>(GetBooksByIdDDocument, options);
        }
export function useGetBooksByIdDSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBooksByIdDQuery, GetBooksByIdDQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBooksByIdDQuery, GetBooksByIdDQueryVariables>(GetBooksByIdDDocument, options);
        }
export type GetBooksByIdDQueryHookResult = ReturnType<typeof useGetBooksByIdDQuery>;
export type GetBooksByIdDLazyQueryHookResult = ReturnType<typeof useGetBooksByIdDLazyQuery>;
export type GetBooksByIdDSuspenseQueryHookResult = ReturnType<typeof useGetBooksByIdDSuspenseQuery>;
export type GetBooksByIdDQueryResult = Apollo.QueryResult<GetBooksByIdDQuery, GetBooksByIdDQueryVariables>;
export const GetChaptersBybookIdDocument = gql`
    query GetChaptersBybookId($bookId: uuid) {
  chapter(where: {bookId: {_eq: $bookId}}, order_by: {order: asc}) {
    id
    title
    author
    audioUrl
    imageUrl
  }
}
    `;
export function useGetChaptersBybookIdQuery(baseOptions?: Apollo.QueryHookOptions<GetChaptersBybookIdQuery, GetChaptersBybookIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChaptersBybookIdQuery, GetChaptersBybookIdQueryVariables>(GetChaptersBybookIdDocument, options);
      }
export function useGetChaptersBybookIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChaptersBybookIdQuery, GetChaptersBybookIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChaptersBybookIdQuery, GetChaptersBybookIdQueryVariables>(GetChaptersBybookIdDocument, options);
        }
export function useGetChaptersBybookIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChaptersBybookIdQuery, GetChaptersBybookIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChaptersBybookIdQuery, GetChaptersBybookIdQueryVariables>(GetChaptersBybookIdDocument, options);
        }
export type GetChaptersBybookIdQueryHookResult = ReturnType<typeof useGetChaptersBybookIdQuery>;
export type GetChaptersBybookIdLazyQueryHookResult = ReturnType<typeof useGetChaptersBybookIdLazyQuery>;
export type GetChaptersBybookIdSuspenseQueryHookResult = ReturnType<typeof useGetChaptersBybookIdSuspenseQuery>;
export type GetChaptersBybookIdQueryResult = Apollo.QueryResult<GetChaptersBybookIdQuery, GetChaptersBybookIdQueryVariables>;
export const GetChaptersByNameDocument = gql`
    query getChaptersByName($name: String, $limit: Int, $offset: Int) {
  chapter_aggregate(
    where: {_or: [{title: {_ilike: $name}}, {author: {_ilike: $name}}]}
  ) {
    aggregate {
      count
    }
  }
  chapter(
    where: {_or: [{title: {_ilike: $name}}, {author: {_ilike: $name}}]}
    order_by: {order: asc}
    limit: $limit
    offset: $offset
  ) {
    id
    title
    author
    order
    imageUrl
    Chapter_Book {
      title
    }
    bookId
  }
}
    `;
export function useGetChaptersByNameQuery(baseOptions?: Apollo.QueryHookOptions<GetChaptersByNameQuery, GetChaptersByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChaptersByNameQuery, GetChaptersByNameQueryVariables>(GetChaptersByNameDocument, options);
      }
export function useGetChaptersByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChaptersByNameQuery, GetChaptersByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChaptersByNameQuery, GetChaptersByNameQueryVariables>(GetChaptersByNameDocument, options);
        }
export function useGetChaptersByNameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChaptersByNameQuery, GetChaptersByNameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChaptersByNameQuery, GetChaptersByNameQueryVariables>(GetChaptersByNameDocument, options);
        }
export type GetChaptersByNameQueryHookResult = ReturnType<typeof useGetChaptersByNameQuery>;
export type GetChaptersByNameLazyQueryHookResult = ReturnType<typeof useGetChaptersByNameLazyQuery>;
export type GetChaptersByNameSuspenseQueryHookResult = ReturnType<typeof useGetChaptersByNameSuspenseQuery>;
export type GetChaptersByNameQueryResult = Apollo.QueryResult<GetChaptersByNameQuery, GetChaptersByNameQueryVariables>;
export const GetBooksDocument = gql`
    query GetBooks {
  book {
    id
    title
    author
    cover_url
  }
}
    `;
export function useGetBooksQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
      }
export function useGetBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
        }
export function useGetBooksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
        }
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>;
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>;
export type GetBooksSuspenseQueryHookResult = ReturnType<typeof useGetBooksSuspenseQuery>;
export type GetBooksQueryResult = Apollo.QueryResult<GetBooksQuery, GetBooksQueryVariables>;
export const Operations = {
  Query: {
    GetAllChaptersOfBookByChapterId: 'GetAllChaptersOfBookByChapterId',
    GetBooksByIdD: 'GetBooksByIdD',
    GetChaptersBybookId: 'GetChaptersBybookId',
    getChaptersByName: 'getChaptersByName',
    GetBooks: 'GetBooks'
  }
}