import { InMemoryCache, makeVar } from "@apollo/client"
import { ISettings, IUser } from "./lib/Types"

export const appSettings = makeVar<ISettings | null>(null)
export const pageTitle = makeVar<string>("")
export const peopleData = makeVar<Array<IUser>>([])
export const profileColor = makeVar<string>("#ccc")
export const selectedPeople = makeVar<IUser[]>([])
export const userName = makeVar<string>("")

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        appSettings: {
          read: () => appSettings()
        },
        color: {
          read: () => profileColor()
        },
        name: {
          read: () => userName()
        },
        pageTitle: {
          read: () => pageTitle()
        },
        peopleData: {
          read: () => peopleData()
        },
        selectedPeople: {
          read: () => selectedPeople()
        }
      }
    }
  }
})