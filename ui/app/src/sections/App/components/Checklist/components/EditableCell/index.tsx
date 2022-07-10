import { DatePicker, Form, FormInstance, Input, Space } from "antd"
import { useTranslation } from "react-i18next"
import { IChecklistTableItem } from "../../../../../../lib/Types"
import { PeopleCell } from "../PeopleCell"
import { StatusCell } from "../StatusCell"

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
    case 'people':
      return <PeopleCell
        editing={ editing }
        record={ record } />
    case 'status':
      return <StatusCell
        editing={ editing }
        record={ record } />
    default:
      return (
        <td { ...restProps }>
          { children }
        </td>
      )
  }
}