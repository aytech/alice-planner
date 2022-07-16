import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

export type AppUser = {
  __typename?: 'AppUser';
  color: Scalars['String'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type ArchiveChecklist = {
  __typename?: 'ArchiveChecklist';
  checklist?: Maybe<Checklist>;
};

export type ArchiveChecklistItem = {
  __typename?: 'ArchiveChecklistItem';
  checklistItem?: Maybe<ChecklistItem>;
};

export type Checklist = {
  __typename?: 'Checklist';
  id: Scalars['ID'];
  items: Array<ChecklistItem>;
  name: Scalars['String'];
};

export type ChecklistInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type ChecklistItem = {
  __typename?: 'ChecklistItem';
  description: Scalars['String'];
  due: Scalars['Date'];
  id: Scalars['ID'];
  list: Checklist;
  people: Array<User>;
  status: ChecklistItemStatus;
};

export type ChecklistItemInput = {
  description?: InputMaybe<Scalars['String']>;
  due?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Scalars['String']>;
  people?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status?: InputMaybe<Scalars['String']>;
};

/** An enumeration. */
export enum ChecklistItemStatus {
  /** DONE */
  Done = 'DONE',
  /** In progress */
  InProgress = 'IN_PROGRESS',
  /** N/A */
  NotStarted = 'NOT_STARTED'
}

export type CreateChecklist = {
  __typename?: 'CreateChecklist';
  checklist?: Maybe<Checklist>;
};

export type CreateChecklistItem = {
  __typename?: 'CreateChecklistItem';
  checklistItem?: Maybe<ChecklistItem>;
};

export type DeleteChecklist = {
  __typename?: 'DeleteChecklist';
  checklist?: Maybe<Checklist>;
};

export type DeleteChecklistItem = {
  __typename?: 'DeleteChecklistItem';
  checklistItem?: Maybe<ChecklistItem>;
};

export type ExistingChecklistInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ExistingChecklistItemInput = {
  description?: InputMaybe<Scalars['String']>;
  due?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  list?: InputMaybe<Scalars['String']>;
  people?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveList?: Maybe<ArchiveChecklist>;
  archiveListItem?: Maybe<ArchiveChecklistItem>;
  createList?: Maybe<CreateChecklist>;
  createListItem?: Maybe<CreateChecklistItem>;
  deleteList?: Maybe<DeleteChecklist>;
  deleteListItem?: Maybe<DeleteChecklistItem>;
  refreshToken?: Maybe<Refresh>;
  revokeToken?: Maybe<Revoke>;
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  updateList?: Maybe<UpdateChecklist>;
  updateListItem?: Maybe<UpdateChecklistItem>;
  updateUser?: Maybe<UpdateUser>;
  verifyToken?: Maybe<Verify>;
};


export type MutationArchiveListArgs = {
  listId?: InputMaybe<Scalars['ID']>;
};


export type MutationArchiveListItemArgs = {
  itemId?: InputMaybe<Scalars['ID']>;
};


export type MutationCreateListArgs = {
  data: ChecklistInput;
};


export type MutationCreateListItemArgs = {
  data: ChecklistItemInput;
};


export type MutationDeleteListArgs = {
  listId?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteListItemArgs = {
  itemId?: InputMaybe<Scalars['ID']>;
};


export type MutationRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars['String']>;
};


export type MutationRevokeTokenArgs = {
  refreshToken?: InputMaybe<Scalars['String']>;
};


export type MutationTokenAuthArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateListArgs = {
  data: ExistingChecklistInput;
};


export type MutationUpdateListItemArgs = {
  data: ExistingChecklistItemInput;
};


export type MutationUpdateUserArgs = {
  data: UserInput;
};


export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']>;
};

export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
  token: Scalars['String'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  appUser?: Maybe<AppUser>;
  checklist?: Maybe<ChecklistItem>;
  checklists?: Maybe<Array<Maybe<Checklist>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type Revoke = {
  __typename?: 'Revoke';
  revoked: Scalars['Int'];
};

export type UpdateChecklist = {
  __typename?: 'UpdateChecklist';
  checklist?: Maybe<Checklist>;
};

export type UpdateChecklistItem = {
  __typename?: 'UpdateChecklistItem';
  checklistItem?: Maybe<ChecklistItem>;
};

export type UpdateUser = {
  __typename?: 'UpdateUser';
  settings?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
};

export type UserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
};

export type Verify = {
  __typename?: 'Verify';
  payload: Scalars['GenericScalar'];
};

export type ArchiveChecklistMutationVariables = Exact<{
  listId?: InputMaybe<Scalars['ID']>;
}>;


export type ArchiveChecklistMutation = { __typename?: 'Mutation', archiveList?: { __typename?: 'ArchiveChecklist', checklist?: { __typename?: 'Checklist', id: string, name: string } | null } | null };

export type DeleteChecklistMutationVariables = Exact<{
  listId?: InputMaybe<Scalars['ID']>;
}>;


export type DeleteChecklistMutation = { __typename?: 'Mutation', deleteList?: { __typename?: 'DeleteChecklist', checklist?: { __typename?: 'Checklist', id: string, name: string } | null } | null };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken?: { __typename?: 'Refresh', payload: any, refreshExpiresIn: number, refreshToken: string, token: string } | null };

