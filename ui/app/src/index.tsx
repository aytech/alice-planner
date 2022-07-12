import React, { Suspense } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import { App } from './sections/App'
import { ApolloClient, ApolloError, ApolloLink, ApolloProvider, FetchResult, from, fromPromise, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { ConfigProvider } from 'antd'
import csCZ from "antd/lib/locale/cs_CZ"
import { getCookie } from './lib/Cookie'
import "./index.css"
import "./i18n"
import { Splash } from './sections/Splash'
import { RefreshTokenDocument, RefreshTokenMutation } from './lib/graphql/graphql'
import { csrfTokenName, errorMessages, refreshTokenName, tokenName } from './lib/Constants'
import { IToken } from './lib/Types'
import { cache } from './cache'

let apolloClient: any

const httpLink = new HttpLink({
  uri: '/api'
});
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(tokenName)
  const csrftoken = getCookie(csrfTokenName)
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "Authorization": token === null ? "" : `JWT ${ token }`,
      "X-CSRFToken": csrftoken === null ? "" : csrftoken
    }
  }));
  return forward(operation);
})

const refreshToken = () => {
  return apolloClient
    .mutate({
      mutation: RefreshTokenDocument,
      variables: {
        refreshToken: localStorage.getItem(refreshTokenName)
      }
    })
    .then((value: FetchResult<RefreshTokenMutation>) => {
      return value.data?.refreshToken
    })
}

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let reason of graphQLErrors) {
        switch (reason.message) {
          case errorMessages.signatureExpired:
            return fromPromise(
              refreshToken()
                .catch((reason: ApolloError) => console.error(reason))
            )
              .flatMap(authToken => {
                const token = authToken as IToken
                localStorage.setItem(tokenName, token.token)
                localStorage.setItem(refreshTokenName, token.refreshToken)
                return forward(operation)
              })
          case errorMessages.invalidSignature:
          case errorMessages.refreshTokenExpired:
          case errorMessages.refreshTokenInvalid:
          case errorMessages.unauthorized:
            localStorage.removeItem(tokenName)
            localStorage.removeItem(refreshTokenName)
          window.location.replace("/login")
        }
      }
    }
    if (networkError) {
      console.error(networkError);
    }
  }
)

apolloClient = new ApolloClient({
  cache,
  link: from([
    errorLink,
    authMiddleware,
    httpLink
  ]),
})

ReactDOM.createRoot(
  document.getElementById('container') as HTMLElement
).render(
  <Suspense fallback={ <Splash /> }>
    <ApolloProvider client={ apolloClient }>
      <ConfigProvider locale={ csCZ }>
        <Router>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Router>
      </ConfigProvider>
    </ApolloProvider>
  </Suspense>
);
