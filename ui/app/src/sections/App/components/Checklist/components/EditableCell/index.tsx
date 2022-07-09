import { Button, DatePicker, Dropdown, Form, FormInstance, Input, Menu, Space } from "antd"
import { useTranslation } from "react-i18next"
import { ChecklistItemStatus } from "../../../../../../lib/graphql/graphql"
import { ChecklistHelper } from "../../../../../../lib/Helpers"
import { IChecklistTableItem } from "../../../../../../lib/Types"
import { PeopleCell } from "../PeopleCell"

interface Props {
  children: any,
  dataIndex: any,
  editing: boolean,
  form: FormInstance
  index: any,
  inputType: any,
  ondatechange: (date: string) => void,
  record: IChecklistTableItem,
  title: any
}

export const EditableCell = ({
  children,
  editing,
  dataIndex,
  index,
  inputType,
  ondatechange,
  record,
  title,
  ...restProps
}: Props) => {

  const { t } = useTranslation()

  switch (dataIndex) {
    case "description":
      return (
        <td { ...restProps }>
          { editing ? (
            <Form.Item
              className="description"
              name={ `${ dataIndex }-${ record.tableKey }` }>
              <Input />
            </Form.Item>
          ) : children }
        </td>
      )
    case 'people':
      return <PeopleCell
        editing={ editing }
        record={ record } />
    case 'due':
      return (
        <td { ...restProps }>
          { editing ? (
            <Space direction="vertical">
              <DatePicker
                onChange={ (_: any, dateString: string) => {
                  ondatechange(dateString)
                } }
                placeholder={ t("due-date") } />
            </Space>
          ) : children }
        </td>
      )
    case 'status':
      const statuses = (selectedStatus?: ChecklistItemStatus): { key: string, label: JSX.Element }[] => {
        return Object.values(ChecklistItemStatus).map((value: string, index: number) => {
          if (value !== selectedStatus) {
            return {
              key: index.toString(),
              label: (
                <Button className={ ChecklistHelper.statusButtonClassName(value as ChecklistItemStatus) }>
                  { t(`statuses.${ value }`) }
                </Button>
              )
            }
          }
          return undefined
        }).filter(item => item !== undefined) as { key: string, label: JSX.Element }[]
      }
      return (
        <td { ...restProps }>
          { editing ? (
            <Dropdown
              overlay={ (
                <Menu items={ statuses(record.status) } />
              ) }
              placement="bottom">
              <Button className={ ChecklistHelper.statusButtonClassName(record.status) }>
                { t(`statuses.${ record.status }`) }
              </Button>
            </Dropdown>
          ) : children }
        </td>
      )
    default:
      return (
        <td { ...restProps }>
          { children }
        </td>
      )
  }
}