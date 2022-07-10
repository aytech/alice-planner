import { Button, Dropdown, Menu } from "antd"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ChecklistItemStatus } from "../../../../../../lib/graphql/graphql"
import { ChecklistHelper } from "../../../../../../lib/Helpers"
import { IChecklistTableItem } from "../../../../../../lib/Types"

interface Props {
  editing: boolean
  record: IChecklistTableItem
}

export const StatusCell = ({
  editing,
  record,
  ...restProps
}: Props) => {

  const { t } = useTranslation()

  const [ selectedStatus, setSelectedStatus ] = useState<ChecklistItemStatus>(ChecklistItemStatus.NotStarted)

  const setStatus = (status: ChecklistItemStatus) => {
    setSelectedStatus(status)
  }

  const statuses = (): { key: string, label: JSX.Element }[] => {
    return Object.values(ChecklistItemStatus).map((value: string, index: number) => {
      if (value !== selectedStatus) {
        return {
          key: index.toString(),
          label: (
            <Button
              className={ ChecklistHelper.statusButtonClassName(value as ChecklistItemStatus) }
              onClick={ () => setStatus(value as ChecklistItemStatus) }>
              { t(`statuses.${ value }`) }
            </Button>
          )
        }
      }
      return undefined
    }).filter(item => item !== undefined) as { key: string, label: JSX.Element }[]
  }

  useEffect(() => {
    setSelectedStatus(record.status)
  }, [ record.status ])

  return (
    <td { ...restProps }>
      { editing ? (
        <Dropdown
          overlay={ (
            <Menu items={ statuses() } />
          ) }
          placement="bottom">
          <Button className={ ChecklistHelper.statusButtonClassName(selectedStatus) }>
            { t(`statuses.${ selectedStatus }`) }
          </Button>
        </Dropdown>
      ) : (
        <Button className={ ChecklistHelper.statusButtonClassName(record.status) }>
          { t(`statuses.${ record.status }`) }
        </Button>
      ) }
    </td>
  )
}