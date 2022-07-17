import { useReactiveVar } from "@apollo/client"
import { Button, Dropdown, Menu } from "antd"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { editedRecord, editingRecordKey } from "../../../../../../../../cache"
import { ChecklistItemStatus } from "../../../../../../../../lib/graphql/graphql"
import { ChecklistHelper } from "../../../../../../../../lib/Helpers"
import { IChecklistTableItem } from "../../../../../../../../lib/Types"

interface Props {
  record: IChecklistTableItem
}

export const StatusCell = ({
  record
}: Props) => {

  const { t } = useTranslation()
  const editingKey = useReactiveVar(editingRecordKey)
  const editingRecord = useReactiveVar(editedRecord)

  const [ selectedStatus, setSelectedStatus ] = useState<ChecklistItemStatus>(ChecklistItemStatus.NotStarted)

  const setStatus = (status: ChecklistItemStatus) => {
    setSelectedStatus(status)
    editedRecord({ ...editingRecord, status, tableKey: record.tableKey })
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

  const DropdownButton = () => {
    const source: IChecklistTableItem = record.id === editingKey && (editingRecord.tableKey === record.tableKey) ? editingRecord : record
    return (
      <Button className={ ChecklistHelper.statusButtonClassName(source.status) }>
        { t(`statuses.${ source.status }`) }
      </Button>
    )
  }

  useEffect(() => {
    setSelectedStatus(record.status)
  }, [ record.status ])

  return (
    <td>
      { record.id === editingKey ? (
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
        <DropdownButton />
      ) }
    </td >
  )
}