import { InMemoryCache, makeVar } from "@apollo/client"
import { ChecklistItemStatus } from "./lib/graphql/graphql"
import { IChecklistTableItem, IUser } from "./lib/Types"

export const emptyRecord: IChecklistTableItem = {
  description: "",
  id: "0",
  key: "0",
  list: "0",
  people: [],
  status: ChecklistItemStatus.NotStarted,
  tableKey: "0"
}
export const appUser = makeVar<IUser | null>(null)
export const editedRecord = makeVar<IChecklistTableItem>(emptyRecord)
export const editingRecordKey = makeVar<string>('0')
export const pageTitle = makeVar<string>("")
export const peopleData = makeVar<Array<IUser>>([])
export const profileColor = makeVar<string>("#ccc")
export const userName = makeVar<string>("")

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        appUser: {
          read: () => appUser()
        },
        editedRecord: {
          read: () => editedRecord()
        },
        editingRecordKey: {
          read: () => editingRecordKey()
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