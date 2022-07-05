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