export type RevokeTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RevokeTokenMutation = { __typename?: 'Mutation', revokeToken?: { __typename?: 'Revoke', revoked: number } | null };

export type TokenAuthMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type TokenAuthMutation = { __typename?: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebToken', payload: any, refreshExpiresIn: number, refreshToken: string, token: string, user?: { __typename?: 'User', id: string, avatar?: string | null, color?: string | null, name?: string | null, surname?: string | null } | null } | null };

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = { __typename?: 'Query', appUser?: { __typename?: 'AppUser', color: string, id: number, name?: string | null, surname?: string | null, username: string } | null };

export type ChecklistsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChecklistsQuery = { __typename?: 'Query', checklists?: Array<{ __typename?: 'Checklist', id: string, name: string, items: Array<{ __typename?: 'ChecklistItem', description: string, due: any, id: string, status: ChecklistItemStatus, people: Array<{ __typename?: 'User', id: string, avatar?: string | null, color?: string | null, name?: string | null, surname?: string | null }> }> } | null> | null, users?: Array<{ __typename?: 'User', id: string, avatar?: string | null, color?: string | null, name?: string | null, surname?: string | null } | null> | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, avatar?: string | null, color?: string | null, name?: string | null, surname?: string | null } | null };


export const ArchiveChecklistDocument = gql`
    mutation archiveChecklist($listId: ID) {
  archiveList(listId: $listId) {
    checklist {
      id
      name
    }
  }
}
    `;
export type ArchiveChecklistMutationFn = Apollo.MutationFunction<ArchiveChecklistMutation, ArchiveChecklistMutationVariables>;

