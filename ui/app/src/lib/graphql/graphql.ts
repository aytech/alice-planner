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
  list?: InputMaybe<Scalars['ID']>;
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

export type CopyChecklist = {
  __typename?: 'CopyChecklist';
  checklist?: Maybe<Checklist>;
};

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
  list?: InputMaybe<Scalars['ID']>;
  people?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveList?: Maybe<ArchiveChecklist>;
  archiveListItem?: Maybe<ArchiveChecklistItem>;
  copyList?: Maybe<CopyChecklist>;
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


export type MutationCopyListArgs = {
  listId?: InputMaybe<Scalars['ID']>;
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

export type ArchiveChecklistItemMutationVariables = Exact<{
  itemId?: InputMaybe<Scalars['ID']>;
}>;


export type ArchiveChecklistItemMutation = { __typename?: 'Mutation', archiveListItem?: { __typename?: 'ArchiveChecklistItem', checklistItem?: { __typename?: 'ChecklistItem', id: string, description: string } | null } | null };

export type CopyChecklistMutationVariables = Exact<{
  listId?: InputMaybe<Scalars['ID']>;
}>;


export type CopyChecklistMutation = { __typename?: 'Mutation', copyList?: { __typename?: 'CopyChecklist', checklist?: { __typename?: 'Checklist', id: string, name: string } | null } | null };

export type CreateChecklistMutationVariables = Exact<{
  data: ChecklistInput;
}>;


export type CreateChecklistMutation = { __typename?: 'Mutation', createList?: { __typename?: 'CreateChecklist', checklist?: { __typename?: 'Checklist', id: string, name: string } | null } | null };

export type CreateChecklistItemMutationVariables = Exact<{
  data: ChecklistItemInput;
}>;


export type CreateChecklistItemMutation = { __typename?: 'Mutation', createListItem?: { __typename?: 'CreateChecklistItem', checklistItem?: { __typename?: 'ChecklistItem', id: string, description: string, due: any, status: ChecklistItemStatus, list: { __typename?: 'Checklist', id: string }, people: Array<{ __typename?: 'User', id: string, color?: string | null, name?: string | null, surname?: string | null }> } | null } | null };

export type DeleteChecklistMutationVariables = Exact<{
  listId?: InputMaybe<Scalars['ID']>;
}>;


export type DeleteChecklistMutation = { __typename?: 'Mutation', deleteList?: { __typename?: 'DeleteChecklist', checklist?: { __typename?: 'Checklist', id: string, name: string } | null } | null };

export type DeleteChecklistItemMutationVariables = Exact<{
  itemId?: InputMaybe<Scalars['ID']>;
}>;


export type DeleteChecklistItemMutation = { __typename?: 'Mutation', deleteListItem?: { __typename?: 'DeleteChecklistItem', checklistItem?: { __typename?: 'ChecklistItem', id: string, description: string } | null } | null };

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

export type UpdateChecklistMutationVariables = Exact<{
  data: ExistingChecklistInput;
}>;


export type UpdateChecklistMutation = { __typename?: 'Mutation', updateList?: { __typename?: 'UpdateChecklist', checklist?: { __typename?: 'Checklist', id: string, name: string } | null } | null };

export type UpdateChecklistItemMutationVariables = Exact<{
  data: ExistingChecklistItemInput;
}>;


export type UpdateChecklistItemMutation = { __typename?: 'Mutation', updateListItem?: { __typename?: 'UpdateChecklistItem', checklistItem?: { __typename?: 'ChecklistItem', id: string, description: string, due: any, status: ChecklistItemStatus, list: { __typename?: 'Checklist', id: string }, people: Array<{ __typename?: 'User', id: string, color?: string | null, name?: string | null, surname?: string | null }> } | null } | null };

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
export const ArchiveChecklistItemDocument = gql`
    mutation archiveChecklistItem($itemId: ID) {
  archiveListItem(itemId: $itemId) {
    checklistItem {
      id
      description
    }
  }
}
    `;
export type ArchiveChecklistItemMutationFn = Apollo.MutationFunction<ArchiveChecklistItemMutation, ArchiveChecklistItemMutationVariables>;

/**
 * __useArchiveChecklistItemMutation__
 *
 * To run a mutation, you first call `useArchiveChecklistItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveChecklistItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveChecklistItemMutation, { data, loading, error }] = useArchiveChecklistItemMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useArchiveChecklistItemMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveChecklistItemMutation, ArchiveChecklistItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveChecklistItemMutation, ArchiveChecklistItemMutationVariables>(ArchiveChecklistItemDocument, options);
      }
export type ArchiveChecklistItemMutationHookResult = ReturnType<typeof useArchiveChecklistItemMutation>;
export type ArchiveChecklistItemMutationResult = Apollo.MutationResult<ArchiveChecklistItemMutation>;
export type ArchiveChecklistItemMutationOptions = Apollo.BaseMutationOptions<ArchiveChecklistItemMutation, ArchiveChecklistItemMutationVariables>;
export const CopyChecklistDocument = gql`
    mutation copyChecklist($listId: ID) {
  copyList(listId: $listId) {
    checklist {
      id
      name
    }
  }
}
    `;
export type CopyChecklistMutationFn = Apollo.MutationFunction<CopyChecklistMutation, CopyChecklistMutationVariables>;

/**
 * __useCopyChecklistMutation__
 *
 * To run a mutation, you first call `useCopyChecklistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCopyChecklistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [copyChecklistMutation, { data, loading, error }] = useCopyChecklistMutation({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useCopyChecklistMutation(baseOptions?: Apollo.MutationHookOptions<CopyChecklistMutation, CopyChecklistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CopyChecklistMutation, CopyChecklistMutationVariables>(CopyChecklistDocument, options);
      }
export type CopyChecklistMutationHookResult = ReturnType<typeof useCopyChecklistMutation>;
export type CopyChecklistMutationResult = Apollo.MutationResult<CopyChecklistMutation>;
export type CopyChecklistMutationOptions = Apollo.BaseMutationOptions<CopyChecklistMutation, CopyChecklistMutationVariables>;
export const CreateChecklistDocument = gql`
    mutation createChecklist($data: ChecklistInput!) {
  createList(data: $data) {
    checklist {
      id
      name
    }
  }
}
    `;
export type CreateChecklistMutationFn = Apollo.MutationFunction<CreateChecklistMutation, CreateChecklistMutationVariables>;

/**
 * __useCreateChecklistMutation__
 *
 * To run a mutation, you first call `useCreateChecklistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChecklistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChecklistMutation, { data, loading, error }] = useCreateChecklistMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateChecklistMutation(baseOptions?: Apollo.MutationHookOptions<CreateChecklistMutation, CreateChecklistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChecklistMutation, CreateChecklistMutationVariables>(CreateChecklistDocument, options);
      }
export type CreateChecklistMutationHookResult = ReturnType<typeof useCreateChecklistMutation>;
export type CreateChecklistMutationResult = Apollo.MutationResult<CreateChecklistMutation>;
export type CreateChecklistMutationOptions = Apollo.BaseMutationOptions<CreateChecklistMutation, CreateChecklistMutationVariables>;
export const CreateChecklistItemDocument = gql`
    mutation createChecklistItem($data: ChecklistItemInput!) {
  createListItem(data: $data) {
    checklistItem {
      id
      description
      due
      list {
        id
      }
      people {
        id
        color
        name
        surname
      }
      status
    }
  }
}
    `;
export type CreateChecklistItemMutationFn = Apollo.MutationFunction<CreateChecklistItemMutation, CreateChecklistItemMutationVariables>;

/**
 * __useCreateChecklistItemMutation__
 *
 * To run a mutation, you first call `useCreateChecklistItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChecklistItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChecklistItemMutation, { data, loading, error }] = useCreateChecklistItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateChecklistItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateChecklistItemMutation, CreateChecklistItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChecklistItemMutation, CreateChecklistItemMutationVariables>(CreateChecklistItemDocument, options);
      }
export type CreateChecklistItemMutationHookResult = ReturnType<typeof useCreateChecklistItemMutation>;
export type CreateChecklistItemMutationResult = Apollo.MutationResult<CreateChecklistItemMutation>;
export type CreateChecklistItemMutationOptions = Apollo.BaseMutationOptions<CreateChecklistItemMutation, CreateChecklistItemMutationVariables>;
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
export const DeleteChecklistItemDocument = gql`
    mutation deleteChecklistItem($itemId: ID) {
  deleteListItem(itemId: $itemId) {
    checklistItem {
      id
      description
    }
  }
}
    `;
export type DeleteChecklistItemMutationFn = Apollo.MutationFunction<DeleteChecklistItemMutation, DeleteChecklistItemMutationVariables>;

/**
 * __useDeleteChecklistItemMutation__
 *
 * To run a mutation, you first call `useDeleteChecklistItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChecklistItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChecklistItemMutation, { data, loading, error }] = useDeleteChecklistItemMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useDeleteChecklistItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChecklistItemMutation, DeleteChecklistItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChecklistItemMutation, DeleteChecklistItemMutationVariables>(DeleteChecklistItemDocument, options);
      }
export type DeleteChecklistItemMutationHookResult = ReturnType<typeof useDeleteChecklistItemMutation>;
export type DeleteChecklistItemMutationResult = Apollo.MutationResult<DeleteChecklistItemMutation>;
export type DeleteChecklistItemMutationOptions = Apollo.BaseMutationOptions<DeleteChecklistItemMutation, DeleteChecklistItemMutationVariables>;
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
export const UpdateChecklistDocument = gql`
    mutation updateChecklist($data: ExistingChecklistInput!) {
  updateList(data: $data) {
    checklist {
      id
      name
    }
  }
}
    `;
export type UpdateChecklistMutationFn = Apollo.MutationFunction<UpdateChecklistMutation, UpdateChecklistMutationVariables>;

/**
 * __useUpdateChecklistMutation__
 *
 * To run a mutation, you first call `useUpdateChecklistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChecklistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChecklistMutation, { data, loading, error }] = useUpdateChecklistMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateChecklistMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChecklistMutation, UpdateChecklistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChecklistMutation, UpdateChecklistMutationVariables>(UpdateChecklistDocument, options);
      }
export type UpdateChecklistMutationHookResult = ReturnType<typeof useUpdateChecklistMutation>;
export type UpdateChecklistMutationResult = Apollo.MutationResult<UpdateChecklistMutation>;
export type UpdateChecklistMutationOptions = Apollo.BaseMutationOptions<UpdateChecklistMutation, UpdateChecklistMutationVariables>;
export const UpdateChecklistItemDocument = gql`
    mutation updateChecklistItem($data: ExistingChecklistItemInput!) {
  updateListItem(data: $data) {
    checklistItem {
      id
      description
      due
      list {
        id
      }
      people {
        id
        color
        name
        surname
      }
      status
    }
  }
}
    `;
export type UpdateChecklistItemMutationFn = Apollo.MutationFunction<UpdateChecklistItemMutation, UpdateChecklistItemMutationVariables>;

/**
 * __useUpdateChecklistItemMutation__
 *
 * To run a mutation, you first call `useUpdateChecklistItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChecklistItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChecklistItemMutation, { data, loading, error }] = useUpdateChecklistItemMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateChecklistItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChecklistItemMutation, UpdateChecklistItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChecklistItemMutation, UpdateChecklistItemMutationVariables>(UpdateChecklistItemDocument, options);
      }
export type UpdateChecklistItemMutationHookResult = ReturnType<typeof useUpdateChecklistItemMutation>;
export type UpdateChecklistItemMutationResult = Apollo.MutationResult<UpdateChecklistItemMutation>;
export type UpdateChecklistItemMutationOptions = Apollo.BaseMutationOptions<UpdateChecklistItemMutation, UpdateChecklistItemMutationVariables>;
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