import { ChecklistItemStatus } from "./graphql/graphql"
import { AppReferrer } from "./Types"

interface IUrlHelper {
  getReferrer: () => AppReferrer
}

interface IChecklistHelper {
  statusButtonClassName: (statusName: ChecklistItemStatus) => string
}

export const UrlHelper: IUrlHelper = {
  getReferrer: (): AppReferrer => {
    const urlParts = window.location.search.substring(1).split("=")
    if (urlParts.length >= 2 && urlParts[ 1 ] !== undefined) {
      return urlParts[ 1 ] as AppReferrer
    }
    return "/"
  }
}

export const ChecklistHelper: IChecklistHelper = {
  statusButtonClassName: (statusName: ChecklistItemStatus): string => {
    switch (statusName) {
      case ChecklistItemStatus.Done:
        return 'status-button button-green'
      case ChecklistItemStatus.InProgress:
        return 'status-button button-orange'
      default:
        return 'status-button'
    }
  }
}