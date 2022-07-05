import { InMemoryCache, makeVar } from "@apollo/client"
import { ISettings } from "./lib/Types"

export const appSettings = makeVar<ISettings | null>(null)
export const pageTitle = makeVar<string>("")
export const profileColor = makeVar<string>("#ccc")
export const userName = makeVar<string>("")

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        appSettings: {
          read: () => appSettings()
        },
        pageTitle: {
          read: () => pageTitle()
        },
        color: {
          read: () => profileColor()
        },
        name: {
          read: () => userName()
        }
      }
    }
  }
})