import { InMemoryCache, makeVar } from "@apollo/client"
import { ChecklistItemStatus } from "./lib/graphql/graphql"
import { IChecklistTableItem, ISettings, IUser } from "./lib/Types"

export const emptyRecord: IChecklistTableItem = {
  description: "",
  id: "0",
  key: "0",
  list: "0",
  people: [],
  status: ChecklistItemStatus.NotStarted,
  tableKey: "0"
}
export const appSettings = makeVar<ISettings | null>(null)
export const editedRecord = makeVar<IChecklistTableItem>(emptyRecord)
export const pageTitle = makeVar<string>("")
export const peopleData = makeVar<Array<IUser>>([])
export const profileColor = makeVar<string>("#ccc")
export const userName = makeVar<string>("")

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        appSettings: {
          read: () => appSettings()
        },
        editedRecord: {
          read: () => editedRecord()
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
        }
      }
    }
  }
})