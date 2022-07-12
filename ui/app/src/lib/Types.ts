import { ChecklistItemStatus } from "./graphql/graphql"

export type AppReferrer = "/"

export interface IUser {
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
  user?: IUser,
  token: string
}

export interface IUser {
  id: string
  avatar?: string | null
  color?: string | null
  name?: string | null
  surname?: string | null
}

export interface IChecklistTableItem {
  description: string
  due?: string
  id: string
  key: string
  list: string,
  people: Array<IUser>
  status: ChecklistItemStatus
  tableKey: string
}

export interface IChecklistTable {
  id?: string
  items?: Array<IChecklistTableItem>
  name?: string | null
}

export type MenuItemKey = "app" | "archive"