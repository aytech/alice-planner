import { ChecklistItemStatus } from "./graphql/graphql"

export type AppReferrer = "/"

export interface ISettings {
  id: string,
  avatar?: string | null,
  color?: string | null,
  name?: string | null,
  surname?: string | null
}

export interface IToken {
  payload: any,
  refreshExpiresIn: number,
  refreshToken: string,
  settings?: ISettings,
  token: string
}

export interface IUser {
  id?: string
  avatar?: string | null
  color?: string | null
  name?: string | null
  surname?: string | null
}

export interface IChecklistTableItem {
  description?: string
  due?: string
  id: string
  key: string
  people: Array<IUser>
  status: ChecklistItemStatus
}

export interface IChecklistTable {
  id?: string
  items?: Array<IChecklistTableItem>
  name?: string | null
}