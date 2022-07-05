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

export type Mutation = {
  __typename?: 'Mutation';
  refreshToken?: Maybe<Refresh>;
  revokeToken?: Maybe<Revoke>;
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  updateSettings?: Maybe<UpdateSettings>;
  verifyToken?: Maybe<Verify>;
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


export type MutationUpdateSettingsArgs = {
  data: SettingsInput;
};


export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']>;
};

export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
  settings?: Maybe<Settings>;
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  appUser?: Maybe<AppUser>;
  settings?: Maybe<Settings>;
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

export type Settings = {
  __typename?: 'Settings';
  avatar?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type SettingsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
};

export type UpdateSettings = {
  __typename?: 'UpdateSettings';
  settings?: Maybe<Settings>;
};

export type Verify = {
  __typename?: 'Verify';
  payload: Scalars['GenericScalar'];
};

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


export type TokenAuthMutation = { __typename?: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebToken', payload: any, refreshExpiresIn: number, refreshToken: string, token: string, settings?: { __typename?: 'Settings', id: string, avatar?: string | null, color?: string | null, name?: string | null, surname?: string | null } | null } | null };

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = { __typename?: 'Query', appUser?: { __typename?: 'AppUser', color: string, id: number, name?: string | null, surname?: string | null, username: string } | null };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', settings?: { __typename?: 'Settings', id: string, avatar?: string | null, color?: string | null, name?: string | null, surname?: string | null } | null };


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
    settings {
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
export const SettingsDocument = gql`
    query settings {
  settings {
    id
    avatar
    color
    name
    surname
  }
}
    `;

/**
 * __useSettingsQuery__
 *
 * To run a query within a React component, call `useSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsQuery(baseOptions?: Apollo.QueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, options);
      }
export function useSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, options);
        }
export type SettingsQueryHookResult = ReturnType<typeof useSettingsQuery>;
export type SettingsLazyQueryHookResult = ReturnType<typeof useSettingsLazyQuery>;
export type SettingsQueryResult = Apollo.QueryResult<SettingsQuery, SettingsQueryVariables>;