/**
 * __useArchiveChecklistMutation__
 *
 * To run a mutation, you first call `useArchiveChecklistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveChecklistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveChecklistMutation, { data, loading, error }] = useArchiveChecklistMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useArchiveChecklistMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveChecklistMutation, ArchiveChecklistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveChecklistMutation, ArchiveChecklistMutationVariables>(ArchiveChecklistDocument, options);
      }
export type ArchiveChecklistMutationHookResult = ReturnType<typeof useArchiveChecklistMutation>;
export type ArchiveChecklistMutationResult = Apollo.MutationResult<ArchiveChecklistMutation>;
export type ArchiveChecklistMutationOptions = Apollo.BaseMutationOptions<ArchiveChecklistMutation, ArchiveChecklistMutationVariables>;
export const DeleteChecklistDocument = gql`
    mutation deleteChecklist($listId: ID) {
  deleteList(listId: $listId) {
    checklist {
      id
      name
    }
  }
}
    `;
export type DeleteChecklistMutationFn = Apollo.MutationFunction<DeleteChecklistMutation, DeleteChecklistMutationVariables>;

/**
 * __useDeleteChecklistMutation__
 *
 * To run a mutation, you first call `useDeleteChecklistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChecklistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChecklistMutation, { data, loading, error }] = useDeleteChecklistMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useDeleteChecklistMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChecklistMutation, DeleteChecklistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChecklistMutation, DeleteChecklistMutationVariables>(DeleteChecklistDocument, options);
      }
export type DeleteChecklistMutationHookResult = ReturnType<typeof useDeleteChecklistMutation>;
export type DeleteChecklistMutationResult = Apollo.MutationResult<DeleteChecklistMutation>;
export type DeleteChecklistMutationOptions = Apollo.BaseMutationOptions<DeleteChecklistMutation, DeleteChecklistMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation refreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    payload
    refreshExpiresIn
    refreshToken
    token
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RevokeTokenDocument = gql`
    mutation revokeToken($refreshToken: String!) {
  revokeToken(refreshToken: $refreshToken) {
    revoked
  }
}
    `;
export type RevokeTokenMutationFn = Apollo.MutationFunction<RevokeTokenMutation, RevokeTokenMutationVariables>;

/**
 * __useRevokeTokenMutation__
 *
 * To run a mutation, you first call `useRevokeTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeTokenMutation, { data, loading, error }] = useRevokeTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRevokeTokenMutation(baseOptions?: Apollo.MutationHookOptions<RevokeTokenMutation, RevokeTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeTokenMutation, RevokeTokenMutationVariables>(RevokeTokenDocument, options);
      }
export type RevokeTokenMutationHookResult = ReturnType<typeof useRevokeTokenMutation>;
export type RevokeTokenMutationResult = Apollo.MutationResult<RevokeTokenMutation>;
export type RevokeTokenMutationOptions = Apollo.BaseMutationOptions<RevokeTokenMutation, RevokeTokenMutationVariables>;
export const TokenAuthDocument = gql`
    mutation tokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    payload
    refreshExpiresIn
    refreshToken
    token
    user {
      id
      avatar
      color
      name
      surname
    }
  }
}
    `;
export type TokenAuthMutationFn = Apollo.MutationFunction<TokenAuthMutation, TokenAuthMutationVariables>;

/**
 * __useTokenAuthMutation__
 *
 * To run a mutation, you first call `useTokenAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenAuthMutation, { data, loading, error }] = useTokenAuthMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useTokenAuthMutation(baseOptions?: Apollo.MutationHookOptions<TokenAuthMutation, TokenAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TokenAuthMutation, TokenAuthMutationVariables>(TokenAuthDocument, options);
      }
export type TokenAuthMutationHookResult = ReturnType<typeof useTokenAuthMutation>;
export type TokenAuthMutationResult = Apollo.MutationResult<TokenAuthMutation>;
export type TokenAuthMutationOptions = Apollo.BaseMutationOptions<TokenAuthMutation, TokenAuthMutationVariables>;
export const AppDocument = gql`
    query App {
  appUser @client {
    color
    id
    name
    surname
    username
  }
}
    `;

/**
 * __useAppQuery__
 *
 * To run a query within a React component, call `useAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppQuery(baseOptions?: Apollo.QueryHookOptions<AppQuery, AppQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppQuery, AppQueryVariables>(AppDocument, options);
      }
export function useAppLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppQuery, AppQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppQuery, AppQueryVariables>(AppDocument, options);
        }
export type AppQueryHookResult = ReturnType<typeof useAppQuery>;
export type AppLazyQueryHookResult = ReturnType<typeof useAppLazyQuery>;
export type AppQueryResult = Apollo.QueryResult<AppQuery, AppQueryVariables>;
export const ChecklistsDocument = gql`
    query checklists {
  checklists {
    id
    items {
      description
      due
      id
      people {
        id
        avatar
        color
        name
        surname
      }
      status
    }
    name
  }
  users {
    id
    avatar
    color
    name
    surname
  }
}
    `;

/**
 * __useChecklistsQuery__
 *
 * To run a query within a React component, call `useChecklistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChecklistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChecklistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChecklistsQuery(baseOptions?: Apollo.QueryHookOptions<ChecklistsQuery, ChecklistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChecklistsQuery, ChecklistsQueryVariables>(ChecklistsDocument, options);
      }
export function useChecklistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChecklistsQuery, ChecklistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChecklistsQuery, ChecklistsQueryVariables>(ChecklistsDocument, options);
        }
export type ChecklistsQueryHookResult = ReturnType<typeof useChecklistsQuery>;
export type ChecklistsLazyQueryHookResult = ReturnType<typeof useChecklistsLazyQuery>;
export type ChecklistsQueryResult = Apollo.QueryResult<ChecklistsQuery, ChecklistsQueryVariables>;
export const UserDocument = gql`
    query user {
  user {
    id
    avatar
    color
    name
    surname
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;